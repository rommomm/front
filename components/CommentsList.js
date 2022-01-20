import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

function CommentsList({ comments, onUpdate, onDelete }) {
  const { isLoadingComments } = useSelector(({ posts }) => posts);

  return (
    <div>
      {isLoadingComments ? (
        <div className=" relative w-full m-auto flex justify-center">
          <Spin className="absolute" tip="Loading..." size="large" />
        </div>
      ) : comments.length ? (
        comments.map((comment) => (
          <Comment
            comment={comment}
            key={comment.id}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      ) : null}
    </div>
  );
}

export default CommentsList;
