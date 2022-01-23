import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import React from "react";
import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import {
  getUserPosts,
  createPost,
  deletePost,
  updatePost,
} from "../redux/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { initializeStore, withRedux } from "../redux";
import {
  postsApi,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAuthorByPostsQuery,
  useGetUserPostsQuery,
  useGetUserQuery,
  useUpdatePostMutation,
} from "../redux/posts/postApi";
import { Spin } from "antd";
import { useAuthMeQuery } from "../redux/auth/authApi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Profile() {
  const router = useRouter();
  const {
    data: author,
    isSuccess,
    isLoading: isLoadingAuthor,
  } = useGetAuthorByPostsQuery(router && router.query.username, {
    skip: !router.query.username,
  });
  const { data: posts, isLoading: isLoadingPosts } = useGetUserPostsQuery(
    author && author.data.user_name,
    {
      skip: !isSuccess,
    }
  );
  const { data: user, isSuccess: isLoggedIn } = useAuthMeQuery(null, {
    skip: !(Cookies && Cookies.get("token")),
  });
  const dispatch = useDispatch();
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

  const showAddPost = isLoggedIn && author && author.data.id === user.data.id;
  const postsWithAuthor =
    posts && posts.length
      ? posts.map((post) => ({
          ...post,
          author: author.data,
        }))
      : [];
  if (isLoadingAuthor || isLoadingPosts) {
    return (
      <div className=" fixed inset-1/2 ">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }
  if (!author && !posts) {
    return null;
  }
  return (
    <Layout>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader author={author.data} postsCount={posts.length} />
        {showAddPost && <AddPostForm onCreate={handleSavePost} />}
        <PostsList
          posts={postsWithAuthor}
          onUpdate={handleUpdatePost}
          onDelete={handleDeletePost}
        />
      </div>
    </Layout>
  );
}

// export async function getServerSideProps() {
//   const store = initializeStore();

//   await store.dispatch(postsApi.endpoints.getUserPosts.initiate());
//   const { data: posts } = postsApi.endpoints.getUserPosts.select()(
//     store.getState()
//   );
//   const initialPosts = posts;
//   await store.dispatch(postsApi.endpoints.getUserPosts.initiate(initialPosts));
//   return {
//     props: {
//       initialPosts,
//     },
//   };
// }

// export const getServerSideProps = withRedux(async (ctx, store) => {
//   await store.dispatch(getUserPosts(ctx));
//   const data = store.getState();
//   if (!data.all.author) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {},
//   };
// });
export default Profile;
