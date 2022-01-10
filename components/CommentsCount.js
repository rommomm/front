import { CommentOutlined, LikeOutlined } from "@ant-design/icons/lib/icons";
import React from "react";
import { useSelector } from "react-redux";

function CommentsCount({ counterComments, showComments }) {
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  return (
    <div>
      <div className="w-5/6 m-auto	flex justify-start">
        {isLoggedIn && (
          <a onClick={showComments}>
            <CommentOutlined style={{ fontSize: "22px" }} />
            <span className="inline-block align-bottom text-sm pl-1">
              {!counterComments ? 0 : counterComments}
            </span>
          </a>
        )}

        <a className="pl-2" onClick={showComments}>
          <LikeOutlined style={{ fontSize: "22px" }} />
          <span className="inline-block align-bottom text-sm pl-1">1</span>
        </a>
      </div>
    </div>
  );
}

export default CommentsCount;
