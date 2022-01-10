import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../redux/posts/actions";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";

function CommentsSystem({ post }) {
  const { comments } = useSelector(({ posts }) => posts);
  const dispatch = useDispatch();

  const handleDeleteComment = async (id) => {
    dispatch(deleteComment(id));
  };

  const handleUpdateComment = async (id, updatedData) => {
    dispatch(updateComment(id, updatedData));
  };

  const handleSaveComment = async (post, comment) => {
    dispatch(createComment(post, comment));
  };
  return (
    <div>
      <AddComment onCreate={handleSaveComment} post={post} />
      <CommentsList
        comments={comments}
        onUpdate={handleUpdateComment}
        onDelete={handleDeleteComment}
      />
    </div>
  );
}

export default CommentsSystem;
