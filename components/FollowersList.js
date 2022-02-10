import React from "react";
import { useFollowersQuery } from "../redux/user/userApi";
import FollowUserInfo from "./FollowUserInfo";

function FollowersList({ author }) {
  const { data: followers } = useFollowersQuery(
    { username: author.user_name, page: 1 },
    { skip: !author }
  );
  return (
    <div>
      {followers && followers.data && followers.data.length
        ? followers.data.map((data) => (
            <FollowUserInfo key={data.id} data={data} />
          ))
        : null}
    </div>
  );
}

export default FollowersList;
