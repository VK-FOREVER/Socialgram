import GridPost from "@/components/shared/GridPost";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";

import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { LikedPosts } from ".";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const {
    data: currentUser,
    isFetching: loading,
    isError: gotError,
  } = useGetUserById(id || "");

  if (loading) {
    return <Loader />;
  }
  const randomImage =
    "https://source.unsplash.com/1600x900/?nature,photography,technology,space";
  const unAuthorized = currentUser?.$id !== user.id;

  if (gotError) {
    return (
      <div className="mt-20 flex items-center justify-center gap-4 flex-col">
        <big className="text-light-2 text-2xl">Something went wrong</big>
        <small className="text-light-2 text-base">Please try again...</small>
      </div>
    );
  }
  return (
    <div className="w-full p-4">
      <div className="z-0 flex items-center justify-center flex-col relative ">
        <img
          className="w-full h-[350px] object-cover"
          src={randomImage}
          alt="Banner"
        />
        <img
          className="w-32 h-w-32 rounded-full absolute top-[80%]"
          src={currentUser?.imageUrl}
          alt={currentUser?.username}
        />
        {!unAuthorized ? (
          <div className="flex items-end justify-end hover:hover-shadow absolute right-[0px] top-[350px] my-[2px]">
            <Link to={`/edit-profile/${user?.id}`}>
              <Button className="px-4 py-2 gap-2" variant="outline">
                <img
                  className="w-5 flex items-start justify-center  "
                  src="/assets/icons/edit.svg"
                  alt="edit-profile"
                />
                Edit Profile
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-end justify-center hover:hover-shadow absolute right-[0px] top-[350px] my-[2px]">
            <Button className="px-4 py-2 gap-2" variant="outline">
              <img
                className="w-5 flex items-start justify-center  "
                src="/assets/icons/follow.svg"
                alt="follow"
              />
              Follow
            </Button>
          </div>
        )}
      </div>

      <div className="profile-container z-10">
        <div className="flex items-center justify-center flex-col w-full">
          <div className="flex flex-col w-full items-center justify-center gap-4">
            <div className="flex items-center justify-center flex-col my-2">
              <p className="text-3xl text-light-2">{currentUser?.name}</p>
              <span className="text-light-3 text-base">
                @{currentUser?.username}
              </span>
              <div className="w-full text-justify text-base leading-6 tracking-tighter">
                <span className="text-light-2 ">
                  {currentUser?.bio ? (
                    currentUser.bio
                  ) : (
                    <span className="text-sm text-light-3 italic">
                      "Add your bio by editing profile"
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="w-full flex items-center justify-center gap-10">
              <div className="flex items-center  flex-col justify-center">
                <img src="assets/icons" alt="" />
                <span className="text-primary-500 text-xl font-semibold">
                  {currentUser?.posts.length}
                </span>
                <span className="text-light-2">Posts</span>
              </div>
              <div className="flex items-center flex-col justify-center">
                <span className="text-primary-500 text-xl font-semibold">
                  0
                </span>
                <span className="text-light-2">Followers</span>
              </div>
              <div className="flex items-center flex-col justify-center">
                <span className="text-primary-500 text-xl font-semibold">
                  0
                </span>
                <span className="text-light-2">Following</span>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="w-full  flex items-center justify-evenly ">
          <Link to={`/profile/${id}`}>
            <Button
              variant={pathname === `/profile/${id}` ? "outline" : "default"}
              className={`profile-tab  px-4 py-3 rounded-lg  hover:hover-shadow  ${
                pathname === `/profile/${id}` && "!bg-dark-3"
              }`}
            >
              <img
                src={"/assets/icons/posts.svg"}
                alt="posts"
                width={20}
                height={20}
              />
              All Posts
            </Button>
          </Link>
          {!unAuthorized ? (
            <Link to={`/profile/${id}/liked-posts`}>
              <Button
                variant={
                  pathname === `/profile/${id}/liked-posts`
                    ? "outline"
                    : "default"
                }
                className={`profile-tab px-4 py-3 rounded-lg hover:hover-shadow ${
                  pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
                }`}
              >
                <img
                  src={
                    pathname === `/profile/${id}/liked-posts`
                      ? "/assets/icons/liked.svg"
                      : "/assets/icons/like.svg"
                  }
                  alt="like"
                  width={20}
                  height={20}
                />
                Liked Posts
              </Button>
            </Link>
          ) : (
            <Button
              variant="default"
              className={`profile-tab px-4 py-3 rounded-lg hover:hover-shadow `}
              disabled={unAuthorized}
            >
              <img
                src="/assets/icons/lock.svg"
                alt="like"
                width={20}
                height={20}
              />
              Liked Posts
            </Button>
          )}
        </div>
        <div className="w-full max-w-5xl">
          <Routes>
            <Route
              index
              element={
                <GridPost
                  lowWidth={true}
                  posts={currentUser?.posts}
                  showUser={false}
                />
              }
            />
            {!unAuthorized && (
              <Route
                path="/liked-posts"
                element={<LikedPosts likedPosts={currentUser?.liked} />}
              />
            )}
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
