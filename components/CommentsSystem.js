import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../redux/posts/postSlice";
import AddComment from "./AddComment";
import CommentsGuestBanner from "./CommentsGuestBanner";
import CommentsList from "./CommentsList";

function CommentsSystem({ post }) {
  const { comments } = useSelector(({ all }) => all);
  const { isLoggedIn } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const handleDeleteComment = async (id) => {
    dispatch(deleteComment({ id, postId: post.id }));
  };

  const handleUpdateComment = async (id, updatedData) => {
    dispatch(updateComment({ id, data: updatedData }));
  };

  const handleSaveComment = async (id, comment) => {
    dispatch(createComment({ id, comment }));
  };
  return (
    <div>
      {isLoggedIn ? (
        <AddComment onCreate={handleSaveComment} post={post} />
      ) : (
        <CommentsGuestBanner count={post.comments_count} />
      )}

      <CommentsList
        comments={comments}
        onUpdate={handleUpdateComment}
        onDelete={handleDeleteComment}
      />
    </div>
  );
}

export default CommentsSystem;
