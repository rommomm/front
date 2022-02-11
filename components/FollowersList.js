import React from "react";
import { useSelector } from "react-redux";
import FollowUserInfo from "./FollowUserInfo";

function FollowersList() {
  const { followers } = useSelector(({ users }) => users);

  return (
    <div>
      {followers && followers.length
        ? followers.map((follower) => (
            <FollowUserInfo key={follower.id} data={follower} />
          ))
        : null}
    </div>
  );
}

export default FollowersList;
