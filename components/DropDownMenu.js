import { useContext } from "react";
import api from "../libs/api";
import Cookies from "js-cookie";
import router from "next/router";
import Link from "next/link";
import UserContext from "./UserContext";
import { Menu, Dropdown } from "antd";

export default function DropDownMenu({ children }) {
  const { removeUser, user } = useContext(UserContext);

  async function logout() {
    try {
      await api.post("/logout");
      Cookies.remove("token");
      Cookies.remove("user");
      removeUser();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
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
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      placement="topCenter"
      getPopupContainer={(trigger) => trigger.parentNode}
    >
      <a className="ant-dropdown-link " onClick={(e) => e.preventDefault()}>
        <a>{children}</a>
      </a>
    </Dropdown>
  );
}
