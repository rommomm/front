import { createSlice, current } from "@reduxjs/toolkit";
import { postsApi } from "../posts/postApi";

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      postsApi.endpoints.getAllPosts.matchFulfilled,
      (state, { payload }) => {
        console.log("payload", payload);
        state.posts = state.posts
          ? current(state.posts).concat(payload.data)
          : payload.data;
      }
    );

    builder.addMatcher(
      postsApi.endpoints.getUserPosts.matchFulfilled,
      (state, { payload }) => {
        state.posts = state.posts
          ? current(state.posts).concat(payload.data)
          : payload.data;
      }
    );

    builder.addMatcher(
      postsApi.endpoints.createPost.matchFulfilled,
      (state, { payload }) => {
        state.posts = [payload.data, ...current(state.posts)];
      }
    );
    // builder.addMatcher(
    //   commentsApi.endpoints.createComment.matchFulfilled,
    //   (state, action) => {
    //     state.allPosts = state.allPosts.map((post) => {
    //       if (post.id === action.meta.arg.originalArgs.id) {
    //       }
    //       return post.id === action.meta.arg.originalArgs.id
    //         ? {
    //             ...post,
    //             comments_count: post?.comments_count
    //               ? ++post.comments_count
    //               : 1,
    //           }
    //         : post;
    //     });
    //     state.userPosts = state.userPosts.map((post) => {
    //       if (post.id === action.meta.arg.originalArgs.id) {
    //       }
    //       return post.id === action.meta.arg.originalArgs.id
    //         ? {
    //             ...post,
    //             comments_count: post?.comments_count
    //               ? ++post.comments_count
    //               : 1,
    //           }
    //         : post;
    //     });
    //   }
    // );
    // builder.addMatcher(
    //   commentsApi.endpoints.deleteComment.matchFulfilled,
    //   (state, action) => {
    //     state.allPosts = state.allPosts.map((post) => {
    //       if (post.id === action.meta.arg.originalArgs.postId) {
    //       }
    //       return post.id === action.meta.arg.originalArgs.postId
    //         ? {
    //             ...post,
    //             comments_count: post?.comments_count
    //               ? --post.comments_count
    //               : 1,
    //           }
    //         : post;
    //     });
    //     state.userPosts = state.userPosts.map((post) => {
    //       if (post.id === action.meta.arg.originalArgs.postId) {
    //       }
    //       return post.id === action.meta.arg.originalArgs.postId
    //         ? {
    //             ...post,
    //             comments_count: post?.comments_count
    //               ? --post.comments_count
    //               : 1,
    //           }
    //         : post;
    //     });
    //   }
    // );
  },
});

export default postsSlice.reducer;
