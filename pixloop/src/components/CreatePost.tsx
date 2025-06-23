import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";

interface PostInput {
  title: string;
  content: string;
  avatar_url: string | null;
}

const createPost = async (post: PostInput, imageFile: File) => {
  // 🧼 Sanitize title and filename
  const sanitize = (str: string) =>
    str.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  const safeFileName = `${sanitize(post.title)}-${Date.now()}-${sanitize(imageFile.name)}`;

  // 🆙 Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(safeFileName, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicURLData } = supabase.storage
    .from("post-images")
    .getPublicUrl(safeFileName);

  // 📝 Insert post into database
  const { error } = await supabase
    .from("posts")
    .insert([{ ...post, image_url: publicURLData.publicUrl }]);

  if (error) throw new Error(error.message);
};

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useAuth();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) =>
      createPost(data.post, data.imageFile),
    onSuccess: () => {
      setTitle("");
      setContent("");
      setSelectedFile(null);
    },
    onError: (err) => {
      console.error("Post creation error:", err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    mutate({
      post: {
        title,
        content,
        avatar_url: user?.user_metadata.avatar_url || null,
      },
      imageFile: selectedFile,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center mb-4">Create New Post</h2>

      <div>
        <label htmlFor="title" className="block mb-2 font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-2 font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          rows={5}
          required
        />
      </div>

      {user?.user_metadata.avatar_url && (
        <div className="mb-4">
          <img
            src={user.user_metadata.avatar_url}
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <p className="text-sm text-gray-400">Your Avatar</p>
        </div>
      )}

      <div>
        <label htmlFor="image" className="block mb-2 font-medium">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFile(e.target.files[0]);
            }
          }}
          className="w-full text-white"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>

      {isError && (
        <p className="text-red-500 mt-2">
          {(error as Error)?.message || "Error creating post."}
        </p>
      )}
      {isSuccess && (
        <p className="text-green-500 mt-2">✅ Post created successfully!</p>
      )}
    </form>
  );
};
