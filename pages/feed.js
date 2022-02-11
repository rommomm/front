import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getRunningOperationPromises,
  postsApi,
  useGetFeedPostsQuery,
  getFeedPosts,
} from "../redux/posts/postApi";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../redux";
import instance from "../libs/api";

function Feed() {
  const { feed: feedPosts, nextUrl } = useSelector(({ posts }) => posts);

  const dispatch = useDispatch();

  const { data: posts } = useGetFeedPostsQuery();

  useEffect(() => {
    dispatch(postsApi.util.resetApiState());

    return () => {
      dispatch(postsApi.util.resetApiState());
    };
  }, []);

  if (!posts || !feedPosts) {
    return null;
  }

  function getNextPosts() {
    dispatch(getFeedPosts.initiate(nextCursor));
  }

  const nextCursor = nextUrl && nextUrl.match(/cursor=(\w+)/)[1];

  return (
    <Layout title="Feed page">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          Feed
        </div>
        <div className="border-black border-l border-r w-full max-w-screen-md">
          {feedPosts && (
            <InfiniteScroll
              dataLength={feedPosts.length}
              hasMore={nextCursor}
              next={getNextPosts}
            >
              <PostsList posts={feedPosts} />
            </InfiniteScroll>
          )}
        </div>
        {feedPosts && feedPosts.length < 1 && (
          <Empty className="pt-44" description="No posts" />
        )}
      </div>
    </Layout>
  );
}

// export async function getServerSideProps(ctx) {
//   const store = initializeStore();
//   const { token } = ctx.req.cookies;
//   if (token) {
//     instance.defaults.headers["Authorization"] = `Bearer ${token}`;
//   }
//   //   await store.dispatch(getFeedPosts.initiate());

//   //   const { data: initialFeedPosts } = getFeedPosts.select()(store.getState());
//   //   console.log("initialFeedPosts", initialFeedPosts);
//   //   await Promise.all(getRunningOperationPromises());
//   return { props: {} };
// }

export default Feed;
