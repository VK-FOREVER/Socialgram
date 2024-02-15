import GridPost from "@/components/shared/GridPost";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Save = () => {
  const { data: currentUser, isFetching } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  if (isFetching) {
    return <Loader />;
  }
  // console.log(savePosts);

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
