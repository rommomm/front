import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

function PostsList({ posts, onDelete, onUpdate }) {
  const { isLoading } = useSelector(({ all }) => all);
  return (
    <div>
      {isLoading ? (
        <div className=" fixed inset-1/2 ">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : posts.length ? (
        posts.map((post) => (
          <Post
            post={post}
            key={post.id}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      ) : null}
    </div>
  );
}

export default PostsList;
