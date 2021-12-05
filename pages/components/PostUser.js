import React, { useState } from "react";

function PostsUser() {
  const [editMode, setEditMode] = useState(false);
  const [editableContent, setEditableContent] = useState("");



  return (
    <div className=" flex p-2   cursor-pointer border-b border-gray-700">
      <div className=" m-2 space-y-2 w-full">
        <div className="flex">
        
            <img
              src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
              alt=""
              className="h-12 w-12 rounded-full mr-4"
            />
        
          <div className="text-[#6e767d] w-full">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline 
                }`}
              >
                Vasya
              </h4>
              <span
                className="text-sm sm:text-[15px]"
              >
                @Vasya
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
                  rows="4"
                  className="border border-gray-700 bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                />
              </div>
            ) : (
              <p className="break-normal md:break-all">245425245</p>
            )}
          </div>
          <div className="icon group flex-shrink-0 ml-auto pl-2">
            <div className="border p-1 m-1 rounded-lg px-4 py-1.5 shadow-md">
              {editMode ? (
                <button >Save</button>
              ) : (
                <button>Delete</button>
              )}
            </div>
            <div className="border p-1 m-1 rounded-lg px-4 py-1.5 shadow-md">
              <button >
                {"Cancel","Edit"}
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsUser;
