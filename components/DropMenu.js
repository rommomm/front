import { useContext } from "react";
import { Menu } from "@headlessui/react";
import api from "../libs/api";
import Cookies from "js-cookie";
import router from "next/router";
import Link from "next/link";
import UserContext from "./UserContext";

export default function DropMenu({ name }) {
  const { removeUser, user } = useContext(UserContext);

  function logout() {
    api
      .post("/logout")
      .then(function (response) {
        Cookies.remove("token");
        Cookies.remove("user");
        removeUser();
      })
      .then(() => {
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="font-bold no-underline hover:underline">
          {name}
        </Menu.Button>
      </div>

      <Menu.Items className="origin-top-right absolute bottom-0 mb-7 mr-20  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu.Item>
            <a
              className="text-gray-700
              block px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
            >
              <Link href={`/profile/${user.user_name}`}>
                <a>Profile</a>
              </Link>
            </a>
          </Menu.Item>
          <form>
            <Menu.Item>
              <button
                type="submit"
                className="text-gray-700
                block px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
              >
                <button onClick={logout}>Logout</button>
              </button>
            </Menu.Item>
          </form>
        </div>
      </Menu.Items>
    </Menu>
  );
}
