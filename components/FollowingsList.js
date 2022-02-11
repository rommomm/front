import React from "react";
import { useSelector } from "react-redux";
import FollowUserInfo from "./FollowUserInfo";

function FollowingsList() {
  const { followings } = useSelector(({ users }) => users);

  return (
    <div>
      {followings && followings.length
        ? followings.map((following) => (
            <FollowUserInfo key={following.id} data={following} />
          ))
        : null}
    </div>
  );
}

export default FollowingsList;
