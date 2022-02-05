import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../libs/apiBaseQuery";
import { postsApi } from "../posts/postApi";
import { HYDRATE } from "next-redux-wrapper";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: apiBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Comment"],
  endpoints(build) {
    return {
      getCommentsByPost: build.query({
        query: ({ postId, cursor }) => {
          console.log("postId", postId);
          return {
            url: cursor
              ? `posts/${postId}/comments?cursor=${cursor}`
              : `posts/${postId}/comments`,
            method: "GET",
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: "Comment", id })),
                { type: "Comment", id: "LIST" },
              ]
            : [{ type: "Comment", id: "LIST" }],

        // async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        //   try {
        //     const { data } = await queryFulfilled;
        //     dispatch(
        //       commentsApi.util.updateQueryData(
        //         "getCommentsByPost",
        //         postId,
        //         (draft) => {
        //           draft.data.push(...data.data);
        //           draft.links = data.links;
        //         }
        //       )
        //     );
        //   } catch (error) {
        //     console.error("error", error);
        //   }
        // },
      }),
      createComment: build.mutation({
        query: ({ id, comment }) => {
          return {
            url: `posts/${id}/comments`,
            method: "POST",
            body: comment,
          };
        },
        async onQueryStarted({ id }, { dispatch, queryFulfilled, extra }) {
          console.log("extra", extra);
          const rrrr = await extra;
          console.log("rrr", rrrr);
          console.log(typeof extra);
          try {
            const { data } = await queryFulfilled;
            console.log("id", id);
            dispatch(
              postsApi.util.updateQueryData(
                "getSinglePost",
                `${id}`,
                (draft) => {
                  ++draft.data.comments_count;
                }
              )
            );
            console.log("idididid");
            // dispatch(
            //   console.log("first")
            //   // commentsApi.util.updateQueryData(
            //   //   "getCommentsByPost",
            //   //   id,
            //   //   (draft) => {
            //   //     console.log("data", data);
            //   //     console.log("draft", draft);
            //   //     // draft.data.push(data.data);
            //   //   }
            //   // )
            // );
          } catch (error) {
            console.error("error", error);
          }
        },
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            console.log("data", data);
            dispatch(
              commentsApi.util.updateQueryData(
                "getCommentsByPost",
                id,
                (draft) => {
                  console.log("id", id);
                  console.log("draft", draft);
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      deleteComment: build.mutation({
        query: ({ id, postId }) => ({
          url: `comments/${id}`,
          method: "DELETE",
        }),
        // invalidatesTags: [{ type: "Comment", id: "LIST" }],

        async onQueryStarted(
          { id, postId },
          { dispatch, queryFulfilled, originalArgs }
        ) {
          try {
            dispatch(
              // postsApi.util.updateQueryData(
              //   "getSinglePost",
              //   postId,
              //   (draft) => {
              //     --draft.data.comments_count;
              //   }
              // ),
              commentsApi.util.updateQueryData(
                "getCommentsByPost",
                { postId },
                (draft) => {
                  console.log("draft", draft);
                  // draft.data = draft.data.filter(
                  //   (comment) => comment.id !== id
                  // );
                }
              )
            );
          } catch (error) {
            console.error("error", error);
          }
        },
      }),
      updateComment: build.mutation({
        query: ({ id, data }) => ({
          url: `comments/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [{ type: "Comment", id: "LIST" }],
      }),
    };
  },
});

export const {
  useGetCommentByPostMutation,
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  util: { getRunningOperationPromises },
} = commentsApi;

export const { getCommentsByPost } = commentsApi.endpoints;
