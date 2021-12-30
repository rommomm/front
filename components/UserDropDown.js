import React, { useContext } from "react";
import { Row } from "antd";
import DropMenu from "./DropMenu";
import UserContext from "./UserContext";

function UserDropDown() {
  const { isLoggedIn, user } = useContext(UserContext);

  if (!(isLoggedIn && user)) {
    return null;
  }
  return (
    <DropMenu>
      <Row>
        <img
          src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="xl:inline leading-5">
          <a className="text-base">{user.first_name}</a>
          <p className="text-[#6e767d]">@{user.user_name}</p>
        </div>
      </Row>
    </DropMenu>
  );
}

export default UserDropDown;
