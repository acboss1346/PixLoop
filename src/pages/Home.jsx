import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "../components/PostItem";

export const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_posts_with_counts");
      if (error) throw new Error(error.message);
      return data;
    },
  });

  if (isLoading) return <p className="text-center">Loading posts...</p>;
  if (isError) return <p className="text-center text-red-500">{error.message}</p>;
  if (!data || data.length === 0) return <p className="text-center">No posts yet.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};
