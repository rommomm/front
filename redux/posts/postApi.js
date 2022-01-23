import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import api from "../../libs/api";

const apiBaseQuery =
  ({ baseUrl } = { baseUrl: "http://localhost:8000/api/" }) =>
  async ({ url, method, body: data }) => {
    try {
      const result = await api({ url: baseUrl + url, method, data });
      return { data: result };
    } catch (apiError) {
      let err = apiError;
      return {
        error: err,
      };
    }
  };

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: apiBaseQuery(),
  tagTypes: ["Posts", "UserPosts"],
  endpoints(build) {
    return {
      getAllPosts: build.query({
        query: () => ({
          url: "posts",
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "Posts", id })),
                { type: "Posts", id: "LIST" },
              ]
            : [{ type: "Posts", id: "LIST" }],
      }),
      getAuthorByPosts: build.query({
        query: (username) => ({
          url: `users/${username}`,
          method: "GET",
        }),
      }),
      getUserPosts: build.query({
        query: (username) => ({
          url: `users/${username}/posts`,
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "UserPosts", id })),
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
        ],
      }),
    };
  },
});

export const {
  useGetAuthorByPostsQuery,
  useGetUserPostsQuery,
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApi;
