import Sidebar from "../components/Sidebar";
import Head from "next/dist/shared/lib/head";
import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PostUserList from "../components/PostUserList";

function Profile({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  // const [userInfo, setUserInfo] = useState(initialUser);

  console.log(initialPosts);
  async function handleDeletePost(id) {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdatePost(post) {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/posts/${post.id}`,
        post
      );

      const newPosts = [...posts];
      const postIndex = posts.findIndex((p) => p.id === post.id);
      newPosts[postIndex] = response.data;
      setPosts(newPosts);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSavePost = async (text) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/posts`, {
        text,
      });
      setPosts([initialUser.initialPosts, ...posts]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="">
        <Head>
          <title>
            {/* {userInfo.initialUser.first_name} {userInfo.initialUser.last_name} */}
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className=" min-h-screen flex w-full mx-auto">
          <Sidebar />
          <div className="border-black border-l border-r w-full max-w-screen-md	">
            <UserHeader />
            <AddPostForm onCreate={handleSavePost} />
            <PostUserList
              posts={posts}
              onUpdate={handleUpdatePost}
              onDelete={handleDeletePost}
              onCreate={handleSavePost}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:8000/api/posts");

  return { props: { initialPosts: response.data } };
}

export default Profile;
