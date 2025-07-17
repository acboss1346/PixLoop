import { Link } from "react-router-dom";

export const PostItem = ({ post }) => {
  return (
    <div className="relative group">
      {/* Background Glow */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 blur-md opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

      <Link to={`/post/${post.id}`} className="block relative z-10">
        <div className="w-full max-w-xs bg-[#181B20] border border-[#545A6A] rounded-xl text-white flex flex-col p-4 overflow-hidden transition duration-300 group-hover:bg-[#22252A] shadow-lg">
          {/* Header with Avatar + Title */}
          <div className="flex items-center mb-4 space-x-3">
            {post.avatar_url ? (
              <img
                src={post.avatar_url}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8A2BE2] to-[#491F70]" />
            )}
            <div className="text-lg font-semibold leading-tight">{post.title}</div>
          </div>

          {/* Image and Counts */}
          <div className="flex-1 space-y-2">
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full rounded-lg object-cover max-h-[160px] mx-auto"
              />
            )}

            {/* Like and Comment Count */}
            <div className="text-sm text-gray-300 flex justify-between px-1 pt-2">
              <span>❤️ {post.like_count ?? 0}</span>
              <span>💬 {post.comment_count ?? 0}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
