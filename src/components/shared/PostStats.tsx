import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likeList = post?.likes.map((user: Models.Document) => user.$id);
  const savePostLength = post?.save.length;
  const { data: currentUser } = useGetCurrentUser();

  const hasSaved = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(hasSaved ? true : false);
  }, [currentUser]);
  // console.log(post?.likes);

  const [likes, setLikes] = useState(likeList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: savingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending: deletingPost } =
    useDeleteSavedPost();

  const handleLikePosts = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePosts = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (hasSaved) {
      setIsSaved(false);
      deleteSavePost(hasSaved.$id);
    } else {
      savePost({ postId: post?.$id || "", userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20 px-5">
      <div className="flex items-center justify-evenly flex-row  gap-4">
        <div className="flex gap-2  items-center justify-center">
          <img
            src={`${
              checkIsLiked(likes, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }`}
            alt="like"
            width={20}
            height={20}
            onClick={handleLikePosts}
            className="cursor-pointer"
          />

          <p className="small-medium lg:base-medium">{likes.length}</p>
        </div>
        {/* <div className="flex gap-2  items-center justify-center">
          <img
            src="/assets/icons/chat.svg"
            alt="like"
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <p className="small-medium lg:base-medium">
            {post?.postComments?.length}
          </p>
        </div> */}
      </div>
      <div className="flex gap-2 items-center justify-center">
        {savingPost || deletingPost ? (
          <span className="w-4 h-4">
            <Loader showTxt={false} />
          </span>
        ) : (
          <div className="flex gap-2 mr-5 items-center justify-center">
            <img
              src={
                isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
              }
              alt="like"
              width={20}
              height={20}
              onClick={handleSavePosts}
              className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium">{savePostLength}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostStats;
