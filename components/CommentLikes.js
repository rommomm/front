import { LikeOutlined } from "@ant-design/icons/lib/icons";
import React from "react";

function CommentLikes() {
  return (
    <div className="w-10/12 m-auto flex justify-start  ">
      <a className=" ">
        <LikeOutlined style={{ fontSize: "15px" }} />
        <span class=" pl-1 inline-block align-bottom text-xs"></span>
      </a>
    </div>
  );
}

export default CommentLikes;
