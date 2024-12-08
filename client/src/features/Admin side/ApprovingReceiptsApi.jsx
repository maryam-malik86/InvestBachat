import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ApprovingReceipts = createApi({
  reducerPath: "ApprovingReceipts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}admin`,
  }),
  typeTages:["pendingreceipts","projects","withdrawn","gettingProfitLossEntry"],
  endpoints: (builder) => ({
    gettingAllReceipts: builder.query({
      providesTags: ["pendingreceipts"],
      query: () => ({
        url: `gettingallreceipts`,
        method: "GET",
      }),
    }),
    calculateUserCapital: builder.mutation({
      query: ({ projectId }) => {
        console.log("Sending request to calculate user capital for projectId:", projectId); // Log projectId
        return {
          url: `calculateUserCapital`,
          method: "POST",
          body: { projectId },
        };
      },
    }),
    
    calculateUserCapitalById: builder.mutation({
      query: (userId) => ({
          url: '/calculateUserCapitalById', // Backend route
          method: 'POST',
          body: { userId },
      }),
  }),
    fetchProfitLossByDate: builder.query({
     
      query: (entryid) => {

         // Log the date being passed
        return {
          url: 'profitlossbydate',
          method: 'POST',
          body: { entryid },
        };
      },
      providesTags: ['gettingProfitLossEntry'],
    }),
    
    gettingReceiptById: builder.query({

      query: (id) => ({
        url: `getreceiptbyid/${id}`,
        method: "GET",
      }),
    }),
    addTransctionId: builder.mutation({
      query: ({ transactionId }) => ({
        url: `addTransactionId`,
        method: "POST",
        body: {
          transactionId,
        },
      }),
      // invalidatesTags: ["approves"],
    }),
    gettingAllUsers: builder.query({
      query: () => ({
        url: `gettingallusers`,
        method: "GET",
      }),
    }),

    createProject: builder.mutation({
      query: ({
        project_name,
        project_picture,
        description,
        required_investment,
        invested_amount,
        project_duration,
        showAmounts
      }) => ({
        url: `project`,
        method: "POST",
        body: {
          project_name,
          project_picture,
          description,
          required_investment,
          invested_amount,
          project_duration,
          showAmounts
        },
      }),
    }),

    gettingAllProjects: builder.query({
      providesTags: ["projects"],
      query: () => ({
        url: `gettingallprojects`,
        method: "GET",
      }),
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `deleteproject/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["projects"]
    }),

    gettingAdminProjectById: builder.query({
      query: (id) => ({
        url: `getprojectbyid/${id}`,
        method: "GET",
      }),
    }),

    updatedProjectById: builder.mutation({
      query: ({
        id,
        project_name,
        project_picture,
        description,
        required_investment,
        invested_amount,
        project_duration,
      }) => ({
        url: `updateproject/${id}`,
        method: "POST",
        body: {
          project_name,
          project_picture,
          description,
          required_investment,
          invested_amount,
          project_duration,
        },
      }),
    }),
    removeUser: builder.mutation({
      query: (id) => {
        console.log(`Removing user with ID: ${id}`); // Correct placement of console.log
        return {
          url: `users/${id}`,
          method: 'DELETE',
        };
      },
    }),
    
    previeweReceiptById: builder.query({
      providesTags: ["investmentreceipts"],
      query: (id) => ({
        url: `getreceiptdetailsbyid/${id}`,
        method: "GET",
        
      }),
    }),

    updateInvestmentProfileById: builder.mutation({
      query: ({
        id, invested_amount, investment_frequency
      }) => ({
        url: `updateInvestmentProfileById`,
        method: "POST",
        body: {
          id, invested_amount, investment_frequency
        },
      }),
    }),

    updateInvestmentById: builder.mutation({
      query: ({
        id, investment_amount
      }) => ({
        url: `updateInvestmentById`,
        method: "POST",
        body: {
          id, investment_amount
        },
      }),
    }),

    updateReceiptId: builder.mutation({
      query: ({
        id, receipt_id
      }) => ({
        url: `updateReceiptId`,
        method: "POST",
        body: {
          id, receipt_id
        },
      }),
      invalidatesTags: ["pendingreceipts"],
    }),

    addInvestment: builder.mutation({
      query: ({
        id, amount,investment_status
      }) => ({
        url: `addInvestment`,
        method: "POST",
        body: {
          id, amount,investment_status
        },
      }),
      invalidatesTags: ["projects"],
    }),

    updateInvestmentStatusById: builder.mutation({
      query: ({
        id, investment_status
      }) => ({
        url: `updateInvestmentStatusById`,
        method: "POST",
        body: {
          id, investment_status
        },
      }),
    }),

    updatinguserrole: builder.mutation({
      query: ({
        userId, newRole
      }) => ({
        url: `updatinguserrole`,
        method: "POST",
        body: {
          userId, newRole
        },
      }),
    }),

    updateUserIsActive: builder.mutation({
      query: ({
        id, isActive
      }) => ({
        url: `updateUserIsActive`,
        method: "POST",
        body: {
          id, isActive
        },
      }),
    }),

    pdfDownload: builder.query({
      query: () => ({
        url: `download-database-pdf`,
        method: "GET",
      }),
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `getUserById/${id}`,
        method: "GET",
      }),
    }),

    calculateProfitPercentageForAllUsers: builder.mutation({
      query: ({
        projectId, profitAmount, totalInvestedAmount, profit_loss_entry_id,
      }) => ({
        url: `calculateProfitPercentageForAllUsers`,
        method: "POST",
        body: {
          projectId, profitAmount, totalInvestedAmount,profit_loss_entry_id
        },
      }),
    }),
    deleteReceipt: builder.mutation({
      query: (id) => {
        console.log("Attempting to delete receipt with ID:", id); // Log the ID being sent to the backend
        return {
          url: `/receipt/${id}`,
          method: 'DELETE',
        };
      },
    }),
    
    getWithdrawnInvestmentProfiles: builder.query({
      query: () => ({
        url: `getWithdrawnInvestmentProfiles`,
        method: "GET",
      }),
    }),
    

    getWithDrawInvestmentProfileById: builder.query({
      query: (id) => ({
        url: `getWithDrawInvestmentProfileById/${id}`,
        method: "GET",
      }),
    }),

    getAllWithdraws: builder.query({
      providesTags: ["withdrawn"],
      query: () => ({
        url: `getAllWithdraws`,
        method: "GET",
      }),
    }),

    withdrawFindById: builder.query({
      query: (id) => ({
        url: `withdrawFindById/${id}`,
        method: "GET",
      }),
    }),

    deleteInvestmentProfile: builder.mutation({
      query: ({
        user_id, project_id, with_draw
      }) => ({
        url: `deleteInvestmentProfile`,
        method: "POST",
        body: {
          user_id, project_id, with_draw
        },
      }),
      invalidatesTags: ["withdrawn"]
    }),
    subtractAmountFromProfit: builder.mutation({
      query: ({
        user_id, amount
      }) => ({
        url: `subtractAmountFromProfit`,
        method: "POST",
        body: {
          user_id, amount
        },
      }),
      invilidatesTags: ["withdrawn"]
    }),

    withdrawFindByIdAndDelete: builder.mutation({
      query: ({
        id
      }) => ({
        url: `withdrawFindByIdAndDelete`,
        method: "POST",
        body: {
          id
        },
      }),
    }),

    createApprovedWithdrawal: builder.mutation({
      query: ({
        receipts_url, account_number,user_name,user_cnic
      }) => ({
        url: `createApprovedWithdrawal`,
        method: "POST",
        body: {
          receipts_url, account_number,user_name,user_cnic
        },
      }),
    }),

    getAllApprovedWithdrawals: builder.query({
      query: () => ({
        url: `getAllApprovedWithdrawals`,
        method: "GET",
      }),
    }),

    getApprovedWithdrawalById: builder.query({
      query: (id) => ({
        url: `getApprovedWithdrawalById/${id}`,
        method: "GET",
      }),
    }),

    subtractAmountFromDonation: builder.mutation({
      query: ({
        user_id, donation_amount,donation_id
      }) => ({
        url: `subtractAmountFromDonation`,
        method: "POST",
        body: {
          user_id, donation_amount,donation_id
        },
      }),
    }),

    getAllDonations: builder.query({
      query: () => ({
        url: `getAllDonations`,
        method: "GET",
      }),
    }),

    createProfitLossEntry: builder.mutation({
      query: ({ user_id, project_id, amount, invested_amount, profit_amount, loss_amount }) => ({
          url: `createProfitLossEntry`,
          method: "POST",
          body: {
              user_id, 
              project_id, 
              amount, 
              invested_amount, 
              profit_amount, 
              loss_amount
          },
      }),
      invalidatesTags: ["gettingProfitLossEntry"]
  }),
  

    getAllProfitLossEntries: builder.query({
      providesTags: ["gettingProfitLossEntry"],
      query: () => ({
        url: `getAllProfitLossEntries`,
        method: "GET",
      }),
    }),

// getAllProfitLossEntries
  }),
});

export const {
  useCalculateUserCapitalMutation,
  useAddTransctionIdMutation,
  useCreateProjectMutation,
  useGettingAllUsersQuery,
  useGettingAllReceiptsQuery,
  useGettingReceiptByIdQuery,
  useGettingAllProjectsQuery,
  useDeleteProjectMutation,
  useGettingAdminProjectByIdQuery,
  useUpdatedProjectByIdMutation,
  usePrevieweReceiptByIdQuery,
  useUpdateInvestmentProfileByIdMutation,
  useUpdateInvestmentByIdMutation,
  useAddInvestmentMutation,
  useUpdateInvestmentStatusByIdMutation,
  useUpdateReceiptIdMutation,
  useDeleteReceiptMutation,
  useUpdatinguserroleMutation,
  useUpdateUserIsActiveMutation,
  usePdfDownloadQuery,
  useGetUserByIdQuery,
  useCalculateProfitPercentageForAllUsersMutation,
  useGetWithdrawnInvestmentProfilesQuery,
  useGetWithDrawInvestmentProfileByIdQuery,
  useGetAllWithdrawsQuery,
  useWithdrawFindByIdQuery,
  useDeleteInvestmentProfileMutation,
  useWithdrawFindByIdAndDeleteMutation,
  useSubtractAmountFromProfitMutation,
  useCreateApprovedWithdrawalMutation,
  useGetAllApprovedWithdrawalsQuery,
  useGetApprovedWithdrawalByIdQuery,
  useSubtractAmountFromDonationMutation,
  useGetAllDonationsQuery,
  useCreateProfitLossEntryMutation,
  useGetAllProfitLossEntriesQuery,
  useRemoveUserMutation,
  useFetchProfitLossByDateQuery,
  useCalculateUserCapitalByIdMutation,
 
} = ApprovingReceipts;
