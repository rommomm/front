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
import { reset } from "../redux/posts/postsSlice";

function Profile() {
  const postsData = useSelector(({ posts }) => posts);

  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = router && router.query.username;

  const { data: user, isSuccess: isLoggedIn } = useAuthMe();

  const { data: author } = useGetAuthorByPostsQuery(pathname, {
    skip: !pathname,
  });
  const { data: posts, isFetching: isFetchingPosts } = useGetUserPostsQuery(
    { username: pathname },
    { skip: !pathname }
  );

  useEffect(() => {
    console.log("useEffect");
    dispatch(getUserPosts.initiate());
  }, []);

  if (!(posts && author)) {
    return null;
  }
  const { data: nextPosts, next_page_url } = posts;

  const nextCursor = next_page_url
    ? next_page_url.match(/cursor=(\w+)/)[1]
    : next_page_url;

  async function getNextPosts() {
    console.log("getNextPostsgetNextPosts");
    await dispatch(
      getUserPosts.initiate({
        username: pathname,
        cursor: nextCursor,
      })
    );
  }

  const handleDeletePost = async (id) => {
    await deletePost(id);
  };
  const handleUpdatePost = async (id, updatedData) => {
    await updatePost({ id, data: updatedData });
  };
  const handleSavePost = async (post) => {
    await createPost(post);
  };

  const showAddPost = isLoggedIn && author && author.data.id === user.data.id;
  const postsWithAuthor =
    postsData.posts && postsData.posts.length
      ? postsData.posts.map((post) => ({
          ...post,
          author: author && author.data,
        }))
      : [];

  console.log("nextPosts", nextPosts);

  // const _posts = postsWithAuthor.filter((post) => post.author_id);

  return (
    <Layout title={author.data.user_name}>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader author={author.data} postsCount={nextPosts.length} />
        {showAddPost && <AddPostForm onCreate={handleSavePost} />}
        {nextPosts && (
          <InfiniteScroll
            dataLength={nextPosts.length}
            hasMore={nextCursor}
            next={getNextPosts}
          >
            <PostsList
              posts={postsWithAuthor}
              onUpdate={handleUpdatePost}
              onDelete={handleDeletePost}
            />
          </InfiniteScroll>
        )}
        {nextPosts && nextPosts.length < 1 && (
          <Empty className="pt-5" description="No posts" />
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const store = initializeStore();
  store.dispatch(reset());
  store.dispatch(postsApi.util.resetApiState());
  await store.dispatch(
    getUserPosts.initiate({
      username: ctx.query.username,
    })
  );
  const { data: initialPosts } = getUserPosts.select({
    username: ctx.query.username,
  })(store.getState());
  console.log("initialPosts", initialPosts);
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
