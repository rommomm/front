import Sidebar from "../components/Sidebar";
import Head from "next/dist/shared/lib/head";
import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import React, { useState, useEffect, useContext } from "react";
import PostUserList from "../components/PostUserList";
import api from "../../libs/api";
import UserContext from "../components/UserContext";

function Profile({ userPost = [], user }) {
  const [posts, setPosts] = useState(userPost);
  const { isLoggedIn, user: userInfo } = useContext(UserContext);
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
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    } catch (e) {
      console.log(e);
    }
  }

  const handleSavePost = async (text) => {
    try {
      const response = await api.post(`/posts`, {
        text,
      });
      const newPost = { ...response.data, user };
      setPosts([newPost, ...posts]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="">
        <Head>
          <title></title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className=" min-h-screen flex w-full mx-auto">
          <Sidebar />
          <div className="border-black border-l border-r w-full max-w-screen-md	">
            <UserHeader userInfo={user} />

            {isLoggedIn && user.id == userInfo.id && (
              <AddPostForm onCreate={handleSavePost} userInfo={user} />
            )}

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
  const user = await api.get(`/users/${ctx.params.un}`);
  const response = await api.get(`users/${user.data.id}/posts`);
  const posts = response.data.map((post) => ({
    ...post,
    user: user.data,
  }));
  return {
    props: { userPost: posts, user: user.data },
  };
}

export default Profile;
