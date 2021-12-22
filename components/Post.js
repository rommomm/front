import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import {
  ChatAlt2Icon,
  DotsHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/solid";
import UserContext from "./UserContext";
import { ChatBubble, HearingTwoTone } from "@material-ui/icons";
import { ChatAltIcon } from "@heroicons/react/outline";

function Post({ post, onDelete, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [editableContent, setEditableContent] = useState(post.text);
  const { isLoggedIn, user } = useContext(UserContext);
  function handleUpdatePost() {
    const updatedPost = { text: editableContent };
    onUpdate(post.id, updatedPost);
    setEditMode(false);
  }

  return (
    <div className=" flex p-2 cursor-pointer border-b border-gray-700">
      <div className=" m-2 space-y-2 w-full">
        <div className="flex">
          {!editMode && (
            <Link href={`/profile/` + post.user.user_name}>
              <a>
                <img
                  src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
                  alt=""
                  className="h-12 w-12 rounded-full mr-4"
                />
              </a>
            </Link>
          )}
          <div className="text-[#6e767d] w-full">
            <div className="inline-block flex group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !editMode && "inline-block"
                }`}
              >
                <Link href={`/profile/` + post.user.user_name}>
                  <a>{post.user.first_name}</a>
                </Link>
              </h4>
              <span
                className={`text-sm sm:text-[15px] pl-1 ${
                  !editMode && "ml-1.5"
                }`}
              >
                @{post.user.user_name}
              </span>
            </div>
            {editMode ? (
              <div className="flex">
                <img
                  src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
                  alt=""
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <div>
                    <textarea
                      value={editableContent}
                      onChange={(e) => setEditableContent(e.target.value)}
                      rows="4"
                      className="border border-gray-700 bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-11/12 "
                    />
                  </div>
                  <div className="ml-96 pl-32">
                    {isLoggedIn && (
                      <div className="icon group flex flex col">
                        <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">
                          {editMode ? (
                            <button onClick={handleUpdatePost}>Save</button>
                          ) : (
                            <button onClick={() => onDelete(post.id)}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                          <button onClick={() => setEditMode(!editMode)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="break-normal md:break-all">{post.text}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        {isLoggedIn && user.id === post.user.id && (
          <Menu as="div" className="relative bg-grey-dark inline-block ">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-2 py-1 bg-white text-sm font-medium text-gray-700 ">
                <DotsHorizontalIcon className="h-5" />
              </Menu.Button>
            </div>

            <Menu.Items className="z-50 absolute  right-0   rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  <button
                    className="text-gray-700
                        block px-4 py-2 text-sm hover:bg-gray-100 text-gray-800    "
                    onClick={() => onDelete(post.id)}
                  >
                    Delete
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button
                    className="text-gray-700
                    block px-6 py-2 text-sm hover:bg-gray-100 text-gray-800"
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        )}
      </div>
    </div>
  );
}

export default Post;
