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
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "Profile", id })),
                { type: "Profile", id: "LIST" },
              ]
            : [{ type: "Profile", id: "LIST" }],
      }),
      uploadAvatar: build.mutation({
        query: (avatar) => ({
          url: "profile/avatar",
          method: "POST",
          body: avatar,
        }),
        invalidatesTags: [{ type: "Profile", id: "LIST" }],
      }),
      removeAvatar: build.mutation({
        query: () => ({
          url: "profile/avatar",
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Profile", id: "LIST" }],
      }),
      uploadBackground: build.mutation({
        query: (background) => ({
          url: "profile/background",
          method: "POST",
          body: background,
        }),
        invalidatesTags: [{ type: "Profile", id: "LIST" }],
      }),
      removeBackground: build.mutation({
        query: () => ({
          url: "profile/background",
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Profile", id: "LIST" }],
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
