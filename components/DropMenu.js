import { useContext } from "react";
import api from "../libs/api";
import Cookies from "js-cookie";
import router from "next/router";
import Link from "next/link";
import UserContext from "./UserContext";
import { Menu, Dropdown } from "antd";

export default function DropMenu({ name }) {
  const { removeUser, user } = useContext(UserContext);

  function logout() {
    api
      .post("/logout")
      .then(function (response) {
        Cookies.remove("token");
        Cookies.remove("user");
        removeUser();
      })
      .then(() => {
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link href={`/profile/${user.user_name}`}>
          <a>Profile</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick={logout}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="topCenter">
      <a className="ant-dropdown-link " onClick={(e) => e.preventDefault()}>
        {name}
      </a>
    </Dropdown>
  );
}
