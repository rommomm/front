import React, { useState, useEffect } from "react";
import axios from "axios";
import PostsList from "./components/PostList";
import Sidebar from "./components/Sidebar";
import Head from "next/head";
import api from "../libs/api";

function App({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const response = posts.map((info) => info.user);
  const [postsUserInfo, setPostsUser] = useState(response);

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
      setPosts([response.data, ...posts]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-[#000] min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <PostsList
          posts={posts}
          onUpdate={handleUpdatePost}
          onDelete={handleDeletePost}
          onCreate={handleSavePost}
        />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await api.get("/posts");

  return { props: { initialPosts: response.data } };
}
export default App;
