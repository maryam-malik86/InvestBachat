import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const MemberProjectsApi = createApi({
  reducerPath: "MemberProjectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}member` }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: `getprojects`,
        method: "GET",
      }),
    }),
    getProjectById: builder.query({
      query: (id) => ({
        url: `getprojectbyid/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectByIdQuery } =
  MemberProjectsApi;
