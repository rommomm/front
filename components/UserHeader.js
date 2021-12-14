import React, { useContext, useState } from "react";
import { AddLocation } from "@material-ui/icons";
import UserContext from "./UserContext";

function UserHeader({ userInfo }) {
  const { isLoggedIn, user } = useContext(UserContext);
  if (!userInfo) {
    return null;
  }

  return (
    <>
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
        Explore
      </div>

      <div class=" relative flex flex-col mx-auto  w-full h-72 border-black border-b">
        <img
          class="max-h-32 w-full  absolute"
          src="https://unsplash.com/photos/h0Vxgz5tyXA/download?force=true&w=640"
          alt=""
        />

        <div class="profile w-full flex m-3 ml-4 text-white pl-72 pt-10">
          <img
            class="w-36 h-36 p-1 bg-white rounded-full absolute"
            src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
            alt=""
          />
          {isLoggedIn && userInfo.id !== user.id && (
            <div class="buttons flex absolute pt-20 font-bold right-0  space-x-0 my-3.5 mr-3 ">
              <div className="pr-4">
                <button className="bg-blue-400 rounded-lg px-4 py-1.5 shadow-md ">
                  Message
                </button>
              </div>
              <div>
                <button className="bg-blue-400 rounded-lg px-4 py-1.5 shadow-md">
                  Follow
                </button>
              </div>
            </div>
          )}
          <div class="buttons  absolute pt-20 left-0 space-x-0 my-3.5 ml-3 text-black ">
            <div className="pr-4">
              <h2 className="text-2xl font-bold ">{userInfo.first_name}</h2>
            </div>
            <div>
              <p className="text-base ">@{userInfo.user_name}</p>
            </div>
          </div>
          <div class="buttons  absolute pt-36 left-0 space-x-0 my-3.5 ml-3 text-black ">
            <div className="pr-4">
              <h2 className="text-base ">
                <AddLocation className="h-7" />
                Monaco
              </h2>
            </div>
            <div>
              <span className="text-base ">
                <span className="text-xl pr-1 font-bold">420</span>Following
              </span>
              <span className="text-base ">
                <span className="text-xl pl-5 pr-1 font-bold">400</span>
                Followers
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHeader;
