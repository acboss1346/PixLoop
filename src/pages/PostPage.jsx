import { useParams } from "react-router";
import { PostDetail } from "../components/PostDetail";

export const PostPage = () => {
  const { id } = useParams();
  return (
    <div className="pt-20">
      <PostDetail postId={Number(id)} />
    </div>
  );
};
