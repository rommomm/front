import React, { useState } from "react";
import PostsList from "../components/PostList";
import api from "../libs/api";
import Layout from "../components/Layout";

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

  async function handleUpdatePost(id, updatedData) {
    try {
      const response = await api.put(`/posts/${id}`, updatedData);

      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, ...response.data } : post
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  const handleSavePost = async (content) => {
    try {
      const response = await api.post(`/posts`, {
        content,
      });
      const newPost = { ...response.data };
      setPosts([newPost, ...posts]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout title="Home page">
      <PostsList
        posts={posts}
        onUpdate={handleUpdatePost}
        onDelete={handleDeletePost}
        onCreate={handleSavePost}
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await api.get("/posts");

  return { props: { initialPosts: response.data } };
}
export default App;
