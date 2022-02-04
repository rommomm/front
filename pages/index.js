import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import AddPostForm from "../components/AddPostForm";
import useAuthMe from "../hooks/useAutMe";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  getRunningOperationPromises,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useUpdatePostMutation,
  getAllPosts,
  postsApi,
} from "../redux/posts/postApi";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../redux";

function App() {
  const postsData = useSelector(({ posts }) => posts);
  console.log("postsData", postsData);
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const { isSuccess: isLoggedIn } = useAuthMe();
  const { data: posts, isFetching: isFetchingPosts } = useGetAllPostsQuery();

  if (!posts) {
    return null;
  }

  const { data: nextPosts, links } = posts;
  const nextCursor = links.next
    ? links.next.match(/cursor=(\w+)/)[1]
    : links.next;
  console.log("nextPosts", nextPosts);
  async function getNextPosts() {
    await dispatch(getAllPosts.initiate(nextCursor));
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

  return (
    <Layout title="Home page">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          Explore
        </div>
        <div className="border-black border-l border-r w-full max-w-screen-md	">
          {isLoggedIn && <AddPostForm onCreate={handleSavePost} />}
          {nextPosts && (
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
                  posts={nextPosts}
                  onUpdate={handleUpdatePost}
                  onDelete={handleDeletePost}
                />
              )}
            </InfiniteScroll>
          )}
        </div>
        {nextPosts && nextPosts.length < 1 && (
          <Empty className="pt-44" description="No posts" />
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const store = initializeStore();
  await store.dispatch(getAllPosts.initiate());
  const { data: initialPosts } = getAllPosts.select()(store.getState());
  await Promise.all(getRunningOperationPromises());
  return { props: { initialPosts } };
}

export default App;
