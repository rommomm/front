import React, { useState } from "react";
import axios from "axios";
import Post from "./Post";

function PostList({ posts, setPosts }) {
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

  return (
    <div>
      {posts.length
        ? posts.map((post, i) => (
            <Post
              post={post}
              key={i}
              onDeletePost={handleDeletePost}
              onUpdatePost={handleUpdatePost}
            />
          ))
        : null}
    </div>
  );
}

export default PostList;
