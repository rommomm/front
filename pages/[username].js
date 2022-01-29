import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import React from "react";
import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { initializeStore, withRedux } from "../redux";
import {
  postsApi,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAuthorByPostsQuery,
  useGetUserPostsQuery,
  useUpdatePostMutation,
} from "../redux/posts/postApi";
import { useRouter } from "next/router";
import useAuthMe from "../hooks/useAutMe";
import Loader from "../components/Loader";
import { Empty } from "antd";

function Profile() {
  const router = useRouter();
  const {
    data: author,
    isSuccess,
    isLoading: isLoadingAuthor,
  } = useGetAuthorByPostsQuery(router && router.query.username, {
    skip: !router.query.username,
  });
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
  } = useGetUserPostsQuery(author && author.data.user_name, {
    skip: !isSuccess,
  });
  const { data: user, isSuccess: isLoggedIn } = useAuthMe();
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

  if (isLoadingPosts || !(author && posts)) {
    return <Loader />;
  }

  return (
    <Layout title={author.data.user_name}>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader author={author.data} postsCount={posts.length} />
        {showAddPost && <AddPostForm onCreate={handleSavePost} />}
        {isFetchingPosts ? (
          <Loader />
        ) : (
          <PostsList
            posts={postsWithAuthor}
            onUpdate={handleUpdatePost}
            onDelete={handleDeletePost}
          />
        )}
        {posts.length < 1 && <Empty className="pt-5" description="No posts" />}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(router) {
  const store = initializeStore();
  await store.dispatch(
    postsApi.endpoints.getUserPosts.initiate(router.query.username)
  );
  const { data: posts } = postsApi.endpoints.getUserPosts.select(
    router.query.username
  )(store.getState());
  const initialPosts = posts;
  await store.dispatch(postsApi.endpoints.getUserPosts.initiate(initialPosts));
  if (!posts) {
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
