import { createSlice } from "@reduxjs/toolkit";
import { postsApi } from "../posts/postApi";
import { commentsApi } from "./commentsApi";

export const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      postsApi.endpoints.getAllPosts.matchFulfilled,
      (state, { payload }) => {
        state.posts = payload;
      }
    );
    builder.addMatcher(
      commentsApi.endpoints.createComment.matchFulfilled,
      (state, { payload }) => {
        state.comment = payload;
      }
    );
  },
});

export default commentsSlice.reducer;
