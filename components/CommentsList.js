import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useGetCommentsByPostQuery } from "../redux/comments/commentsApi";
import Comment from "./Comment";

function CommentsList({ comments, onUpdate, onDelete }) {
  return (
    <div>
      {comments && comments.length
        ? comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        : null}
    </div>
  );
}

export default CommentsList;
