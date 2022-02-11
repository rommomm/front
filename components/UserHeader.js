import { EnvironmentOutlined } from "@ant-design/icons/lib/icons";
import React, { useEffect, useState } from "react";
import useAuthMe from "../hooks/useAutMe";
import { useFollowersQuery, useFollowingsQuery } from "../redux/user/userApi";
import FollowersModal from "./FollowersModal";
import FollowingsModal from "./FollowingsModal";

function UserHeader({ author, postsCount, onFollow, onUnFollow }) {
  const { data: user, isSuccess: isLoggedIn } = useAuthMe();

  return (
    <>
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-1 px-1  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
        <div className="pl-2">
          <p className="text-lg">
            {author.first_name}&nbsp;
            {author.last_name}
          </p>
          <p>{postsCount}&nbsp; posts</p>
        </div>
      </div>

      <div className="relative flex flex-col mx-auto  w-full border-black border-b">
        <div className="profile w-full flex flex-col text-white">
          <img
            className="max-h-32 object-cover	 w-full"
            src={author.profile_background || "/default/background.png"}
            alt=""
          />
          <div
            className="w-full flex justify-center relative"
            style={{ marginTop: "-5rem" }}
          >
            <img
              className="w-36 h-36 p-1 bg-white rounded-full"
              src={author.profile_avatar || "/default/avatar.png"}
              alt=""
            />
            {isLoggedIn && author.id !== user.data.id && (
              <div className="absolute bottom-0 buttons flex justify-end font-bold right-0 space-x-0 my-3.5 mr-3 ">
                <div className="pr-4">
                  <button className="bg-blue-500 hover:bg-gray-700 text-white  py-1.5 px-4  rounded ">
                    Message
                  </button>
                </div>
                <div>
                  {!author.following ? (
                    <button
                      className="bg-blue-500 hover:bg-gray-700 text-white  py-1.5 px-4  rounded"
                      onClick={() => onFollow(author.user_name)}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-gray-700 text-white  py-1.5 px-4  rounded"
                      onClick={() => onUnFollow(author.user_name)}
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div style={{ marginTop: "-4rem" }}>
            <div className="buttons left-0 space-x-0 my-3.5 ml-3 text-black ">
              <div className="pr-4">
                <h2 className="text-2xl font-bold ">{author.first_name}</h2>
              </div>
              <div>
                <p className="text-base ">@{author.user_name}</p>
              </div>
            </div>
            <div class=" left-0 space-x-0 my-3.5 ml-3 text-black ">
              <div className="m-auto flex justify-start  ">
                <EnvironmentOutlined />
                <span className=" pl-1 inline-block align-bottom text-xs">
                  {author.user_location || "Запорожье"}
                </span>
              </div>

              <div className="flex">
                <FollowersModal author={author} />
                <FollowingsModal author={author} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHeader;
