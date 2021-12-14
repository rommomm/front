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
          <div>
            {!isLoggedIn && (
              <div className="flex-grow border-l border-r border-gray-700  ">
                <div className=" text-[#d9d9d9] flex items-center sm:justify-between py-4 px-3  z-50  border-b border-gray-700  bg-gray-700 text-white fixed bottom-0 right-0 w-full">
                  <div className="flex items-center sm:justify-between ">
                    <div class="flex col ">
                      <div className="ml-48">
                        <h2 className="absolute text-xl">Stay tuned!</h2>
                        <br />
                        <span className="text-sm">
                          Sing up for Twitty! Or sign in if you already have an
                          account.
                        </span>
                      </div>
                    </div>

                    <div className="ml-52">
                      <button className="bg-blue-400 rounded-lg px-4 py-1.5 shadow-md ">
                        <Link href="/login">
                          <a>Login</a>
                        </Link>
                      </button>
                      <button className="bg-blue-400 rounded-lg px-4 py-1.5 shadow-md ml-4">
                        <Link href="/register">
                          <a>Register</a>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
