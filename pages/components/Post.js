import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

function Post({ post, onDelete, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [editableContent, setEditableContent] = useState(post.text);
  const [userInfo, setUserInfo] = useState(post.user);
  const [isLoggedIn, setisLoggedIn] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "undefined") {
      setisLoggedIn(false);
    }
  }, []);

  function handleUpdatePost() {
    const updatedPost = { ...post, text: editableContent };
    onUpdate(updatedPost);
    setEditMode(false);
  }

  return (
    <div className=" flex p-2   cursor-pointer border-b border-gray-700">
      <div className=" m-2 space-y-2 w-full">
        <div className="flex">
          {!editMode && (
            <img
              src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
              alt=""
              className="h-12 w-12 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d] w-full">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !editMode && "inline-block"
                }`}
              >
                <Link href={"/profile/" + userInfo.user_name}>
                  <a>{userInfo.first_name}</a>
                </Link>
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!editMode && "ml-1.5"}`}
              >
                @{userInfo.user_name}
              </span>
            </div>

            {editMode ? (
              <div className="flex">
                <img
                  src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
                  alt=""
                  className="h-12 w-12 rounded-full mr-4"
                />
                <textarea
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  rows="4"
                  className="border border-gray-700 bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                />
              </div>
            ) : (
              <p className="break-normal md:break-all">{post.text}</p>
            )}
          </div>
          {isLoggedIn && (
            <div className="icon group flex-shrink-0">
              <div className="border p-1 m-1 rounded-lg px-4 shadow-md">
                {editMode ? (
                  <button onClick={handleUpdatePost}>Save</button>
                ) : (
                  <button onClick={() => onDelete(post.id)}>Delete</button>
                )}
              </div>
              <div className="border p-1 m-1 rounded-lg px-4  shadow-md">
                (
                <button onClick={() => setEditMode(!editMode)}>
                  {editMode ? "Cancel" : "Edit"}
                </button>
                )
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
