import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async function () {
    try {
      const response = await API.posts.getAllPosts();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async function (ctx) {
    try {
      const author = await API.profile.getUser(ctx.params.username);
      const response = await API.posts.getUserPosts(author.data.user_name);
      const posts = response.map((post) => ({
        ...post,
        author: author.data,
      }));
      return { posts, author: author.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async function (content) {
    try {
      const response = await API.posts.createPost({ content });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async function (id) {
    try {
      await API.posts.DeletePost(id);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async function ({ id, data }) {
    console.log("data", data);
    try {
      const response = await API.posts.updatePost(id, data);
      console.log("response", response);
      return { id, updatedPost: response.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async function () {
    try {
      const response = await API.comments.getAllComments();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllCommentsByPosts = createAsyncThunk(
  "comments/getAllCommentsByPosts",
  async function (id) {
    try {
      const response = await API.comments.getAllCommentsByPosts(id);
      return { postId: id, comments: response.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async function (id, comment) {
    try {
      const response = await API.comments.createComment(id, comment);
      return { postId: id, comment: response.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async function (id, post) {
    try {
      await API.comments.deleteComment(id);
      return { postId: post.id, id };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async function (id, updatedData) {
    try {
      const response = await API.comments.updateComment(id, updatedData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    comments: [],
    openedPostComments: null,
    isLoading: false,
    isLoadingComments: false,
  },
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    [updatePost.fulfilled]: (state, action) => {
      console.log("action", action);
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id
          ? { ...post, ...action.payload.updatedPost }
          : post
      );
    },
    [createComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload.comment);
      // state.all.posts.map((post) => {
      //   if (post.id === action.payload.postId) {
      //   }
      //   return post.id === action.payload.postId
      //     ? {
      //         ...post,
      //         comments_count: post?.comments_count ? ++post.comments_count : 1,
      //       }
      //     : post;
      // });
    },
    [deleteComment.fulfilled]: (state, action) => {
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== payload.id),
        all: state.all.map((post) => {
          if (post.id === payload.postId) {
          }
          return post.id === payload.postId
            ? {
                ...post,
                comments_count: post?.comments_count
                  ? --post.comments_count
                  : -1,
              }
            : post;
        }),
      };
    },
    [updateComment.fulfilled]: (state, action) => {
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === payload.id ? { ...comment, ...payload } : comment
        ),
      };
    },

    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.author = action.payload.author;
    },

    [getAllComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },

    [getAllCommentsByPosts.pending]: (state) => {
      state.isLoadingComments = true;
    },
    [getAllCommentsByPosts.fulfilled]: (state, action) => {
      const { postId } = action.payload;

      state.comments = action.payload;
      state.openedPostComments =
        state.openedPostComments !== postId ? postId : null;
      state.isLoadingComments = false;
    },
  },
});

export default postSlice.reducer;
