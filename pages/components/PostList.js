import React, { useState } from "react";
import axios from "axios";
import Post from "./Post";
import AddPostForm from "./AddPostForm";

function PostsList({ posts, setPosts }) {
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
    <div className="flex-grow border-l border-r border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700">
        Explore
      </div>
      <AddPostForm posts={posts} onCreate={setPosts} />
      <div className="pb-72">
        {posts.length
          ? posts.map((post, i) => (
              <Post
                post={post}
                key={i}
                onDelete={handleDeletePost}
                onUpdate={handleUpdatePost}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default PostsList;
