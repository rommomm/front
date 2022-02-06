import Layout from "../../components/Layout";
import React, { useState } from "react";
import Loader from "../../components/Loader";
import SinglePostByAuthor from "../../components/SinglePostByAuthor";
import CommentsSystem from "../../components/CommentsSystem";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  useDeletePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "../../redux/posts/postApi";
import {
  getCommentsByPost,
  getRunningOperationPromises,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByPostQuery,
  useUpdateCommentMutation,
} from "../../redux/comments/commentsApi";
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../../redux";
import { useRouter } from "next/router";

function SinglePost() {
  const commentsData = useSelector(({ comments }) => comments);
  console.log("commentsData", commentsData);
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = router && router.query.postId;

  const { data: post } = useGetSinglePostQuery(pathname, { skip: !pathname });

  const postId = post && post.data && post.data.id;

  const { data: comments, isFetching: isFetchingComments } =
    useGetCommentsByPostQuery({ postId }, { skip: !postId });

  if (!(comments && post)) {
    return null;
  }

  const { data: nextComments, links } = comments;

  const nextCursor = links.next
    ? links.next.match(/cursor=(\w+)/)[1]
    : links.next;

  async function getNextComments() {
    await dispatch(
      getCommentsByPost.initiate({
        postId,
        cursor: nextCursor,
      })
    );
  }
  const handleDeleteComment = async (id) => {
    await deleteComment({ id, postId: pathname });
  };

  const handleUpdateComment = async (id, updatedData) => {
    await updateComment({ id, data: updatedData });
  };

  const handleSaveComment = async (id, comment) => {
    await createComment({ id, comment });
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    router.push("/");
  };

  const handleUpdatePost = async (id, updatedData) => {
    await updatePost({ id, data: updatedData });
  };

  return (
    <Layout title="Post">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px] border-black border-l border-r">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          {post && post.data.comments_count} comments
        </div>
        <div className=" w-full max-w-screen-md	">
          <div>
            <SinglePostByAuthor
              post={post && post.data}
              onUpdate={handleUpdatePost}
              onDelete={handleDeletePost}
            />
            {nextComments && post && (
              <InfiniteScroll
                dataLength={nextComments.length}
                hasMore={nextCursor && true}
                next={getNextComments}
              >
                <CommentsSystem
                  post={post.data}
                  comments={commentsData.comments}
                  isFetchingComments={isFetchingComments}
                  onUpdate={handleUpdateComment}
                  onDelete={handleDeleteComment}
                  onCreate={handleSaveComment}
                />
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const store = initializeStore();
  await store.dispatch(
    getCommentsByPost.initiate({
      postId: ctx.query.postId,
    })
  );
  const { data: initialComments } = getCommentsByPost.select({
    postId: ctx.query.postId,
  })(store.getState());
  await Promise.all(getRunningOperationPromises());
  if (!initialComments) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      initialComments,
    },
  };
}

export default SinglePost;
