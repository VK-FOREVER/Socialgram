import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";

const TopCreators = () => {
  const { data: creators, isFetching: loading } = useGetUsers(12);
  const { user } = useUserContext();

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="home-creators">
      <h1 className="text-light-1 text-2xl mb-4">Top Creators</h1>
      <div className="creator-grid">
        {creators?.documents.map((creator, index) => (
          <Link to={`/profile/${creator.$id}`} key={index}>
            <div className="px-2 flex items-center justify-center w-full rounded-xl  py-3 flex-col border-light-3 border-2 text-center">
              <img
                src={creator.imageUrl}
                className="w-14 h-14 object-contain rounded-full"
                alt={`${creator.name}'s post`}
              />
              <h4 className="text-light-1 text-base font-semibold max-w-[105px] w-[104px]">
                {creator.name}
              </h4>
              <span className="text-light-3 text-xs">@{creator.username}</span>
              {creator.$id !== user.id && (
                <Button
                  variant="outline"
                  className="bg-primary-600 text-sm px-3 h-8 mt-2"
                >
                  Follow
                </Button>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCreators;
