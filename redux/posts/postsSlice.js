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
        if (!payload.links.prev) {
          state.posts = payload.data;
          state.nextUrl = payload.links.next;
        } else {
          state.posts = state.posts
            ? current(state.posts).concat(payload.data)
            : payload.data;
          state.nextUrl = payload.links.next;
        }
      }
    );

    builder.addMatcher(
      postsApi.endpoints.getUserPosts.matchFulfilled,
      (state, { payload }) => {
        if (!payload.prev_page_url) {
          state.posts = payload.data;
          state.nextUrl = payload.next_page_url;
        } else {
          state.posts = state.posts
            ? current(state.posts).concat(payload.data)
            : payload.data;
          state.nextUrl = payload.next_page_url;
        }
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
