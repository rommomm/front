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
    try {
      const response = await API.posts.updatePost(id, data);
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
  async function ({ id, comment }) {
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
  async function ({ postId, id }) {
    try {
      await API.comments.deleteComment(id);
      return { postId, id };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async function ({ id, data }) {
    try {
      const response = await API.comments.updateComment(id, data);
      return { id, updatedComment: response.data };
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
    postId: null,
    openedPostComments: null,
    isLoading: false,
    isLoadingComments: false,
  },
  extraReducers: {
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.isLoading = false;
    },

    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    [updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id
          ? { ...post, ...action.payload.updatedPost }
          : post
      );
      state.isLoading = false;
    },

    [createComment.pending]: (state) => {
      state.isLoadingComments = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.comments = [action.payload.comment, ...state.comments];
      state.isLoadingComments = false;
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.postId) {
        }
        return post.id === action.payload.postId
          ? {
              ...post,
              comments_count: post?.comments_count ? ++post.comments_count : 1,
            }
          : post;
      });
    },

    [deleteComment.pending]: (state) => {
      state.isLoadingComments = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload.id
      );
      state.isLoadingComments = false;
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.postId) {
        }
        return post.id === action.payload.postId
          ? {
              ...post,
              comments_count: post?.comments_count ? --post.comments_count : 1,
            }
          : post;
      });
    },
    [updateComment.pending]: (state) => {
      state.isLoadingComments = true;
    },
    [updateComment.fulfilled]: (state, action) => {
      state.comments = state.comments.map((comment) =>
        comment.id === action.payload.id
          ? { ...comment, ...action.payload.updatedComment }
          : comment
      );
      state.isLoadingComments = false;
    },
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },

    [getUserPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.author = action.payload.author;
      state.isLoading = false;
    },

    [getAllComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },

    [getAllCommentsByPosts.pending]: (state) => {
      state.isLoadingComments = true;
    },
    [getAllCommentsByPosts.fulfilled]: (state, action) => {
      const { postId } = action.payload;
      state.postId = action.payload.postId;
      state.comments = action.payload.comments;
      state.openedPostComments =
        state.openedPostComments !== postId ? postId : null;
      state.isLoadingComments = false;
    },
  },
});

export default postSlice.reducer;
