import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const AdminBankDetails = createApi({
  reducerPath: "AdminBankDetails",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}member/` }),
  endpoints: (builder) => ({
    adminBankDetails: builder.query({
      query: () => ({
        url: `bankAccount`,
        method: "GET",
      }),
    }),
    createInvestments: builder.mutation({
      query: ({
        investment_profile_id,
        duration,
        amount,
        is_active,
        isSubmitted
      }) => ({
        url: `investments`,
        method: "POST",
        body: {
          investment_profile_id,
          duration,
          amount,
          is_active,
          isSubmitted
        },
      }),
    }),

    createInvestmentProfile: builder.mutation({
      query: ({
        user_id, 
        project_id, 
        invested_amount, 
        profit_earned,
        loss, 
        investment_frequency, 
        is_active, 
        duration,
        receipt_path, 
        receipt_id, 
        is_deleted,
        investment_profile_id,
        isSubmitted 
    }) => ({
        url: `investmentProfile`,
        method: "POST",
        body: {
          user_id, 
          project_id, 
          invested_amount, 
          profit_earned,
          loss, 
          investment_frequency, 
          is_active, 
          duration,
          receipt_path, 
          receipt_id, 
          is_deleted,
          investment_profile_id,
          isSubmitted 
        },
      }),
    }),
   
    investmentRecipt: builder.mutation({
      query: ({
        receipt_path,
        user_id,
        investment_id,
        investment_profile_id,
        receipt_id,
        is_deleted
    }) => ({
        url: `receipt`,
        method: "POST",
        body: {
          receipt_path,
          user_id,
          investment_id,
          investment_profile_id,
          receipt_id,
          is_deleted
      },
      }),
    }),
    
    updatingReceipt: builder.mutation({
      query: ({
       id
    }) => ({
        url: `updatereceipt`,
        method: "POST",
        body: {
         id
      },
      }),
    }),

    updatingInvestmentProfile: builder.mutation({
      query: ({
       id
    }) => ({
        url: `updatinginvestmentprofile`,
        method: "POST",
        body: {
         id
      },
      }),
    }),

    getInvestmentProfilesByUserAndProject: builder.mutation({
      query: ({
       user_id,project_id
    }) => ({
        url: `getInvestmentProfilesByUserAndProject`,
        method: "POST",
        body: {
          user_id,project_id
      },
      }),
    }),

    getReceiptsByInvestmentProfileIds: builder.mutation({
      query: ({
        investmentProfileIds
    }) => ({
        url: `getReceiptsByInvestmentProfileIds`,
        method: "POST",
        body: {
          investmentProfileIds
      },
      }),
    }),

    getInvestmentsByProfileIds: builder.mutation({
      query: ({
        investmentProfileIds
    }) => ({
        url: `getInvestmentsByProfileIds`,
        method: "POST",
        body: {
          investmentProfileIds
      },
      }),
    }),

    updateUserData: builder.mutation({
      query: ({
        id,newData
    }) => ({
        url: `updateUserData`,
        method: "POST",
        body: {
          id,newData
      },
      }),
    }),

    gettingAllProfitsAndLoss: builder.mutation({
      query: ({
        user_id
    }) => ({
        url: `gettingAllProfitsAndLoss`,
        method: "POST",
        body: {
         user_id
      },
      }),
    }),

    checkInvestmentTime: builder.mutation({
      query: ({
        user_id
    }) => ({
        url: `checkInvestmentTime`,
        method: "POST",
        body: {
         user_id
      },
      }),
    }),
    getInvestmentProfilesForProject: builder.query({
      query: (projectId) => `investment-profiles/project/${projectId}`, // Construct the URL
      transformResponse: (response) => {
        return response; 
      },
    }),

    getInvestmentProfilesWithProjectNames: builder.query({
      query: (id) => ({
        url: `getInvestmentProfilesWithProjectNames/${id}`,
        method: "GET",
      }),
    }),
    
    setWithdrawFlagForInvestmentProfiles: builder.mutation({
      query: ({
        user_id, project_id,withdraw_type,withdraw_amount,account_number,accountName
    }) => ({
        url: `setWithdrawFlagForInvestmentProfiles`,
        method: "POST",
        body: {
          user_id, project_id,withdraw_type,withdraw_amount,account_number,accountName
      },
      }),
    }),

    createDonation: builder.mutation({
      query: ({
        donation_amount, user_id
    }) => ({
        url: `createDonation`,
        method: "POST",
        body: {
          donation_amount, user_id
      },
      }),
    }),

    
    withdrawFindByIdStatement: builder.query({
      query: (id) => ({
        url: `withdrawFindByIdStatement/${id}`,
        method: "GET",
      }),
    }),


// createDonation
  }),
});

export const { useAdminBankDetailsQuery ,useWithdrawFindByIdStatementQuery,useCreateDonationMutation ,useSetWithdrawFlagForInvestmentProfilesMutation,useGetInvestmentProfilesWithProjectNamesQuery ,useCheckInvestmentTimeMutation ,useGettingAllProfitsAndLossMutation ,useUpdateUserDataMutation,useGetInvestmentsByProfileIdsMutation,useGetReceiptsByInvestmentProfileIdsMutation, useCreateInvestmentsMutation ,useCreateInvestmentProfileMutation,useInvestmentReciptMutation , useUpdatingReceiptMutation , useUpdatingInvestmentProfileMutation, useGetInvestmentProfilesByUserAndProjectMutation } = AdminBankDetails;
