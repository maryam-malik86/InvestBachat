import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const AdminProjectApi = createApi({
  reducerPath: "AdminProjectApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}admin` }),
  endpoints: (builder) => ({
    addproject: builder.mutation({
      query: ({
        project_name,
        project_picture,
        description,
        total_investment_amount,
        invested_amount,
        project_duration,
      }) => ({
        url: `project`,
        method: "POST",
        body: {
          project_name,
          project_picture,
          description,
          total_investment_amount,
          invested_amount,
          project_duration,
        },
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const { useAddprojectMutation } = AdminProjectApi;
