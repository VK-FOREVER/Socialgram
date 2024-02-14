import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";

const People = () => {
  const { data: users, isFetching: loading } = useGetUsers();
  const { user } = useUserContext();

  if (loading) {
    return <Loader />;
  }
  // console.log(creators);

  return (
    <div className="user-container p-8">
      <h1 className="text-light-1 text-2xl mb-4">All Users</h1>
      <div className="user-grid">
        {users?.documents.map((creator, index) => (
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
              {creator.$id !== user.id ? (
                <Button
                  variant="outline"
                  className="bg-primary-500 text-sm px-3 h-8 mt-2"
                >
                  Follow
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="bg-primary-500 text-sm px-3 h-8 mt-2"
                >
                  Edit
                </Button>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default People;
