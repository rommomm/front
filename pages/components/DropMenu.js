import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import api from "../../libs/api";
import Cookies from "js-cookie";
import router from "next/router";
import Link from "next/link";
import UserContext from "./UserContext";

export default function DropMenu({ text }) {
  const { removeUser, user } = useContext(UserContext);

  function logout() {
    api
      .post("/logout")
      .then(function (response) {
        Cookies.remove("token");
        Cookies.remove("user");
        removeUser()
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="font-bold">{text}</Menu.Button>
      </div>

      <Menu.Items className="origin-top-right absolute bottom-0 mb-7 mr-20 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu.Item>
            <a
              className="text-gray-700
                    block px-2 py-2 text-sm"
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
                      block w-full text-left px-2 py-2 text-sm border-t"
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
