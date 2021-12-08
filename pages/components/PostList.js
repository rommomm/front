import React from "react";
import Post from "./Post";
import AddPostForm from "./AddPostForm";
import Link from "next/link";
import api from "../../libs/api";
import Cookies from "js-cookie";
import router from "next/router";

function PostsList({ posts, onDelete, onUpdate, onCreate, userInfo }) {
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

  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
        Explore
        <Link href="./register">
          <a>Register</a>
        </Link>
        <Link href="./login">
          <a>Login</a>
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
      <AddPostForm onCreate={onCreate} />
      <div className="pb-72">
        {posts.length
          ? posts.map((post, i) => (
              <Post
                post={post}
                key={i}
                onDelete={onDelete}
                onUpdate={onUpdate}
                userInfo={userInfo}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default PostsList;
