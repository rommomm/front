import Link from "next/link";
import SidebarLink from "./SidebarLink";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  MailOutlined,
  SettingOutlined,
  ContainerOutlined,
} from "@ant-design/icons/lib/icons";
import useAuthMe from "../hooks/useAutMe";

function Sidebar() {
  const { data: user, isSuccess: isLoggedIn } = useAuthMe();
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
              <Link href="/feed">
                <a>
                  <SidebarLink text="Feed" Icon={ContainerOutlined} />
                </a>
              </Link>
              <Link href="/users">
                <a>
                  <SidebarLink text="Users" Icon={UserOutlined} />
                </a>
              </Link>
            </>
          )}
          {isLoggedIn && user && (
            <Link href={`/${user.data.user_name}`}>
              <a>
                <SidebarLink text="Profile" Icon={ProfileOutlined} />
              </a>
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/settings">
              <a>
                <SidebarLink text="Settings" Icon={SettingOutlined} />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
