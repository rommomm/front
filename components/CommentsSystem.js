import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../redux/posts/actions";
import AddComment from "./AddComment";
import CommentsGuestBanner from "./CommentsGuestBanner";
import CommentsList from "./CommentsList";

function CommentsSystem({ post }) {
  const { comments } = useSelector(({ posts }) => posts);
  const { isLoggedIn } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

  const handleDeleteComment = async (id) => {
    dispatch(deleteComment(id, post));
  };

  const handleUpdateComment = async (id, updatedData) => {
    dispatch(updateComment(id, updatedData));
  };

  const handleSaveComment = async (post, comment) => {
    dispatch(createComment(post, comment));
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
