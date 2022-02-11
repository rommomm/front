import { EnvironmentOutlined } from "@ant-design/icons/lib/icons";
import Link from "next/link";
import React from "react";

function UserPreview({ user }) {
  console.log("user", user);
  return (
    <Link href={`/${user.user_name}`}>
      <a>
        <div className="relative flex flex-col mx-auto w-full border-black   border-b ">
          <div className="profile w-full flex flex-col text-white">
            <img
              className="max-h-32 object-cover"
              src={user.profile_background || "/default/background.png"}
              alt=""
            />
            <div
              className="w-full flex justify-end pr-10 relative"
              style={{ marginTop: "-5rem" }}
            >
              <img
                class="w-36 h-36 p-1 bg-white rounded-full"
                src={user.profile_avatar || "/default/avatar.png"}
                alt=""
              />
            </div>
            <div style={{ marginTop: "-4rem" }}>
              <div class="buttons left-0 space-x-0 my-3.5 ml-3 text-black ">
                <div className="pr-4">
                  <h2 className="text-2xl font-bold ">
                    {user.first_name} {user.last_name}
                  </h2>
                </div>
                <div>
                  <p className="text-base ">@{user.user_name}</p>
                </div>
              </div>
              <div class="buttons left-0 space-x-0 my-3.5 ml-3 text-black ">
                <div className="m-auto flex justify-start  ">
                  <EnvironmentOutlined />
                  <span class=" pl-1 inline-block align-bottom text-xs">
                    {user.user_location || "Запорожье"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default UserPreview;
