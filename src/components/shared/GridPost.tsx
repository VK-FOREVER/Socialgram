import { Models } from "appwrite";
import React from "react";

type GridPostListProps = {
  posts: Models.Document[];
};

const GridPost = ({ posts }: GridPostListProps) => {
  return <div>GridPost</div>;
};

export default GridPost;
