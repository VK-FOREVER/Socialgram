import GridPost from "@/components/shared/GridPost";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const Save = () => {
  const { user } = useUserContext();
  const { data: currentUser, isFetching } = useGetCurrentUser();

  if (isFetching) {
    return <Loader />;
  }
  console.log(currentUser);

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
        {/* <GridPost
          posts={currentUser?.save.post}
          lowWidth={true}
          showStats={false}
          showUser={false}
        /> */}
      </div>
    </div>
  );
};

export default Save;
