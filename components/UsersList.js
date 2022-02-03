import React from "react";
import UserPreview from "./UserPreview";

function UsersList({ users }) {
  return (
    <div>
      {users && users.length
        ? users.map((user) => <UserPreview user={user} key={user.id} />)
        : []}
    </div>
  );
}

export default UsersList;
