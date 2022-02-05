import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";
import { HYDRATE } from "next-redux-wrapper";
import { current } from "@reduxjs/toolkit";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: apiBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Posts", "UserPosts", "Post"],
  endpoints(build) {
    return {
      getAllPosts: build.query({
        query: (cursor) => ({
          url: cursor ? `posts?cursor=${cursor}` : "posts",
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "Posts", id })),
                { type: "Posts", id: "LIST" },
              ]
            : [{ type: "Posts", id: "LIST" }],

        // async onQueryStarted(id, { dispatch, queryFulfilled }) {
        //   try {
        //     const { data } = await queryFulfilled;
        //     dispatch(
        //       postsApi.util.updateQueryData(
        //         "getAllPosts",
        //         undefined,
        //         (draft) => {
        //           draft.data.push(...data.data);
        //           draft.links = data.links;
        //         }
        //       )
        //     );
        //   } catch (error) {
        //     console.error("error", error);
        //   }
        // },
      }),
      getSinglePost: build.query({
        query: (id) => {
          return {
            url: `posts/${id}`,
            method: "GET",
          };
        },
        providesTags: [{ type: "Post", id: "LIST" }],
      }),
      getAuthorByPosts: build.query({
        query: (username) => ({
          url: `users/${username}`,
          method: "GET",
        }),
      }),
      getUserPosts: build.query({
        query: ({ username, cursor }) => ({
          url: cursor
            ? `users/${username}/posts?cursor=${cursor}`
            : `users/${username}/posts`,
          method: "GET",
        }),

        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "UserPosts", id })),
                { type: "UserPosts", id: "LIST" },
              ]
            : [{ type: "UserPosts", id: "LIST" }],

        async onQueryStarted(username, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              postsApi.util.updateQueryData(
                "getUserPosts",
                username,
                (draft) => {
                  draft.data.push(...data.data);
                  draft.next_page_url = data.next_page_url;
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      createPost: build.mutation({
        query: (post) => ({
          url: "posts",
          method: "POST",
          body: post,
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              postsApi.util.updateQueryData("getAllPosts", id, (draft) => {
                draft.data.push(data.data);
              })
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      deletePost: build.mutation({
        query: (postId) => ({
          url: `posts/${postId}`,
          method: "DELETE",
        }),
        async onQueryStarted(postId, { dispatch, queryFulfilled }) {
          try {
            dispatch(
              postsApi.util.updateQueryData(
                "getAllPosts",
                undefined,
                (draft) => {
                  draft.data = draft.data.filter((post) => post.id !== postId);
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      updatePost: build.mutation({
        query: ({ id, data }) => ({
          url: `posts/${id}`,
          method: "PUT",
          body: data,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              postsApi.util.updateQueryData(
                "getAllPosts",
                undefined,
                (draft) => {
                  draft.data = draft.data.map((post) =>
                    post.id === data.data.id ? { ...post, ...data.data } : post
                  );
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
    };
  },
});

export const {
  useGetPostsMutation,
  useGetSinglePostQuery,
  useGetAuthorByPostsQuery,
  useGetUserPostsQuery,
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  util: { getRunningOperationPromises },
} = postsApi;

export const { getAllPosts, getUserPosts } = postsApi.endpoints;
