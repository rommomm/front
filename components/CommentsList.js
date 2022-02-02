import React from "react";
import Comment from "./Comment";

function CommentsList({ comments, onUpdate, onDelete }) {
  return (
    <div className=" border-gray-400 border-t">
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
