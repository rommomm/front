import { createSlice, current } from "@reduxjs/toolkit";
import { commentsApi } from "./commentsApi";

export const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      commentsApi.endpoints.getCommentsByPost.matchFulfilled,
      (state, { payload }) => {
        if (!payload.links.prev) {
          state.comments = payload.data;
          state.nextUrl = payload.links.next;
        } else {
          state.comments = state.comments
            ? current(state.comments).concat(payload.data)
            : payload.data;
          state.nextUrl = payload.links.next;
        }
      }
    );
    builder.addMatcher(
      commentsApi.endpoints.createComment.matchFulfilled,
      (state, { payload }) => {
        state.comments = [payload.data, ...current(state.comments)];
      }
    );
    builder.addMatcher(
      commentsApi.endpoints.deleteComment.matchFulfilled,
      (state, { meta }) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== meta.arg.originalArgs.id
        );
      }
    );
    builder.addMatcher(
      commentsApi.endpoints.updateComment.matchFulfilled,
      (state, { payload }) => {
        state.comments = state.comments.map((comment) =>
          comment.id === payload.data.id
            ? { ...comment, ...payload.data }
            : comment
        );
      }
    );
  },
});

export default commentsSlice.reducer;
