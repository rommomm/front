import React from "react";
import Comment from "./Comment";

function PostsList({ comments, onDelete, onUpdate }) {
  return (
    <div>
      {comments.length
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

export default PostsList;
