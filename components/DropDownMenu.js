import Link from "next/link";
import { Menu, Dropdown } from "antd";
import { useSignOutMutation } from "../redux/auth/authApi";
import Cookies from "js-cookie";
import router from "next/router";
import useAuthMe from "../hooks/useAutMe";

export default function DropDownMenu({ children }) {
  const { data: user } = useAuthMe();
  const [signOut] = useSignOutMutation();

  async function handleLogout() {
    try {
      await signOut();
      Cookies.remove("token");
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link href={`/${user.data.user_name}`}>
          <a>Profile</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick={handleLogout}>Logout</a>
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
        {children}
      </a>
    </Dropdown>
  );
}
