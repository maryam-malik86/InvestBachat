import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/rtk";
import { AdminProjectApi } from "../features/investments/AdminProjectApi";
import { MemberProjectsApi } from "../features/investments/MemberProjectApi";
import { AdminBankDetails } from "../features/billing/billingApi";
import {dashboardApi} from "../features/dashboard/dashboardApi";
import { ApprovingReceipts } from "../features/Admin side/ApprovingReceiptsApi";
import authSlice from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    user: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [MemberProjectsApi.reducerPath]: MemberProjectsApi.reducer,
    [AdminProjectApi.reducerPath]: AdminProjectApi.reducer,
    [AdminBankDetails.reducerPath]: AdminBankDetails.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [ApprovingReceipts.reducerPath]: ApprovingReceipts.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      MemberProjectsApi.middleware,
      AdminProjectApi.middleware,
      AdminBankDetails.middleware,
      dashboardApi.middleware,
      ApprovingReceipts.middleware
    ),
});
