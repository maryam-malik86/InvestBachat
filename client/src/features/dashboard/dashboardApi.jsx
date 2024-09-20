import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}member` }),
  endpoints: (builder) => ({
    fetchInvestmentProfiles: builder
      .mutation({
        query: ({ user_id }) => ({
          url: `investmentProfiles`,
          method: "POST",
          body: { user_id },
        }),
        invalidatesTags: ["signins"],
      }),
  }),
});

export const {
  useFetchInvestmentProfilesMutation,
} = dashboardApi;
