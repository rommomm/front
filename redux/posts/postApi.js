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
  tagTypes: ["Posts", "UserPosts"],
  endpoints(build) {
    return {
      getAllPosts: build.query({
        query: (cursor) => {
          return {
            url: cursor ? `posts?cursor=${cursor}` : "posts",
            method: "GET",
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.data.map(({ id }) => ({ type: "Posts", id })),
                { type: "Posts", id: "LIST" },
              ]
            : [{ type: "Posts", id: "LIST" }];
        },

        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              postsApi.util.updateQueryData(
                "getAllPosts",
                undefined,
                (draft) => {
                  if (data.links.prev) {
                    draft.data.push(...data.data);
                    draft.links = data.links;
                  } else {
                    draft.data = data.data;
                    draft.links = data.links;
                  }
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),

      getAuthorByPosts: build.query({
        query: (username) => ({
          url: `users/${username}`,
          method: "GET",
        }),
      }),

      getUserPosts: build.query({
        query: ({ username, cursor }) => {
          return {
            url: cursor
              ? `users/${username}/posts?cursor=${cursor}`
              : `users/${username}/posts`,
            method: "GET",
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({
                  type: "UserPosts",
                  id,
                })),
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
                  if (data.prev_page_url) {
                    draft.data.push(...data.data);
                    draft.next_page_url = data.next_page_url;
                    draft.prev_page_url = data.prev_page_url;
                  } else {
                    draft.data = data.data;
                    draft.next_page_url = data.next_page_url;
                    draft.prev_page_url = data.prev_page_url;
                  }
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
      }),

      createPost: build.mutation({
        query: (post) => ({
          url: "posts",
          method: "POST",
          body: post,
        }),
      }),

      deletePost: build.mutation({
        query: (postId) => ({
          url: `posts/${postId}`,
          method: "DELETE",
        }),
      }),

      updatePost: build.mutation({
        query: ({ id, data }) => ({
          url: `posts/${id}`,
          method: "PUT",
          body: data,
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              postsApi.util.updateQueryData(
                "getSinglePost",
                `${id}`,
                (draft) => {
                  draft.data = { ...draft.data, ...data.data };
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
