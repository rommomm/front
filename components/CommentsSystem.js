import React from "react";
import useAuthMe from "../hooks/useAutMe";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByPostQuery,
  useUpdateCommentMutation,
} from "../redux/comments/commentsApi";
import AddComment from "./AddComment";
import CommentsGuestBanner from "./CommentsGuestBanner";
import CommentsList from "./CommentsList";
import Loader from "./Loader";
import { useSelector } from "react-redux";

function CommentsSystem({ post, openedPostComments }) {
  const { data: comments, isFetching } = useGetCommentsByPostQuery(post.id, {
    skip: !openedPostComments,
  });
  const { isSuccess: isLoggedIn } = useAuthMe();
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (id) => {
    await deleteComment({ id, postId: post.id });
  };

  const handleUpdateComment = async (id, updatedData) => {
    await updateComment({ id, data: updatedData });
  };

  const handleSaveComment = async (id, comment) => {
    await createComment({ id, comment });
  };
  return (
    <div>
      {isLoggedIn ? (
        <AddComment onCreate={handleSaveComment} post={post} />
      ) : (
        <CommentsGuestBanner count={post.comments_count} />
      )}
      {isFetching ? (
        <Loader />
      ) : (
        <CommentsList
          comments={comments && comments.data}
          onUpdate={handleUpdateComment}
          onDelete={handleDeleteComment}
        />
      )}
    </div>
  );
}

export default CommentsSystem;
