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

  return (
    <div className="user-container ">
      <div className="w-full flex items-center justify-start">
        <img
          src="/assets/icons/people.svg"
          alt="saved-post"
          className="w-8 h-8"
        />
        <h1 className="text-light-1  font-semibold text-2xl w-full  ">
          All Users
        </h1>
      </div>

      <div className="user-grid">
        {users?.documents.map((creator, index) => (
          <Link to={`/profile/${creator.$id}`} key={index}>
            <div className="px-2 flex items-center justify-center w-full rounded-xl  py-3 flex-col border-light-3 border-2 text-center gap-2">
              <img
                src={creator.imageUrl}
                className="w-14 h-14 object-contain rounded-full"
                alt={`${creator.name}'s post`}
              />
              <h4 className="text-light-1 text-base font-semibold max-w-[105px] w-[104px]">
                {creator.name.length >= 11
                  ? `${creator.name.slice(0, 9)}..`
                  : creator.name}
              </h4>
              <span className="text-light-3 text-xs">@{creator.username}</span>
              {creator.$id !== user.id ? (
                <Button
                  variant="outline"
                  className="w-20 h-8 hover-shadow-light"
                >
                  Follow
                </Button>
              ) : (
                <Link to={`/edit-profile/${user?.id}`}>
                  <Button
                    variant="outline"
                    className="w-20 h-8 hover-shadow-light"
                  >
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default People;
