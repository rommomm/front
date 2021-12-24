import SidebarLink from "./SidebarLink";
import {
  HomeIcon,
  InboxIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Settings } from "@material-ui/icons";
import Link from "next/link";
import DropMenu from "./DropMenu";
import { useContext } from "react";
import UserContext from "./UserContext";
import Cookies from "js-cookie";
function Sidebar() {
  const { isLoggedIn, user } = useContext(UserContext);
  return (
    <div className="sticky top-0 hidden sm:flex flex-col items-center   p-2 h-screen ">
      <div className="space-y-2.5 xl:ml-24 flex flex-col justify-between h-screen">
        <div>
          <Link href="/">
            <a>
              <SidebarLink text="Home" Icon={HomeIcon} />
            </a>
          </Link>
          {isLoggedIn && <SidebarLink text="Messages" Icon={MailIcon} />}
          {isLoggedIn && <SidebarLink text="Users" Icon={UserIcon} />}
          {isLoggedIn && user && (
            <Link href={`/profile/${user.user_name}`}>
              <a>
                <SidebarLink text="Profile" Icon={InboxIcon} />
              </a>
            </Link>
          )}
          {isLoggedIn && <SidebarLink text="Settings" Icon={Settings} />}
        </div>

        <div className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation">
          {isLoggedIn && user && (
            <>
              <Link href={`/profile/${user.user_name}`}>
                <a>
                  <img
                    src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
                    alt=""
                    className="h-10 w-10 rounded-full xl:mr-2.5"
                  />
                </a>
              </Link>
              <div className="hidden xl:inline leading-5">
                <DropMenu name={user.first_name} />

                <p className="text-[#6e767d]">@{user.user_name}</p>
              </div>
            </>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
