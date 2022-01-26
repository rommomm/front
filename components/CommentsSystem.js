import { Spin } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthMe from "../hooks/useAutMe";
import { useAuthMeQuery } from "../redux/auth/authApi";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByPostQuery,
  useUpdateCommentMutation,
} from "../redux/comments/commentsApi";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../redux/posts/postSlice";
import AddComment from "./AddComment";
import CommentsGuestBanner from "./CommentsGuestBanner";
import CommentsList from "./CommentsList";

function CommentsSystem({ post, openedPostComments }) {
  const { data: comments, isFetching } = useGetCommentsByPostQuery(post.id, {
    skip: !openedPostComments,
  });
  const { data: user, isSuccess: isLoggedIn } = useAuthMe();
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
        <div className=" relative w-full m-auto flex justify-center">
          <Spin className="absolute" tip="Loading..." size="large" />
        </div>
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
