import React, { useContext } from "react";
import { Row } from "antd";
import DropDownMenu from "./DropDownMenu";
import UserContext from "./UserContext";

function UserDropDown() {
  const { isLoggedIn, user } = useContext(UserContext);

  if (!(isLoggedIn && user)) {
    return null;
  }
  return (
    <DropDownMenu>
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
    </DropDownMenu>
  );
}

export default UserDropDown;
