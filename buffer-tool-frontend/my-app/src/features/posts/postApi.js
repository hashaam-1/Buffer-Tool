import { apiSlice } from "../../app/api";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    schedulePost: builder.mutation({
      query: (data) => ({
        url: "/posts/schedule",
        method: "POST",
        body: data,
      }),
    }),
    getAllPosts: builder.query({
      query: () => "/posts",
    }),
  }),
});

export const { useSchedulePostMutation, useGetAllPostsQuery } = postApi;