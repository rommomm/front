import { comment } from "postcss";
import * as types from "./types";

const initialState = {
  isLoading: false,
  isLoadingPosts: false,
  isLoadingComments: false,
  all: [],
  comments: [],
  author: null,
  openedPostComments: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.START_LOADING_POST:
      return { ...state, isLoadingPosts: true };
    case types.END_LOADING_POST:
      return { ...state, isLoadingPosts: false };
    case types.START_LOADING_COMMENTS:
      return { ...state, isLoadingComments: true };
    case types.END_LOADING_COMMENTS:
      return { ...state, isLoadingComments: false };
    case types.GET_ALL_POSTS:
      return {
        ...state,
        all: payload,
      };
    case types.GET_USER_POSTS:
      return {
        ...state,
        all: payload.posts,
        author: payload.author,
      };
    case types.ADD_POST:
      return {
        ...state,
        all: [payload, ...state.all],
      };
    case types.DELETE_POST:
      return {
        ...state,
        all: state.all.filter((post) => post.id !== payload),
      };
    case types.UPDATE_POST:
      return {
        ...state,
        all: state.all.map((post) =>
          post.id === payload.id ? { ...post, ...payload } : post
        ),
      };
    case types.GET_ALL_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case types.GET_ALL_COMMENTS_BY_POSTS:
      return {
        ...state,
        comments: payload.comments,
        openedPostComments: payload.postId,
      };
    case types.ADD_COMMENT:
      return {
        ...state,
        comments: [payload.comment, ...state.comments],
        all: state.all.map((post) => {
          if (post.id === payload.postId) {
          }
          return post.id === payload.postId
            ? {
                ...post,
                comments_count: post?.comments_count
                  ? ++post.comments_count
                  : 1,
              }
            : post;
        }),
      };

    case types.DELETE_COMMENT:
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
    case types.UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === payload.id ? { ...comment, ...payload } : comment
        ),
      };
    default:
      return state;
  }
};
