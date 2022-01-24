import { createApi } from "@reduxjs/toolkit/query/react";
import api from "../../libs/api";

const apiBaseQuery =
  ({ baseUrl } = { baseUrl: "http://localhost:8000/api/" }) =>
  async ({ url, method, body: data }) => {
    try {
      const result = await api({ url: baseUrl + url, method, data });
      return { data: result };
    } catch (apiError) {
      let err = apiError;
      return {
        error: err,
      };
    }
  };

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
