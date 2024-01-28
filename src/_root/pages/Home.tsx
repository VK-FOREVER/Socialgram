import Loader from "@/components/shared/Loader";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import React from "react";

const Home = () => {
  const {
    data: posts,
    isPending: isLoading,
    isError: isError,
  } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container ">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">All Posts</h2>
          {isLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li>{post.caption}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
