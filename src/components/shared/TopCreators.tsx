import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";

const TopCreators = () => {
  const { data: creators, isFetching: loading } = useGetUsers(12);
  if (loading) {
    return <Loader />;
  }
  //   console.log(creators);

  return (
    <div className="right-sidebar">
      <h1>Top Creators</h1>
      <div className="user-grid">
        {creators?.documents.map((creator, index) => (
          <div
            className="p-2 flex items-center justify-center gap-2 w-full rounded-full"
            key={index}
          >
            <img
              src={creator.imageUrl}
              className="w-10 h-10 object-contain rounded-full"
              alt={`${creator.name}'s post`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCreators;
