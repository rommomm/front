import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: apiBaseQuery(),
  tagTypes: ["Users"],
  endpoints(build) {
    return {
      allUsers: build.query({
        query: (page) => ({
          url: `users?page=${page}`,
          method: "GET",
        }),
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
