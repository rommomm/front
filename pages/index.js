import React, { useState, useEffect } from "react";
import axios from "axios";
import PostsList from "./components/PostList";
import Sidebar from "./components/Sidebar";
import Head from "next/head";
import RouteComponent from "./components/RouteComponent";


function App({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  // const [token, setToken] = useState()
  // const [role, setRole] = useState()

  // useEffect(() => {
  //   getRole();
  // },[]);

  // useEffect(() => {
  //   getToken()
  // },[])

  // function getToken() {
  //   setToken(localStorage.getItem('token'))
  // }

  // function getRole() {
  //   setRole(localStorage.getItem('role'))
  // }

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
      console.log(post);

      const newPosts = [...posts];
      const postIndex = posts.findIndex((p) => p.id === post.id);
      newPosts[postIndex] = response.data;
      setPosts(newPosts);
      console.log(newPosts);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSavePost = async (text) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/posts`, {
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
      {/* <RouteComponent token={token} setToken={setToken} role={role} setRole={setRole}/> */}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:8000/api/3/posts");

  return { props: { initialPosts: response.data } };
}

export default App;
