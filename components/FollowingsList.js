import React from "react";
import { useFollowingsQuery } from "../redux/user/userApi";
import FollowUserInfo from "./FollowUserInfo";

function FollowingsList({ author }) {
  const { data: followings } = useFollowingsQuery(
    { username: author.user_name, page: 1 },
    { skip: !author }
  );
  return (
    <div>
      {followings && followings.data && followings.data.length
        ? followings.data.map((data) => (
            <FollowUserInfo key={data.id} data={data} />
          ))
        : null}
    </div>
  );
}

export default FollowingsList;
