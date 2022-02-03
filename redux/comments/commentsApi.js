import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";
import { postsApi } from "../posts/postApi";
import { current } from "@reduxjs/toolkit";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: apiBaseQuery(),
  tagTypes: ["Comment"],
  endpoints(build) {
    return {
      getCommentsByPost: build.query({
        query: ({ postId, page }) => {
          return {
            url: `posts/${postId}/comments?page=${page}`,
            method: "GET",
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "Comment", id })),
                { type: "Comment", id: "LIST" },
              ]
            : [{ type: "Comment", id: "LIST" }],
      }),
      createComment: build.mutation({
        query: ({ id, comment }) => {
          return {
            url: `posts/${id}/comments`,
            method: "POST",
            body: comment,
          };
        },
        invalidatesTags: [{ type: "Comment", id: "LIST" }],
        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
          try {
            dispatch(
              postsApi.util.updateQueryData(
                "getSinglePost",
                `${id}`,
                (draft) => {
                  ++draft.data.comments_count;
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      deleteComment: build.mutation({
        query: ({ id, postId }) => ({
          url: `comments/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Comment", id: "LIST" }],

        async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
          try {
            dispatch(
              postsApi.util.updateQueryData(
                "getSinglePost",
                `${postId}`,
                (draft) => {
                  --draft.data.comments_count;
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      updateComment: build.mutation({
        query: ({ id, data }) => ({
          url: `comments/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [{ type: "Comment", id: "LIST" }],
      }),
    };
  },
});

export const {
  useGetCommentByPostMutation,
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentsApi;
