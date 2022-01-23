import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

function PostsList({ posts, onDelete, onUpdate }) {
  return (
    <div>
      {posts && posts.length
        ? posts.map((post) => (
            <Post
              post={post}
              key={post.id}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        : null}
    </div>
  );
}

export default PostsList;
