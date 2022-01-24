import { EnvironmentOutlined } from "@ant-design/icons/lib/icons";
import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import useAuthMe from "../hooks/useAutMe";
import { useAuthMeQuery } from "../redux/auth/authApi";
import { useGetAuthorPostsQuery } from "../redux/posts/postApi";

function UserHeader({ author, postsCount }) {
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
            src={author.profile.profile_background || "/default/background.png"}
            alt=""
          />
          <div
            className="w-full flex justify-center relative"
            style={{ marginTop: "-5rem" }}
          >
            <img
              class="w-36 h-36 p-1 bg-white rounded-full"
              src={author.profile.profile_photo || "/default/avatar.png"}
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
                <h2 className="text-2xl font-bold ">{author.first_name}</h2>
              </div>
              <div>
                <p className="text-base ">@{author.user_name}</p>
              </div>
            </div>
            <div class=" left-0 space-x-0 my-3.5 ml-3 text-black ">
              <div className="m-auto flex justify-start  ">
                <EnvironmentOutlined />
                <span class=" pl-1 inline-block align-bottom text-xs">
                  {author.profile.user_location || "Запорожье"}
                </span>
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
