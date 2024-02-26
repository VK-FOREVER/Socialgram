import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isLoading,
    isError: isError,
  } = useGetRecentPosts();

  if (isError) {
    return (
      <div className="w-full flex items-center justify-center">
        <h4 className="text-light-1 text-3xl font-semibold">
          Something went wrong. <br />
          Please re-fresh the page.
        </h4>
      </div>
    );
  }
  return (
    <div className="flex flex-1 ">
      <div className="home-container ">
        <div className="home-posts">
          <div className="w-full flex items-center justify-start">
            <img
              src="/assets/icons/home.svg"
              alt="saved-post"
              className="w-8 h-8"
            />
            <h2 className="h3-bold md:h2-bold w-full">Home Feed</h2>
          </div>
          {isLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.$createdAt} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
