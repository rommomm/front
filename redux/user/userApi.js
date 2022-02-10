import { current } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";
import { postsApi } from "../posts/postApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: apiBaseQuery(),
  tagTypes: ["Users"],
  endpoints(build) {
    return {
      allUsers: build.query({
        query: ({ username, page, limit = 10 }) => {
          console.log("username", username);
          return {
            url:
              page && username
                ? `users?user_name=${username}&limit=${limit}&page=${page}`
                : "users",
            method: "GET",
          };
        },
      }),
      searchUser: build.query({
        query: (query) => ({
          url: `users/search/${query}`,
          method: "GET",
        }),
      }),
      follow: build.mutation({
        query: (username) => {
          console.log("username", username);
          return {
            url: `users/${username}/follow`,
            method: "POST",
            body: username,
          };
        },
        async onQueryStarted(username, { dispatch, queryFulfilled }) {
          console.log("username", username);
          try {
            dispatch(
              postsApi.util.updateQueryData(
                "getAuthorByPosts",
                username,
                (draft) => {
                  ++draft.data.followers_count;
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      unFollow: build.mutation({
        query: (username) => ({
          url: `users/${username}/unfollow`,
          method: "DELETE",
        }),
        async onQueryStarted(username, { dispatch, queryFulfilled }) {
          console.log("username", username);
          try {
            dispatch(
              postsApi.util.updateQueryData(
                "getAuthorByPosts",
                username,
                (draft) => {
                  --draft.data.followers_count;
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      followings: build.query({
        query: ({ username, page }) => ({
          url: page
            ? `users/${username}/followings?page=${page}`
            : `users/${username}/followings`,
          method: "GET",
        }),
      }),
      followers: build.query({
        query: ({ username, page }) => ({
          url: page
            ? `users/${username}/followers?page=${page}`
            : `users/${username}/followers`,
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useAllUsersQuery,
  useSearchUserQuery,
  useFollowMutation,
  useUnFollowMutation,
  useFollowingsQuery,
  useFollowersQuery,
} = userApi;

export const { allUsers, searchUser } = userApi.endpoints;
