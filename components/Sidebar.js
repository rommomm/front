import Link from "next/link";
import { useContext } from "react";
import UserContext from "./UserContext";
import UserDropDown from "./UserDropDown";
import SidebarLink from "./SidebarLink";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons/lib/icons";

function Sidebar() {
  const { isLoggedIn, user } = useContext(UserContext);
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
            <Link href={`/profile/${user.user_name}`}>
              <a>
                <SidebarLink text="Profile" Icon={ProfileOutlined} />
              </a>
            </Link>
          )}
          {isLoggedIn && <SidebarLink text="Settings" Icon={SettingOutlined} />}
        </div>

        <div className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation">
          <UserDropDown />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
