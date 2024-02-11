import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
  lowWidth?: boolean;
};

const GridPost = ({
  posts,
  showUser = true,
  showStats = true,
  lowWidth = false,
}: GridPostListProps) => {
  const { user } = useUserContext();
  return (
    <ul className="grid-container">
      {posts?.map((post) => (
        <li
          key={post.$id}
          className={`relative ${
            lowWidth ? `min-w-72 max-h-80` : `min-w-80 h-80`
          }`}
        >
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
          </Link>
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={post.creator.imageUrl}
                  alt={post.creator.username}
                  className="h-8 w-8 rounded-full"
                />
                <p className="link-clap-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPost;
