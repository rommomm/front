import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";
import { postsApi } from "../posts/postApi";
import { HYDRATE } from "next-redux-wrapper";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: apiBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Comment"],
  endpoints(build) {
    return {
      getCommentsByPost: build.query({
        query: ({ postId, cursor }) => {
          console.log("postId", postId);
          return {
            url: cursor
              ? `posts/${postId}/comments?cursor=${cursor}`
              : `posts/${postId}/comments`,
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
        async onQueryStarted(postId, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              commentsApi.util.updateQueryData(
                "getCommentsByPost",
                postId,
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

      createComment: build.mutation({
        query: ({ id, comment }) => {
          return {
            url: `posts/${id}/comments`,
            method: "POST",
            body: comment,
          };
        },
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
        async onQueryStarted({ id, postId }, { dispatch, queryFulfilled }) {
          try {
            dispatch(
              postsApi.util.updateQueryData(
                "getSinglePost",
                postId,
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
  util: { getRunningOperationPromises },
} = commentsApi;

export const { getCommentsByPost } = commentsApi.endpoints;
