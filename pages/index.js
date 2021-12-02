import React, { useEffect, useState } from "react";
import axios from "axios";
import PostsList from "./components/PostList";
import Sidebar from "./components/Sidebar";
import Head from "next/head";

function App({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className="">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#000] min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />

        <PostsList posts={posts} setPosts={setPosts} />
      </main>
    </div>
  );
}
App.getInitialProps = async (ctx) => {
  const response = await axios.get("http://localhost:8000/api/posts");

  return { initialPosts: response.data };
};

export default App;
