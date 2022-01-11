import { CommentOutlined, LikeOutlined } from "@ant-design/icons/lib/icons";
import React from "react";

function CommentsCount() {
  return (
    <div className="w-3/4 m-auto flex justify-start  ">
      <a className="pl-2 ">
        <LikeOutlined style={{ fontSize: "15px" }} />
        <span class=" pl-1 inline-block align-bottom text-xs">0</span>
      </a>
    </div>
  );
}

export default CommentsCount;
