import React from "react";
import Post from "./Post";
import AddPostForm from "./AddPostForm";

function PostsList({ posts, onDelete, onUpdate, onCreate }) {
  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 ">
        Explore
      </div>
      <AddPostForm onCreate={onCreate} />
      <div className="pb-72">
        {posts.length
          ? posts.map((post, post_id) => (
              <Post
                post={post}
                key={post_id}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default PostsList;
