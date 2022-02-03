import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import React, { useState } from "react";
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
import { useSelector } from "react-redux";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
  } = useGetAllPostsQuery(currentPage);
  const { isSuccess: isLoggedIn } = useAuthMe();
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  function perPage(page) {
    setCurrentPage(page);
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
            <PostsList
              posts={posts && posts.data}
              onUpdate={handleUpdatePost}
              onDelete={handleDeletePost}
            />
          )}
        </div>
        {posts && posts.data.length < 1 && (
          <Empty className="pt-44" description="No posts" />
        )}
        <div
          className={`bottom-0 m-auto  py-1 px-1  border-black border-l border-r border-b 
            ${!isLoggedIn && "pb-20"}
          `}
        >
          {posts && posts.data.length ? (
            <Pagination
              size="small"
              total={posts.meta.total}
              onChange={perPage}
            />
          ) : null}
        </div>
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
