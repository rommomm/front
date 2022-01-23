import Link from "next/link";
import { Menu, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useAuthMeQuery, useSignOutMutation } from "../redux/auth/authApi";
import Cookies from "js-cookie";
import router from "next/router";

export default function DropDownMenu({ children }) {
  const { data: user, isSuccess: isLoggedIn } = useAuthMeQuery(null, {
    skip: !(Cookies && Cookies.get("token")),
  });
  const [signOut] = useSignOutMutation();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      Cookies.remove("token");
      await signOut();
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link href={`/${user.user_name}`}>
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
