import Layout from "../../components/Layout";
import React, { useState } from "react";
import { initializeStore } from "../../redux";
import {
  useDeletePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "../../redux/posts/postApi";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
import SinglePostByAuthor from "../../components/SinglePostByAuthor";
import CommentsSystem from "../../components/CommentsSystem";
import { commentsApi } from "../../redux/comments/commentsApi";

function SinglePost() {
  const router = useRouter();
  const { data: post, isLoading: isLoadingPost } = useGetSinglePostQuery(
    router && router.query.postId,
    {
      skip: !router.query.postId,
    }
  );
  const [openedPostComments, setOpenedPostComments] = useState(true);
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const handleDeletePost = async (id) => {
    await deletePost(id);
    router.push("/");
  };
  const handleUpdatePost = async (id, updatedData) => {
    await updatePost({ id, data: updatedData });
  };
  if (!post) {
    return <Loader />;
  }
  return (
    <Layout title="Post">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px] border-black border-l border-r">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          {post && post.data.comments_count} comments
        </div>
        <div className=" w-full max-w-screen-md	">
          {isLoadingPost ? (
            <Loader />
          ) : (
            <div>
              <SinglePostByAuthor
                post={post && post.data}
                onUpdate={handleUpdatePost}
                onDelete={handleDeletePost}
              />
              <CommentsSystem
                post={post && post.data}
                openedPostComments={openedPostComments}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const store = initializeStore();
  await store.dispatch(
    commentsApi.endpoints.getCommentsByPost.initiate(ctx.query.postId)
  );
  const { data: comments } = commentsApi.endpoints.getCommentsByPost.select(
    ctx.query.postId
  )(store.getState());
  const initialComments = comments;
  await store.dispatch(
    commentsApi.endpoints.getCommentsByPost.initiate(initialComments)
  );
  if (!comments) {
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
