import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { initializeStore } from "../redux";
import AddPostForm from "../components/AddPostForm";
import {
  postsApi,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useUpdatePostMutation,
} from "../redux/posts/postApi";
import useAuthMe from "../hooks/useAutMe";
import Loader from "../components/Loader";
import { Empty, Pagination } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";

function App() {
  const [cursor, setCursor] = useState();
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
  } = useGetAllPostsQuery(cursor);
  console.log("posts", posts);
  const { data } = useGetAllPostsQuery();

  const dispatch = useDispatch();

  const { isSuccess: isLoggedIn } = useAuthMe();
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  async function getNextPosts() {
    await dispatch(postsApi.endpoints.getAllPosts.initiate(nextCursor));
  }

  // useEffect(() => {
  //   document.addEventListener("scroll", handleInfiniteScroll);
  //   return () => document.removeEventListener("scroll", handleInfiniteScroll);
  // });

  // const handleInfiniteScroll = (e) => {
  //   const { scrollHeight, scrollTop } = e.target.documentElement;

  //   if (scrollHeight <= scrollTop + window.innerHeight && nextCursor) {
  //     setCursor(nextCursor);
  //   }
  // };

  const handleDeletePost = async (id) => {
    await deletePost(id);
  };
  const handleUpdatePost = async (id, updatedData) => {
    await updatePost({ id, data: updatedData });
  };
  const handleSavePost = async (post) => {
    await createPost(post);
  };

  if (!posts || !data) {
    return null;
  }

  const nextCursor = posts.links.next
    ? posts.links.next.match(/cursor=(\w+)/)[1]
    : posts.links.next;

  return (
    <Layout title="Home page">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          Explore
        </div>
        <div className="border-black border-l border-r w-full max-w-screen-md	">
          {isLoggedIn && <AddPostForm onCreate={handleSavePost} />}
          {isLoadingPosts || isFetchingPosts ? (
            <Loader />
          ) : (
            <InfiniteScroll
              dataLength={posts.data.length}
              hasMore={true}
              next={getNextPosts}
            >
              <PostsList
                posts={posts && posts.data}
                onUpdate={handleUpdatePost}
                onDelete={handleDeletePost}
              />
            </InfiniteScroll>
          )}

          {/* <PostsList
            posts={data && data.data}
            onUpdate={handleUpdatePost}
            onDelete={handleDeletePost}
          /> */}
        </div>
        {posts && posts.data.length < 1 && (
          <Empty className="pt-44" description="No posts" />
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const store = initializeStore();
  await store.dispatch(postsApi.endpoints.getAllPosts.initiate());
  const { data: posts } = postsApi.endpoints.getAllPosts.select()(
    store.getState()
  );
  const initialPosts = posts;
  await store.dispatch(postsApi.endpoints.getAllPosts.initiate(initialPosts));
  return {
    props: {
      initialPosts,
    },
  };
}

export default App;
