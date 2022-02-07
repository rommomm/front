import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";

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
            url: `users?username=${username}&limit=${limit}&page=${page}`,
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
    };
  },
});

export const { useAllUsersQuery, useSearchUserQuery } = userApi;

export const { allUsers, searchUser } = userApi.endpoints;
