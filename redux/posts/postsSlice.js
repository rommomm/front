import { createSlice } from "@reduxjs/toolkit";
import { postsApi } from "../posts/postApi";

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      postsApi.endpoints.getAllPosts.matchFulfilled,
      (state, { payload }) => {
        state.allPosts = payload.data;
      }
    );

    builder.addMatcher(
      postsApi.endpoints.getUserPosts.matchFulfilled,
      (state, { payload }) => {
        state.userPosts = payload;
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
