import { Models } from "appwrite";
import React from "react";

type GridPostListProps = {
  posts: Models.Document[];
};

const GridPost = ({ posts }: GridPostListProps) => {
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li>{post.caption}</li>
      ))}
    </ul>
  );
};

export default GridPost;
