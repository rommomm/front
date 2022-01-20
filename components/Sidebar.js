import Link from "next/link";
import SidebarLink from "./SidebarLink";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons/lib/icons";
import { useSelector } from "react-redux";

function Sidebar() {
  const { isLoggedIn, user } = useSelector(({ auth }) => auth);
  return (
    <div className="sticky top-0 hidden sm:flex flex-col items-center   p-2 h-screen pr-2">
      <div className="space-y-2.5 xl:ml-24 flex flex-col justify-between h-screen">
        <div>
          <Link href="/">
            <a>
              <SidebarLink text="Home" Icon={HomeOutlined} />
            </a>
          </Link>
          {isLoggedIn && (
            <>
              <SidebarLink text="Messages" Icon={MailOutlined} />
              <SidebarLink text="Users" Icon={UserOutlined} />
            </>
          )}
          {isLoggedIn && user && (
            <Link href={`/${user.user_name}`}>
              <a>
                <SidebarLink text="Profile" Icon={ProfileOutlined} />
              </a>
            </Link>
          )}
          {isLoggedIn && <SidebarLink text="Settings" Icon={SettingOutlined} />}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
