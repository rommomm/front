import SidebarLink from "./SidebarLink";
import {
  HomeIcon,
  InboxIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Settings } from "@material-ui/icons";

function Sidebar() {
  return (
    <div className="sticky top-0 hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 h-screen ">
      <div className="space-y-2.5 xl:ml-24 flex flex-col justify-between h-screen">
        <div>
          <SidebarLink text="Home" Icon={HomeIcon} />
          <SidebarLink text="Messages" Icon={MailIcon} />
          <SidebarLink text="Users" Icon={UserIcon} />
          <SidebarLink text="Profile" Icon={InboxIcon} />
          <SidebarLink text="Settings" Icon={Settings} />
        </div>

        <div className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation">
          <img
            src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
            alt=""
            className="h-10 w-10 rounded-full xl:mr-2.5"
          />
          <div className="hidden xl:inline leading-5">
            <h4 className="font-bold">Vasya</h4>
            <p className="text-[#6e767d]">@Vasya</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;