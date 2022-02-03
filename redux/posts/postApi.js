import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";
import { HYDRATE } from "next-redux-wrapper";

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

        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              postsApi.util.updateQueryData(
                "getAllPosts",
                undefined,
                (draft) => {
                  draft.data.push(...data.data);
                  draft.links = data.links;
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
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
        query: ({ username, page }) => ({
          url: `users/${username}/posts?page=${page}`,
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "UserPosts", id })),
                { type: "UserPosts", id: "LIST" },
              ]
            : [{ type: "UserPosts", id: "LIST" }],
      }),
      createPost: build.mutation({
        query: (post) => ({
          url: "posts",
          method: "POST",
          body: post,
        }),
        invalidatesTags: [
          { type: "Posts", id: "LIST" },
          { type: "UserPosts", id: "LIST" },
        ],
      }),
      deletePost: build.mutation({
        query: (id) => ({
          url: `posts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [
          { type: "Posts", id: "LIST" },
          { type: "UserPosts", id: "LIST" },
        ],
      }),
      updatePost: build.mutation({
        query: ({ id, data }) => ({
          url: `posts/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [
          { type: "Posts", id: "LIST" },
          { type: "UserPosts", id: "LIST" },
          { type: "Post", id: "LIST" },
        ],
      }),
    };
  },
});

export const {
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
