import { createApi } from "@reduxjs/toolkit/query/react";
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

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: apiBaseQuery(),
  tagTypes: ["Comments"],
  endpoints(build) {
    return {
      getCommentsByPost: build.query({
        query: (id) => ({
          url: `posts/${id}/comments`,
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "Comments", id })),
                { type: "Comments", id: "LIST" },
              ]
            : [{ type: "Comments", id: "LIST" }],
      }),
      createComment: build.mutation({
        query: ({ id, comment }) => ({
          url: `posts/${id}/comments`,
          method: "POST",
          body: comment,
        }),
        invalidatesTags: [{ type: "Comments", id: "LIST" }],
      }),
      deleteComment: build.mutation({
        query: ({ id }) => ({
          url: `comments/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Comments", id: "LIST" }],
      }),
      updateComment: build.mutation({
        query: ({ id, data }) => ({
          url: `comments/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [{ type: "Comments", id: "LIST" }],
      }),
    };
  },
});

export const {
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentsApi;
