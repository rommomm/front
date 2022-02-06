import { createSlice, current } from "@reduxjs/toolkit";
import { postsApi } from "../posts/postApi";

const initialState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postsApi.endpoints.getAllPosts.matchFulfilled,
      (state, { payload }) => {
        state.posts = payload.data;
      }
    );

    builder.addMatcher(
      postsApi.endpoints.getUserPosts.matchFulfilled,
      (state, { payload }) => {
        state.posts = payload.data;
      }
    );

    builder.addMatcher(
      postsApi.endpoints.createPost.matchFulfilled,
      (state, { payload }) => {
        state.posts = [payload.data, ...current(state.posts)];
      }
    );
    builder.addMatcher(
      postsApi.endpoints.deletePost.matchFulfilled,
      (state, { meta }) => {
        state.posts = state.posts.filter(
          (post) => post.id !== meta.arg.originalArgs
        );
      }
    );
    builder.addMatcher(
      postsApi.endpoints.updatePost.matchFulfilled,
      (state, { payload }) => {
        state.posts = state.posts.map((post) =>
          post.id === payload.data.id ? { ...post, ...payload.data } : post
        );
      }
    );
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
