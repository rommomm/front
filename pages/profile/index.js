import Sidebar from "../components/Sidebar";
import Head from "next/dist/shared/lib/head";
import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import React, { useState, useEffect } from "react";
import PostUserList from "../components/PostUserList";
import api from "../../libs/api";

function Profile({ userInfo, userPost = [] }) {
  const [posts, setPosts] = useState(userPost);
  const [information, setInformation] = useState([userInfo]);

  async function handleDeletePost(id) {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdatePost(post) {
    try {
      const response = await api.put(`/posts/${post.id}`, post);

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
      const response = await api.post(`/posts`, {
        text,
      });
      setPosts([response.data, ...posts]);
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
          <Sidebar information={information} />
          <div className="border-black border-l border-r w-full max-w-screen-md	">
            <UserHeader userInfo={userInfo} />
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

export async function getServerSideProps(ctx) {
  console.log(ctx.request);
  const userPost = await api.get(`/1/posts`);
  const userInfo = await api.get("/user/1");
  const [post, user] = await Promise.all([userPost, userInfo]);

  return {
    props: { userPost: post.data, userInfo: user.data },
  };
}

export default Profile;
