<<<<<<< HEAD
import React, { useState, useContext } from "react";
import PostsList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import api from "../libs/api";
import UserContext from "../components/UserContext";
=======
import React, { useState } from "react";
import PostsList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import apiClient from "../libs/apiClient";
>>>>>>> main

function App({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);

  const { user } = useContext(UserContext);

  async function handleDeletePost(id) {
    try {
<<<<<<< HEAD
      await api.delete(`/posts/${id}`);
=======
      await apiClient.delete(`/posts/${id}`);
>>>>>>> main
      setPosts(posts.filter((p) => p.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdatePost(id, updatedData) {
    try {
<<<<<<< HEAD
      await api.put(`/posts/${id}`, updatedData);
=======
      await apiClient.put(`/posts/${id}`, updatedData);
>>>>>>> main
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, ...updatedData } : post
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  const handleSavePost = async (text) => {
    try {
<<<<<<< HEAD
      const response = await api.post(`/posts`, {
        text,
      });
      const newPost = { ...response.data, user };
      setPosts([newPost, ...posts]);
=======
      const response = await apiClient.post(`/posts`, {
        text,
      });
      setPosts([...posts, response.data]);
>>>>>>> main
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
<<<<<<< HEAD
  const response = await api.get("/posts");
=======
  const response = await apiClient.get("/posts");
>>>>>>> main

  return { props: { initialPosts: response.data } };
}
export default App;
