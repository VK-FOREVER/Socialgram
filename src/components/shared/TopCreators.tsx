import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";

const TopCreators = () => {
  const { data: creators, isFetching: loading } = useGetUsers(12);
  if (loading) {
    return <Loader />;
  }
  //   console.log(creators);

  return (
    <div className="p-4">
      <h1>Top Creators</h1>
      {creators?.documents.map((creator, index) => (
        <div className="flex" key={index}>
          <img
            src={creator.imageUrl}
            className="w-10 h-10"
            alt={`${creator.name}'s post`}
          />
        </div>
      ))}
    </div>
  );
};

export default TopCreators;
