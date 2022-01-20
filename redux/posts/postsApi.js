import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (content) => ({
        url: "posts",
        method: "POST",

        body: { content },
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApi;
