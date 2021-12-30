import React, { useContext } from "react";
import { AddLocation } from "@material-ui/icons";
import UserContext from "./UserContext";

function UserHeader({ userInfo, posts }) {
  const { isLoggedIn, user } = useContext(UserContext);
  if (!userInfo) {
    return null;
  }

  return (
    <>
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-1 px-1  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
        <div className="pl-2">
          <p className="text-lg">
            {userInfo.first_name}&nbsp;
            {userInfo.last_name}
          </p>
          <p>{posts.length}&nbsp; posts</p>
        </div>
      </div>

      <div class=" relative flex flex-col mx-auto  w-full border-black border-b">
        <div class="profile w-full flex flex-col text-white">
          <img
            class="max-h-32 w-full"
            src="https://unsplash.com/photos/h0Vxgz5tyXA/download?force=true&w=640"
            alt=""
          />
          <div
            className="w-full flex justify-center relative"
            style={{ marginTop: "-5rem" }}
          >
            <img
              class="w-36 h-36 p-1 bg-white rounded-full"
              src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
              alt=""
            />
            {isLoggedIn && userInfo.id !== user.id && (
              <div class="absolute bottom-0 buttons flex justify-end font-bold right-0 space-x-0 my-3.5 mr-3 ">
                <div className="pr-4">
                  <button className="bg-blue-500 hover:bg-gray-700 text-white  py-1.5 px-4  rounded ">
                    Message
                  </button>
                </div>
                <div>
                  <button className="bg-blue-500 hover:bg-gray-700 text-white  py-1.5 px-4  rounded">
                    Follow
                  </button>
                </div>
              </div>
            )}
          </div>
          <div style={{ marginTop: "-4rem" }}>
            <div class="buttons left-0 space-x-0 my-3.5 ml-3 text-black ">
              <div className="pr-4">
                <h2 className="text-2xl font-bold ">{userInfo.first_name}</h2>
              </div>
              <div>
                <p className="text-base ">@{userInfo.user_name}</p>
              </div>
            </div>
            <div class="buttons left-0 space-x-0 my-3.5 ml-3 text-black ">
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
      </div>
    </>
  );
}

export default UserHeader;
