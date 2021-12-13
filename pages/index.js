import React, { useState } from "react";
import PostsList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import api from "../libs/api";

function App({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  async function handleDeletePost(id) {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdatePost(id, updatedContent) {
    try {
      await api.put(`/posts/${id}`, { content: updatedContent });
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, content: updatedContent } : post
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  const handleSavePost = async (text) => {
    try {
      const response = await api.post(`/posts`, {
        text,
      });
      setPosts([...posts, response.data]);
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
