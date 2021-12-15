import React from "react";
import Post from "./Post";

function PostUserList({ posts, onDelete, onUpdate, onCreate }) {
  return (
    <div className="pb-72">
      {posts.length
        ? posts.map((post) => (
            <Post
              post={post}
              key={post.id}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onCreate={onCreate}
            />
          ))
        : null}
    </div>
  );
}

export default PostUserList;
