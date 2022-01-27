import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: apiBaseQuery(),
  tagTypes: ["Profile"],
  endpoints(build) {
    return {
      updateProfile: build.mutation({
        query: (values) => ({
          url: "profile/update",
          method: "PUT",
          body: values,
        }),
      }),
      uploadAvatar: build.mutation({
        query: (avatar) => ({
          url: "profile/avatar",
          method: "POST",
          body: avatar,
        }),
      }),
      removeAvatar: build.mutation({
        query: () => ({
          url: "profile/avatar",
          method: "DELETE",
        }),
      }),
      uploadBackground: build.mutation({
        query: (background) => ({
          url: "profile/background",
          method: "POST",
          body: background,
        }),
      }),
      removeBackground: build.mutation({
        query: () => ({
          url: "profile/background",
          method: "DELETE",
        }),
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
