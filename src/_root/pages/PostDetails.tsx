import { Input } from "@/components/ui/input";
import GridPost from "@/components/shared/GridPost";
import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useAddComment,
  useDeletePost,
  useGetCurrentUser,
  useGetPostById,
  useGetUserPosts,
} from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const [commentValue, setCommentValue] = useState<string[]>([""]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isPending: isLoading } = useGetPostById(id || "");
  const { mutate: deletePost } = useDeletePost();
  const postUser = post?.creator.$id;
  const { user } = useUserContext();
  const { data: relatedPosts, isFetching } = useGetUserPosts(postUser);
  const { mutate: addComment } = useAddComment();
  const { data: currentUser } = useGetCurrentUser();

  const handleDeletePost = () => {
    if (post) {
      deletePost({ postId: post?.$id, imageId: post?.imageId });
      navigate(-1);
    }
  };

  const handleAddComment = () => {
    if (post && commentValue) {
      console.log({ commentValue });

      addComment({ postId: post.$id, comment: commentValue });
      setCommentValue([""]);
    } else {
      return null;
    }

    console.log(commentValue);
  };

  if (isLoading) {
    return <Loader />;
  }

  // const setComment = (e: any): void => {
  //   const value = e?.target?.value;
  //   const str = value?.toString();

  // };

  console.log({ currentUser, post });

  return (
    <div className="post_details-container">
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
          <div className="justify-between flex flex-col flex-1 w-full small-medium lg:base-regular">
            <p className="text-light-1 w-full leading-5 ">{post?.caption}</p>
            <hr className="border w-full border-dark-4/80 my-2" />
            <div className="w-full py-1 px-4 rounded-lg overflow-y-scroll h-[309px] custom-scrollbar">
              {post?.cmnts?.map((comment: string, i: number) => (
                <div
                  key={i}
                  className="w-full flex items-start justify-items-start flex-row gap-4 p-4 rounded-lg   border-dark-4/80 border my-2"
                >
                  <Link to={`/profile/${user.id}`}>
                    <img
                      src={currentUser?.imageUrl}
                      alt="user"
                      className="w-10  object-cover rounded-full"
                    />
                  </Link>

                  <div className="flex items-start justify-center flex-col w-full">
                    <div className="flex items-center justify-start gap-2 flex-row w-full">
                      <span className="text-light-2 text-sm">
                        {currentUser?.name.length >= 11
                          ? `${currentUser?.name.slice(0, 8)}..`
                          : currentUser?.name}
                      </span>
                      <span className="text-[12px] text-light-3">
                        @{currentUser?.username}
                      </span>
                    </div>
                    <div className="w-full leading-5  ">
                      <p className="text-base text-light-1">{comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex items-start  justify-center flex-row gap-4  p-2 rounded-lg my-2">
              <div className="flex w-full max-w-sm justify-center items-center space-x-2">
                <div className="flex items-center justify-center">
                  <img
                    src={currentUser?.imageUrl}
                    alt="user"
                    className="w-12  object-cover rounded-full"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentValue}
                  onChange={(e) => setCommentValue([e.target.value.toString()])}
                  className="bg-dark-3 text-light-2 rounded-lg w-full"
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-dark-3 hover:opacity-85 transition-all duration-300"
                  onClick={handleAddComment}
                  disabled={commentValue?.length > 35}
                >
                  <img
                    src="/assets/icons/share.svg"
                    className="w-6 text-primary-600 "
                    alt="share"
                  />
                </Button>
              </div>
            </div>
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
      <div className="bg-slate-800 w-full p-[0.4px]" />
      <div className="w-full py-4">
        <h1 className="text-2xl font-semibold items-start mb-6">
          Related Posts
        </h1>

        <div className="w-full flex flex-col items-center justify-center ">
          {isFetching ? (
            <Loader showTxt={false} />
          ) : (
            <GridPost posts={relatedPosts?.documents} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
