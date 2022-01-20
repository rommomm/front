import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import React from "react";
import { withRedux } from "../redux";
import {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
} from "../redux/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import AddPostForm from "../components/AddPostForm";
import {
  useAddPostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../redux/posts/postsApi";
import { Spin } from "antd";

function App() {
  const { data = [], isLoading } = useGetPostsQuery();
  console.log("data", data);

  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const dispatch = useDispatch();
  const { posts } = useSelector(({ all }) => all);
  const { isLoggedIn } = useSelector(({ user }) => user);

  const handleDeletePost = async (id) => {
    await deletePost(id);
    // dispatch(deletePost(id));
  };
  const handleUpdatePost = async (id, updatedData) => {
    await updatePost({ id, data: updatedData });

    // dispatch(updatePost({ id, data: updatedData }));
  };

  const handleSavePost = async (post) => {
    console.log("post", post);

    await addPost(post);
    // dispatch(createPost(post));
  };
  if (isLoading)
    return (
      <div className=" fixed inset-1/2 ">
        <Spin tip="Loading..." size="large" />
      </div>
    );

  return (
    <Layout title="Home page">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          Explore
        </div>
        <div className="border-black border-l border-r w-full max-w-screen-md	">
          {isLoggedIn && <AddPostForm onCreate={handleSavePost} />}

          <PostsList
            posts={data.data}
            onUpdate={handleUpdatePost}
            onDelete={handleDeletePost}
          />
        </div>
      </div>
    </Layout>
  );
}

// export const getServerSideProps = withRedux(async (context, store) => {
//   await store.dispatch(getAllPosts());
//   return {
//     props: {},
//   };
// });

export default App;
