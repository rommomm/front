import React, { useContext } from "react";
import Post from "./Post";

function PostsList({ posts, onDelete, onUpdate }) {
  return (
    <div>
      {posts.length
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
