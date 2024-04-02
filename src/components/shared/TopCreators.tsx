import {
  useGetCurrentUser,
  useGetFollowings,
  useGetUsers,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";

const TopCreators = () => {
  const { data: creators, isFetching: loading } = useGetUsers(10);
  const { mutate: followIt } = useGetFollowings();
  const { user } = useUserContext();
  const { data: currentUser } = useGetCurrentUser();

  if (loading) {
    return <Loader />;
  }

  // if (hasSaved) {
  //   setIsSaved(false);
  //   deleteSavePost(hasSaved.$id);
  // } else {
  //   savePost({ postId: post?.$id || "", userId });
  //   setIsSaved(true);
  // }
  const handleFollow = (id: string) => {
    // const isFollowing = currentUser?.followings.includes(userId);
    // if (!isFollowing) {

    followIt({ userId: id });

    // }
    // return res;
    // console.log(typeof id);
  };
  // console.log(currentUser);

  return (
    <div className="home-creators">
      <div className="w-full flex items-center justify-start">
        <img
          src="/assets/icons/people.svg"
          alt="saved-post"
          className="w-8 h-8"
        />
        <h1 className="text-light-1 text-2xl font-semibold">Top Creators</h1>
      </div>
      <div className="creator-grid">
        {creators?.documents.map((creator, index) => {
          const { $id } = creator;
          return (
            <div
              key={index}
              className="px-2 flex items-center justify-center w-full rounded-xl  py-3 flex-col border-light-3 border-2 text-center gap-2"
            >
              <Link to={`/profile/${$id}`}>
                <div className="flex items-center justify-center flex-col">
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
                  <span className="text-light-3 text-xs">
                    @{creator.username}
                  </span>
                </div>
              </Link>
              {$id !== user.id ? (
                <Button
                  variant="outline"
                  className="w-18 h-8 hover-shadow-light"
                  onClick={() => handleFollow($id)}
                >
                  Follow
                </Button>
              ) : (
                <Link to={`/edit-profile/${user?.id}`}>
                  <Button
                    variant="outline"
                    className="w-18 h-8 hover-shadow-light"
                  >
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCreators;
