import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";

const Save = () => {
  const { user } = useUserContext();
  const { data: currentUser, isFetching: loading } = useGetUserById(
    user.id || ""
  );

  if (loading) {
    return <Loader />;
  }
  console.log(currentUser);

  return (
    <div className="saved-container">
      <h1 className="text-xl text-start">Saved Post</h1>
      <div className="w-full"></div>
    </div>
  );
};

export default Save;
