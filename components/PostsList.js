import React from "react";
import Post from "./Post";

function PostsList({ post, onDelete, onUpdate }) {
  return <Post post={post} onDelete={onDelete} onUpdate={onUpdate} />;
}

export default PostsList;
