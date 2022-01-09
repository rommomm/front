import React, { useContext } from "react";
import Link from "next/link";

function GuestBanner() {
  return (
    <div className="flex-grow border-l border-r border-gray-700  ">
      <div className=" text-[#d9d9d9] flex justify-center items-center py-4 px-3  z-50  border-b border-gray-700  bg-gray-700 text-white fixed bottom-0 right-0 w-full">
        <div className="w-full max-w-screen-md flex justify-between">
          <div className="flex col ">
            <div>
              <p className="absolute text-xl">Stay tuned!</p>
              <br />
              <span className="text-sm">
                Sing up for Twitty! Or sign in if you already have an account.
              </span>
            </div>
          </div>

          <div>
            <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4   rounded ">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </button>
            <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded ml-4">
              <Link href="/register">
                <a>Register</a>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestBanner;
