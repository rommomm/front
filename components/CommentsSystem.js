import { Empty } from "antd";
import React from "react";
import useAuthMe from "../hooks/useAutMe";
import AddComment from "./AddComment";
import CommentsGuestBanner from "./CommentsGuestBanner";
import CommentsList from "./CommentsList";
import Loader from "./Loader";

function CommentsSystem({
  post,
  comments,
  isFetchingComments,
  onUpdate,
  onDelete,
  onCreate,
}) {
  const { isSuccess: isLoggedIn } = useAuthMe();

  return (
    <div>
      {isLoggedIn ? (
        <AddComment onCreate={onCreate} post={post} />
      ) : (
        <CommentsGuestBanner count={post.comments_count} />
      )}
      {isFetchingComments ? (
        <Loader />
      ) : (
        <CommentsList
          comments={comments}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
      {comments.length < 1 && (
        <Empty className="pt-10" description="No comments" />
      )}
    </div>
  );
}

export default CommentsSystem;
