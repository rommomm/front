import { current } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";
import { authApi } from "../auth/authApi";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: apiBaseQuery(),
  endpoints(build) {
    return {
      updateProfile: build.mutation({
        query: (values) => ({
          url: "profile/update",
          method: "PUT",
          body: values,
        }),
        async onQueryStarted({ values }, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              authApi.util.updateQueryData("authMe", null, (draft) => {
                return { draft, ...data };
              })
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      uploadAvatar: build.mutation({
        query: (avatar) => ({
          url: "profile/avatar",
          method: "POST",
          body: avatar,
        }),
        async onQueryStarted({ values }, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              authApi.util.updateQueryData("authMe", null, (draft) => {
                return { draft, ...data };
              })
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),

      removeAvatar: build.mutation({
        query: () => ({
          url: "profile/avatar",
          method: "DELETE",
        }),
        async onQueryStarted(values, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              authApi.util.updateQueryData("authMe", null, (draft) => {
                return { draft, ...data };
              })
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),

      uploadBackground: build.mutation({
        query: (background) => ({
          url: "profile/background",
          method: "POST",
          body: background,
        }),

        async onQueryStarted({ values }, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              authApi.util.updateQueryData("authMe", null, (draft) => {
                return { draft, ...data };
              })
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),

      removeBackground: build.mutation({
        query: () => ({
          url: "profile/background",
          method: "DELETE",
        }),
        async onQueryStarted(values, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              authApi.util.updateQueryData("authMe", null, (draft) => {
                return { draft, ...data };
              })
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
    };
  },
});

export const {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useRemoveAvatarMutation,
  useUploadBackgroundMutation,
  useRemoveBackgroundMutation,
} = profileApi;
