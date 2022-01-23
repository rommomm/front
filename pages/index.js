import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import React from "react";
import { initializeStore, withRedux } from "../redux";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../redux/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import AddPostForm from "../components/AddPostForm";
import {
  postsApi,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useUpdatePostMutation,
} from "../redux/posts/postApi";
import { Spin } from "antd";
import { useAuthMeQuery } from "../redux/auth/authApi";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
  } = useGetAllPostsQuery();
  const {
    data: user,
    isSuccess: isLoggedIn,
    isLoading: isLoadingUser,
  } = useAuthMeQuery(null, {
    skip: !(Cookies && Cookies.get("token")),
  });
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const handleDeletePost = async (id) => {
    await deletePost(id);
  };
  const handleUpdatePost = async (id, updatedData) => {
    await updatePost({ id, data: updatedData });
  };

  const handleSavePost = async (post) => {
    await createPost(post);
  };

  if (isLoadingUser || isLoadingPosts) {
    return (
      <div className=" fixed inset-1/2 ">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }
  return (
    <Layout title="Home page">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          Explore
        </div>
        <div className="border-black border-l border-r w-full max-w-screen-md	">
          {isLoggedIn && <AddPostForm onCreate={handleSavePost} />}
          {isFetchingPosts ? (
            <div className=" fixed inset-1/2 ">
              <Spin tip="Loading..." size="large" />
            </div>
          ) : (
            <PostsList
              posts={posts.data}
              onUpdate={handleUpdatePost}
              onDelete={handleDeletePost}
            />
          )}
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
