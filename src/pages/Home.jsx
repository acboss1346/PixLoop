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

  const scrollToPosts = () => {
    const section = document.getElementById("posts");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl shadow-lg mb-12">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Welcome to Pixloop 👋</h1>
        <p className="text-lg max-w-2xl">
          Discover creativity, connect with friends, and share your visual moments with the world.
        </p>
        <button
          onClick={scrollToPosts}
          className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          ↓ View Posts
        </button>
      </div>


      <div id="posts">
        {isLoading && <p className="text-center">Loading posts...</p>}
        {isError && <p className="text-center text-red-500">{error.message}</p>}
        {!isLoading && !isError && (!data || data.length === 0) && (
          <p className="text-center">No posts yet.</p>
        )}

        {!isLoading && !isError && data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
