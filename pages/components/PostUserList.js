import React from "react";
import Post from "./Post";
import AddPostForm from "./AddPostForm";
import Link from "next/link";

function PostUserList({ posts, onDelete, onUpdate, onCreate ,userInfo}) {
  return (
  
      <div className="pb-72">
        {posts.length
          ? posts.map((post, post_id) => (
              <Post
                post={post}
                key={post_id}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onCreate={onCreate}
                userInfo={userInfo}
              />
            ))
          : null}
      </div>
  );
}

export default PostUserList;
