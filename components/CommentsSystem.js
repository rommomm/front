import { Empty } from "antd";
import React from "react";
import useAuthMe from "../hooks/useAutMe";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../redux/comments/commentsApi";
import AddComment from "./AddComment";
import CommentsGuestBanner from "./CommentsGuestBanner";
import CommentsList from "./CommentsList";
import Loader from "./Loader";

function CommentsSystem({ post, comments, isFetchingComments }) {
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
      {isFetchingComments ? (
        <Loader />
      ) : (
        <CommentsList
          comments={comments}
          onUpdate={handleUpdateComment}
          onDelete={handleDeleteComment}
        />
      )}
      {comments && comments.data < 1 && (
        <Empty className="pt-10" description="No comments" />
      )}
    </div>
  );
}

export default CommentsSystem;
