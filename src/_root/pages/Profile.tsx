import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import React from "react";

const Profile = () => {
  const { user } = useUserContext();
  return (
    <div className="w-full p-8">
      <div className="profile-container">
        <div className="profile-inner_container w-full">
          <img
            className="w-24 h-24 rounded-full"
            src={user.imageUrl}
            alt={user.username}
          />
          <div className="flex flex-col w-full items-start justify-start gap-4">
            <div className="flex items-start justify-center flex-col">
              <p className="text-2xl text-light-2">{user.name}</p>
              <span className="text-light-3 text-base">@{user.username}</span>
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
          <div className="flex items-end justify-center">
            <Button className="px-4 py-2 gap-2" variant="outline">
              <img
                className="w-5 flex items-start justify-center "
                src="/assets/icons/edit.svg"
                alt="edit-profile"
              />
              edit profile
            </Button>
          </div>
        </div>
        <div className="w-full mt-4 flex items-center justify-center gap-8">
          <Button variant="outline" className="px-6 py-3">
            Your Posts
          </Button>
          <Button variant="outline" className="px-6 py-3">
            Liked Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
