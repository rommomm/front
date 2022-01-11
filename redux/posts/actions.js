import * as types from "./types";
import API from "../../api";

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await API.posts.getAllPosts();
    dispatch({
      type: types.GET_ALL_POSTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = (ctx) => async (dispatch) => {
  try {
    const author = await API.profile.getUser(ctx.params.username);
    const response = await API.posts.getUserPosts(author.data.user_name);
    dispatch({
      type: types.GET_USER_POSTS,
      payload: { posts: response.data, author: author.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (content) => async (dispatch) => {
  try {
    dispatch({ type: types.START_LOADING_POST });
    const response = await API.posts.createPost({ content });
    dispatch({
      type: types.ADD_POST,
      payload: response.data,
    });
    dispatch({ type: types.END_LOADING_POST });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.START_LOADING_POST });
    await API.posts.DeletePost(id);
    dispatch({
      type: types.DELETE_POST,
      payload: id,
    });
    dispatch({ type: types.END_LOADING_POST });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: types.START_LOADING_POST });
    const response = await API.posts.updatePost(id, updatedData);
    dispatch({
      type: types.UPDATE_POST,
      payload: response.data,
    });
    dispatch({ type: types.END_LOADING_POST });
  } catch (error) {
    console.log(error);
  }
};

export const getAllComments = () => async (dispatch) => {
  try {
    const response = await API.comments.getAllComments();
    dispatch({
      type: types.GET_ALL_COMMENTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCommentsByPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.START_LOADING_COMMENTS });
    const response = await API.comments.getAllCommentsByPosts(id);
    dispatch({
      type: types.GET_ALL_COMMENTS_BY_POSTS,
      payload: { postId: id, comments: response.data },
    });
    dispatch({ type: types.END_LOADING_COMMENTS });
  } catch (error) {
    console.log(error);
  }
};

export const createComment = (id, comment) => async (dispatch) => {
  try {
    dispatch({ type: types.START_LOADING_COMMENTS });
    const response = await API.comments.createComment(id, comment);
    dispatch({
      type: types.ADD_COMMENT,
      payload: { postId: id, comment: response.data },
    });
    dispatch({ type: types.END_LOADING_COMMENTS });
  } catch (error) {
    console.log(error);
  }
};
export const deleteComment = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: types.START_LOADING_COMMENTS });
    await API.comments.deleteComment(id);
    dispatch({
      type: types.DELETE_COMMENT,
      payload: { postId: post.id, id },
    });
    dispatch({ type: types.END_LOADING_COMMENTS });
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: types.START_LOADING_COMMENTS });
    const response = await API.comments.updateComment(id, updatedData);
    dispatch({
      type: types.UPDATE_COMMENT,
      payload: response.data,
    });
    dispatch({ type: types.END_LOADING_COMMENTS });
  } catch (error) {
    console.log(error);
  }
};
