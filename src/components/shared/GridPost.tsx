import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import React from "react";
import { Link } from "react-router-dom";

type GridPostListProps = {
  posts: Models.Document[];
};

const GridPost = ({ posts }: GridPostListProps) => {
  const { user } = useUserContext();
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`}>
            <img src={post.imageUrl} alt={post.caption} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GridPost;
