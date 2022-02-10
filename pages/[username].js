import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import React, { useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import useAuthMe from "../hooks/useAutMe";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  getRunningOperationPromises,
  getUserPosts,
  postsApi,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAuthorByPostsQuery,
  useGetUserPostsQuery,
  useUpdatePostMutation,
} from "../redux/posts/postApi";
import { useRouter } from "next/router";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../redux";
import { useFollowMutation, useUnFollowMutation } from "../redux/user/userApi";

function Profile() {
  const { posts: postsData, nextUrl } = useSelector(({ posts }) => posts);

  const [createPost, { isLoading: isLoadingCreatePost }] =
    useCreatePostMutation();
  const [deletePost, { isLoading: isLoadingDeletePost }] =
    useDeletePostMutation();
  const [updatePost, { isLoading: isLoadingUpdatePost }] =
    useUpdatePostMutation();

  const [follow] = useFollowMutation();
  const [unFollow] = useUnFollowMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = router && router.query.username;
  const { data: user, isSuccess: isLoggedIn } = useAuthMe();
  const { data: author } = useGetAuthorByPostsQuery(pathname, {
    skip: !pathname,
  });

  const { data: posts } = useGetUserPostsQuery(
    { username: pathname },
    { skip: !pathname }
  );

  useEffect(() => {
    dispatch(postsApi.util.resetApiState());
    return () => {
      dispatch(postsApi.util.resetApiState());
    };
  }, []);

  const handleDeletePost = async (id) => {
    await deletePost(id);
  };

  const handleUpdatePost = async (id, updatedData) => {
    await updatePost({ id, data: updatedData });
  };

  const handleSavePost = async (post) => {
    await createPost(post);
  };

  const handleFollow = async (followUsername) => {
    await follow(followUsername);
  };

  const handleUnfollow = async (UnFollowUsername) => {
    await unFollow(UnFollowUsername);
  };

  if (!(posts && author)) {
    return null;
  }

  const nextCursor = nextUrl && nextUrl.match(/cursor=(\w+)/)[1];

  function getNextPosts() {
    if (nextCursor) {
      dispatch(
        getUserPosts.initiate({
          username: pathname,
          cursor: nextUrl && nextUrl.match(/cursor=(\w+)/)[1],
        })
      );
    }
  }

  const showAddPost = isLoggedIn && author && author.data.id === user.data.id;

  const postsWithAuthor =
    postsData && postsData.length
      ? postsData.map((post) => ({
          ...post,
          author: author && author.data,
        }))
      : [];

  const isLoadingPost =
    isLoadingCreatePost || isLoadingDeletePost || isLoadingUpdatePost;

  return (
    <Layout title={author.data.user_name}>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader
          author={author.data}
          postsCount={postsWithAuthor.length}
          onFollow={handleFollow}
          onUnFollow={handleUnfollow}
        />
        {showAddPost && <AddPostForm onCreate={handleSavePost} />}
        <InfiniteScroll
          dataLength={postsWithAuthor.length}
          hasMore={nextCursor}
          next={getNextPosts}
        >
          {isLoadingPost ? (
            <Loader />
          ) : (
            <PostsList
              posts={postsWithAuthor}
              onUpdate={handleUpdatePost}
              onDelete={handleDeletePost}
            />
          )}
        </InfiniteScroll>
        {postsData && postsData.length < 1 && (
          <Empty className="pt-5" description="No posts" />
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const store = initializeStore();
  await store.dispatch(
    getUserPosts.initiate({
      username: ctx.query.username,
    })
  );
  const { data: initialPosts } = getUserPosts.select({
    username: ctx.query.username,
  })(store.getState());
  await Promise.all(getRunningOperationPromises());
  if (!initialPosts) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      initialPosts,
    },
  };
}

export default Profile;
