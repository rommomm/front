import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: apiBaseQuery(),
  endpoints(build) {
    return {
      authMe: build.query({
        query: () => {
          return { url: "auth/me", method: "get" };
        },
      }),
      signIn: build.mutation({
        query: (values) => {
          return { url: "login", method: "POST", body: values };
        },
      }),
      signUp: build.mutation({
        query: (values) => {
          return { url: "register", method: "POST", body: values };
        },
      }),
      signOut: build.mutation({
        query: () => {
          return {
            url: "logout",
            method: "POST",
          };
        },
      }),
    };
  },
});

export const {
  useAuthMeQuery,
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
} = authApi;
