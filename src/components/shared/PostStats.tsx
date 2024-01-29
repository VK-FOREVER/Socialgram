import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import React, { useState } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likeList = post.likes.map((user: Models.Document) => user.$id);
  const { data: currentUser } = useUserContext();

  const [likes, setLikes] = useState(likeList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const handleLikePosts = () => {};

  const handleSavePosts = () => {};

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5 items-center justify-center">
        <img
          src="/assets/icons/like.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">0</p>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <img
          src={`${}/assets/icons/save.svg`}
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
