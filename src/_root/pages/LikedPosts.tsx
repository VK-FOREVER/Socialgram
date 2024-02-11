import GridPost from "@/components/shared/GridPost";
import { Models } from "appwrite";
import React from "react";

type LikedPostProps = {
  likedPosts: Models.Document[];
};

const LikedPosts = ({ likedPosts }: LikedPostProps) => {
  return console.log(likedPosts);
  // <GridPost posts={likedPosts} showUser={false} />;
};

export default LikedPosts;
