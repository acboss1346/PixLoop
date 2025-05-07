import { useQuery } from "@tanstack/react-query";
import { PostItem } from "./PostItem";
import { supabase } from "../supabase-client";

export interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  avatar_url: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const PostList = () => {
  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load posts</p>;

  return (
    <div className="px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
