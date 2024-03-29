import Link from "next/link";
import { Menu, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/actions";

export default function DropDownMenu({ children }) {
  const { user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
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
