import { useState } from "react";
import type { ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase-client";

interface PostInput {
  title: string;
  content: string;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicURLData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicURLData.publicUrl });

  if (error) throw new Error(error.message);

  return data;
};

export const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;
    mutate({
      post: {
        title,
        content,
      },
      imageFile: selectedFile,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div>
      {/* Form Container */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/3">
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
          <div className="w-1/3">
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
          <div className="w-1/3">
            <label htmlFor="image" className="block mb-2 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-200"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer mt-4"
        >
          {isPending ? "Creating..." : "Create Post"}
        </button>

        {isError && <p className="text-red-500">Error creating post.</p>}
      </form>

      {/* Displaying Posts Horizontally */}
      <div className="flex space-x-4 mt-8">
        {/* Example Post */}
        <div className="w-1/4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center p-4">
            <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center">
              <span className="text-purple-600 text-xl font-semibold">P</span>
            </div>
            <h3 className="ml-4 text-white font-semibold">A new post</h3>
          </div>
          <img
            src="https://via.placeholder.com/150"
            alt="Post Image"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-white">
            <p className="text-sm">This is a description of the post content.</p>
          </div>
        </div>

        {/* More posts go here */}
      </div>
    </div>
  );
};
