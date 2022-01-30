import React from "react";
import { Row } from "antd";
import DropDownMenu from "./DropDownMenu";
import useAuthMe from "../hooks/useAutMe";

function UserDropDown() {
  const { data: user } = useAuthMe();
  return (
    <div className="sticky top-0 hidden sm:flex flex-col items-center   p-2 h-screen pr-2">
      <div className="space-y-2.5 xl:ml-24 flex flex-col justify-between h-screen">
        <DropDownMenu>
          <Row>
            <img
              src={user.data.profile_avatar || "/default/avatar.png"}
              alt=""
              className="h-10 w-10 rounded-full xl:mr-2.5"
            />
            <div className="xl:inline leading-5">
              <a className="text-base bg-white">{user.data.first_name}</a>
              <p className="text-[#6e767d]">@{user.data.user_name}</p>
            </div>
          </Row>
        </DropDownMenu>
      </div>
    </div>
  );
}

export default UserDropDown;
