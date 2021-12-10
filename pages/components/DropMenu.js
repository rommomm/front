import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import api from "../../libs/api";
import Cookies from "js-cookie";
import router from "next/router";
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function logout() {
  api
    .post("/logout")
    .then(function (response) {
      Cookies.remove("token");
      router.push("/login");
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function Example({ text, Icon }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="font-bold">{text}</Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute bottom-0 mb-7 mr-20 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-2 py-2 text-sm"
                  )}
                >
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </a>
              )}
            </Menu.Item>
            <form method="POST">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-2 py-2 text-sm border-t"
                    )}
                  >
                    <button onClick={logout}>Logout</button>
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
