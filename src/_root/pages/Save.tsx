import GridPost from "@/components/shared/GridPost";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Save = () => {
  const { data: currentUser, isFetching } = useGetCurrentUser();
  const savedPost = currentUser?.save;

  const savePosts = savedPost
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser?.imageUrl,
      },
    }))
    .reverse();

  if (isFetching) {
    return <Loader />;
  }

  if (!savedPost.length) {
    return (
      <div className="flex items-center justify-center mx-auto ">
        <span className="text-base text-light-3">
          You don't have saved Posts🙂.
        </span>
      </div>
    );
  }
  return (
    <div className="saved-container">
      <div className="w-full flex items-center justify-start">
        <img
          src="/assets/icons/saved.svg"
          alt="saved-post"
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-semibold ">Saved Post</h1>
      </div>

      <div className="w-full">
        <GridPost posts={savePosts} lowWidth={true} showStats={false} />
      </div>
    </div>
  );
};

export default Save;
