import GridPost from "@/components/shared/GridPost";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetPostById,
  useGetRecentPosts,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutations";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Models } from "appwrite";
import { useState } from "react";
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

  const { data: currentUser } = useGetUserById(id || "");
  return (
    <div className="w-full p-8">
      <div className="profile-container">
        <div className="profile-inner_container w-full">
          <img
            className="w-24 h-24 rounded-full"
            src={currentUser?.imageUrl}
            alt={currentUser?.username}
          />
          <div className="flex flex-col w-full items-start justify-start gap-4">
            <div className="flex items-start justify-center flex-col">
              <p className="text-2xl text-light-2">{currentUser?.name}</p>
              <span className="text-light-3 text-base">
                @{currentUser?.username}
              </span>
              <div className="w-10/12 text-justify text-base leading-6 tracking-tighter">
                <span className="text-light-2 w-10/12">
                  {currentUser?.bio
                    ? currentUser.bio
                    : `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore quis sapiente iusto repellendus, culpa quas!`}
                </span>
              </div>
            </div>
            <div className="w-full flex items-start justify-start gap-10">
              <div className="flex items-center  flex-col justify-start">
                <span className="text-primary-600 text-xl font-semibold">
                  2K
                </span>
                <span className="text-light-2">Posts</span>
              </div>
              <div className="flex items-center flex-col justify-center">
                <span className="text-primary-600 text-xl font-semibold">
                  2M
                </span>
                <span className="text-light-2">Followers</span>
              </div>
              <div className="flex items-center flex-col justify-center">
                <span className="text-primary-600 text-xl font-semibold">
                  2
                </span>
                <span className="text-light-2">Following</span>
              </div>
            </div>
          </div>
          {user.id === currentUser?.$id ? (
            <div className="flex items-end justify-center hover:hover-shadow ">
              <Button className="px-4 py-2 gap-2" variant="outline">
                <img
                  className="w-5 flex items-start justify-center  "
                  src="/assets/icons/edit.svg"
                  alt="edit-profile"
                />
                Edit Profile
              </Button>
            </div>
          ) : (
            <div className="flex items-end justify-center hover:hover-shadow ">
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
            {currentUser?.$id === user.id && (
              <Route path="/liked-posts" element={<LikedPosts />} />
            )}
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
