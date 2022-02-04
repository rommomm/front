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
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAuthorByPostsQuery,
  useGetUserPostsQuery,
  useUpdatePostMutation,
} from "../redux/posts/postApi";
import { useRouter } from "next/router";
import { Empty } from "antd";
import { useDispatch } from "react-redux";
import { initializeStore } from "../redux";

function Profile() {
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [loader, setLoader] = useState(false);
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

  if (!posts) {
    return null;
  }
  const { data: nextPosts, next_page_url } = posts;
  const nextCursor = next_page_url
    ? next_page_url.match(/cursor=(\w+)/)[1]
    : next_page_url;

  async function getNextPosts() {
    await dispatch(
      getUserPosts.initiate({
        username: pathname,
        cursor: nextCursor,
      })
    );
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500);
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
    nextPosts && nextPosts.length
      ? nextPosts.map((post) => ({
          ...post,
          author: author && author.data,
        }))
      : [];

  return (
    <Layout title={author.data.user_name}>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader author={author.data} postsCount={posts.data.length} />
        {showAddPost && <AddPostForm onCreate={handleSavePost} />}
        <InfiniteScroll
          dataLength={nextPosts.length}
          hasMore={nextCursor && true}
          next={getNextPosts}
          loader={loader && <Loader />}
        >
          {isFetchingPosts ? (
            <Loader />
          ) : (
            <PostsList
              posts={postsWithAuthor}
              onUpdate={handleUpdatePost}
              onDelete={handleDeletePost}
            />
          )}
        </InfiniteScroll>
        {posts.data.length < 1 && (
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
