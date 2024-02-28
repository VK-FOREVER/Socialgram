import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: post, isPending } = useGetPostById(id || "");
  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    if (post) {
      deletePost({ postId: post?.$id, imageId: post?.imageId });
      navigate(-1);
    }
  };

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt={post?.caption}
            className="post_details-img"
          />

          <div className="post_details-info ">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={post?.creator?.imageUrl}
                  alt={post?.caption}
                  className="rounded-full w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {" "}
                      {post?.$createdAt && timeAgo(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center ">
                {user.id === post?.creator.$id && (
                  <>
                    <Link to={`/update-post/${post?.$id}`}>
                      <img
                        src="/assets/icons/edit.svg"
                        alt="Update Post"
                        width={24}
                        height={24}
                      />
                    </Link>

                    <Button
                      onClick={handleDeletePost}
                      variant="ghost"
                      className="ghost_details-delete_btn"
                    >
                      <img
                        src="/assets/icons/delete.svg"
                        alt="Delete Post"
                        width={24}
                        height={24}
                      />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="justify-between flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p className="text-light-1 w-full leading-5 ">{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tag.map((t: string) => (
                  <li key={t} className="text-light-3">
                    #{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
