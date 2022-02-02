import { CommentOutlined, LikeOutlined } from "@ant-design/icons/lib/icons";
import React from "react";

function CommentsCount({ counterComments, showComments }) {
  return (
    <div>
      <div className="w-5/6 m-auto	flex justify-start">
        <a>
          <CommentOutlined style={{ fontSize: "22px" }} />
          <span className="inline-block align-bottom text-sm pl-1">
            {!counterComments ? 0 : counterComments}
          </span>
        </a>
      </div>
    </div>
  );
}

export default CommentsCount;
