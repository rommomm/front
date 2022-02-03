import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import React, { useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import { initializeStore } from "../redux";
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
import { Empty, Pagination } from "antd";

function Profile() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const {
    data: author,
    isSuccess,
    isLoading: isLoadingAuthor,
    refetch: refetchAuthor,
  } = useGetAuthorByPostsQuery(router && router.query.username, {
    skip: !router.query.username,
  });
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
  } = useGetUserPostsQuery(
    { username: author && author.data.user_name, page: currentPage },
    {
      skip: !isSuccess,
    }
  );
  const { data: user, isSuccess: isLoggedIn } = useAuthMe();
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

  useEffect(() => {
    refetchAuthor();
  }, []);

  const showAddPost = isLoggedIn && author && author.data.id === user.data.id;
  const postsWithAuthor =
    posts && posts.data && posts.data.length
      ? posts.data.map((post) => ({
          ...post,
          author: author && author.data,
        }))
      : [];

  if (isLoadingAuthor || !(author && posts)) {
    return <Loader />;
  }

  return (
    <Layout title={author.data.user_name}>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader author={author.data} postsCount={posts.total} />
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
        {posts.data.length < 1 && (
          <Empty className="pt-5" description="No posts" />
        )}
        <div
          className={`bottom-0 m-auto  py-1 px-1  border-black
            ${!isLoggedIn && "pb-20"}
          `}
        >
          {posts && posts.data.length ? (
            <Pagination size="small" total={posts.total} onChange={perPage} />
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const store = initializeStore();
  await store.dispatch(
    postsApi.endpoints.getUserPosts.initiate({
      username: ctx.query.username,
      page: 1,
    })
  );
  const { data: posts } = postsApi.endpoints.getUserPosts.select({
    username: ctx.query.username,
    page: 1,
  })(store.getState());
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
