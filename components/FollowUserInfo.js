import { Avatar, List } from "antd";
import Link from "next/link";
import React from "react";

function FollowUserInfo({ data }) {
  if (!data) {
    return null;
  }
  return (
    <div class="flex items-center border-b">
      <div>
        <img
          className="w-12 h-12 p-1 bg-white rounded-full"
          src={data.profile_avatar || "/default/avatar.png"}
        />
      </div>
      <div class="pl-2 text-base">
        <Link href={`/${data.user_name}`}>
          <a>{data.user_name}</a>
        </Link>
      </div>
    </div>
    // <div className="flex justify-between">
    //   <img
    //     className="w-12 h-12 p-1 bg-white rounded-full"
    //     src={data.profile_avatar || "/default/avatar.png"}
    //     alt=""
    //   />
    //   <a href="https://ant.design">{data.user_name}</a>
    // </div>
  );
}

export default FollowUserInfo;
