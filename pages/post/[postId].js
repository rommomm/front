import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
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
  commentsApi,
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
  const { comments: commentsData, nextUrl } = useSelector(
    ({ comments }) => comments
  );

  const [deletePost, { isLoading: isLoadingDeletePost }] =
    useDeletePostMutation();
  const [updatePost, { isLoading: isLoadingUpdatePost }] =
    useUpdatePostMutation();
  const [createComment, { isLoading: isLoadingCreateComment }] =
    useCreateCommentMutation();
  const [updateComment, { isLoading: isLoadingUpdateComment }] =
    useUpdateCommentMutation();
  const [deleteComment, { isLoading: isLoadingDeleteComment }] =
    useDeleteCommentMutation();

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = router && router.query.postId;
  const { data: post } = useGetSinglePostQuery(pathname, { skip: !pathname });
  const postId = post && post.data && post.data.id;
  const { data: comments, isFetching: isFetchingComments } =
    useGetCommentsByPostQuery({ postId }, { skip: !postId });

  useEffect(() => {
    dispatch(commentsApi.util.resetApiState());
    return () => {
      dispatch(commentsApi.util.resetApiState());
    };
  }, []);

  const handleDeleteComment = async (id) => {
    await deleteComment({ id, postId: pathname });
  };

  const handleUpdateComment = async (id, updatedComment) => {
    await updateComment({ id, data: updatedComment });
  };

  const handleSaveComment = async (id, comment) => {
    await createComment({ id, comment });
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    router.push("/");
  };

  const handleUpdatePost = async (id, updatedPost) => {
    await updatePost({ id, data: updatedPost });
  };

  if (!(comments && post)) {
    return null;
  }

  const { data: nextComments, links } = comments;

  const nextCursor = nextUrl && nextUrl.match(/cursor=(\w+)/)[1];

  const getNextComments = () => {
    if (nextCursor) {
      dispatch(
        getCommentsByPost.initiate({
          postId,
          cursor: nextUrl && nextUrl.match(/cursor=(\w+)/)[1],
        })
      );
    }
  };

  const isLoadingComment =
    isLoadingCreateComment || isLoadingDeleteComment || isLoadingUpdateComment;

  const isLoadingPost = isLoadingDeletePost || isLoadingUpdatePost;

  return (
    <Layout title="Post">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px] border-black border-l border-r">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          {post && post.data.comments_count} comments
        </div>
        <div className=" w-full max-w-screen-md	">
          <div>
            {isLoadingPost ? (
              <Loader />
            ) : (
              <SinglePostByAuthor
                post={post && post.data}
                onUpdate={handleUpdatePost}
                onDelete={handleDeletePost}
              />
            )}
            <InfiniteScroll
              dataLength={commentsData.length}
              hasMore={nextCursor}
              next={getNextComments}
            >
              {isLoadingComment ? (
                <Loader />
              ) : (
                <CommentsSystem
                  post={post.data}
                  comments={commentsData}
                  isFetchingComments={isFetchingComments}
                  onUpdate={handleUpdateComment}
                  onDelete={handleDeleteComment}
                  onCreate={handleSaveComment}
                />
              )}
            </InfiniteScroll>
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
