import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";
import { createSlice } from "@reduxjs/toolkit";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: apiBaseQuery(),
  tagTypes: ["Comments", "Comment"],
  endpoints(build) {
    return {
      getCommentsByPost: build.query({
        query: (id) => {
          return {
            url: `posts/${id}/comments`,
            method: "GET",
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "Comments", id })),
                { type: "Comments", id: "LIST" },
              ]
            : [{ type: "Comments", id: "LIST" }],
      }),
      createComment: build.mutation({
        query: ({ id, comment }) => {
          return { url: `posts/${id}/comments`, method: "POST", body: comment };
        },
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

// export const counterCommentsSlice = createSlice({
//   name: "counter",
//   initialState: {
//     value: null,
//     isLoading: false,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(createComment.pending, (state, action) => {
//       state.statusByName[action.meta.arg] = "pending";
//     });

//     builder.addCase(createComment.fulfilled, (state, action) => {
//       console.log("state", state);
//       console.log("action", action);
//       state.statusByName[action.meta.arg] = "fulfilled";
//       state.dataByName[action.meta.arg] = action.payload;
//     });

//     builder.addCase(createComment.rejected, (state, action) => {
//       state.statusByName[action.meta.arg] = "rejected";
//     });
//   },
// });

// export const { increment, decrement, incrementByAmount } =
//   counterCommentsSlice.actions;

// export const selectCount = (state) => state.counterComments.value;

export const {
  useGetCommentByPostMutation,
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentsApi;
