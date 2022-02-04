import React from "react";
import Post from "./Post";

function PostsList({ posts, onDelete, onUpdate }) {
  return (
    <div>
      {posts && posts.length
        ? posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        : null}
    </div>
  );
}

export default PostsList;
