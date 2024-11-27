import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./features/pages/Home";
import SignIn from "./features/auth/components/Login";
import SignUp from "./features/auth/components/Signup";
import UsersDetail from "./features/pages/UsersDetail"; // This will work if you have a default export

import ForgotPassword from "./features/auth/components/ForgotPassword";
import ResetPassword from "./features/auth/components/ResetPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./features/pages/Main";
import InvestmentPage from "./features/pages/InvestmentPage";
import SingleProjectPage from "./features/pages/SingleProjectPage";
import { useDispatch, useSelector } from "react-redux";
import WithDrawPage from "./features/pages/WithDrawPage";
import { jwtDecode } from "jwt-decode";
import {
  signUpSuccess,
  setLoading,
} from "./features/auth/authSlice";
import { checkUserExistence } from "./features/auth/authSlice";
import { useFetchUserQuery } from "./features/auth/rtk";
import PropagateLoader from "react-spinners/PropagateLoader";
import StatementPage from "./features/pages/StatementPage";
import UsersList from "./features/pages/ReceiptsList";
import CheckReceipt from "./features/pages/CheckReceipt";
import ReceiptsList from "./features/pages/ReceiptsList";
import AdminRoute from "./features/Admin side/AdminRoutes";
import MemberRoute from "./features/Member Protected Route/MemberProtectedRoute"
import LandingPage from "./landing page/LandingPage";
import CreateProject from "./features/pages/CreateProject";
import AllProjects from "./features/pages/AllProjects";
import UpdateProject from "./features/pages/UpdateProject";
import PreviewReceipt from "./features/pages/PreviewReceipt";
import AllApprovedReceipts from "./features/pages/AllApprovedReceipts";
import InvestmentDetail from "./features/pages/InvestmentDetails"
import ApprovedReceiptPreview from "./features/pages/ApprovedReceiptPreview";
import AllUsers from "./features/pages/AllUsers";
import SingleUserDetail from "./features/pages/SingleUserDetail";
import EditUserDetails from "./features/pages/EditUserDetails";
import ProfitLoss from "./features/pages/ProfitLoss";
import ProfitLossDetail from "./features/pages/ProfitLossDetail";
import Notifications from "./features/pages/Notifications";
import CreateNotifications from "./features/pages/CreateNotifications"
import WithDrawListForApproval from "./features/pages/WithDrawListForApproval";
import WithDrawSingleApproval from "./features/pages/WithDrawSingleApproval";
import ApprovedWithdraws from "./features/pages/ApprovedWithdraws";
import SingleApprovedWithDraw from "./features/pages/SingleApprovedWithDraw";
import MemberDonation from "./features/pages/MemberDonation";
import ApprovingMemberDonation from "./features/pages/ApprovingMemberDonation";
import Products from "./landing page/Products";
import Portfolio from "./landing page/Portfolio";
import OurStory from "./landing page/OurStory";
import Licence from "./landing page/Licence";
const router = createBrowserRouter([

  {
    path: "/",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "/index",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "/products",
    element: <Products></Products>,
  },
  {
    path: "/portfolio",
    element: <Portfolio></Portfolio>,
  },
  {
    path: "/ourstory",
    element: <OurStory></OurStory>,
  },
  {
    path: "/licence",
    element: <Licence></Licence>,
  },
  {
    path: "/auth/login",
    element: <SignIn></SignIn>,
  },
  {
    path: "/auth/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },

  {
    path: "/auth/reset-password",
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: "/member/dashboard",
    element: <MemberRoute><Main/></MemberRoute>,
  },
  {
    path: "/member/investment",
    element: <MemberRoute><InvestmentPage/></MemberRoute>
  },
  {
    path: "/member/withdraw",
    element: <MemberRoute><WithDrawPage/></MemberRoute>
  },
  {
    path: "/member/statement",
    element:  <MemberRoute><StatementPage/></MemberRoute>
  },
  {
    path: "/member/investment/singleproject/:id",
    element: <MemberRoute><SingleProjectPage/></MemberRoute>
  },
  {
    path: "/user/editDetails/:id",
    element: <EditUserDetails/>
  },
  {
    path: "/member/Notifications",
    element: <MemberRoute><Notifications/></MemberRoute>
  },
  {
    path: "/member/donateAmount",
    element: <MemberRoute><MemberDonation/></MemberRoute>
  },
  {
    path: "/admin/CreateNotifications",
    element: <AdminRoute><CreateNotifications/></AdminRoute> ,
  },
  {
    path: "/admin/receiptlist",
    element: <AdminRoute><ReceiptsList/></AdminRoute> ,
  },
  {
    path: "/admin/chechreceipt/:id",
    element: <AdminRoute><CheckReceipt/></AdminRoute>,
  },
  {
    path: "/admin/createproject",
    element: <AdminRoute><CreateProject/></AdminRoute>,
  },
  {
    path: "/admin/allprojects",
    element: <AdminRoute><AllProjects/></AdminRoute>,
  },
  {
    path: "/admin/allprojects/updateproject/:id",
    element: <AdminRoute><UpdateProject/></AdminRoute>,
  },
  {
    path: "/admin/receiptlist/previewreceipt/:id",
    element: <AdminRoute><PreviewReceipt/></AdminRoute>,
  },
  {
    path: "/admin/receiptlist/approvedreceipts",
    element: <AdminRoute><AllApprovedReceipts/></AdminRoute>,
  },
  {
    path: "/admin/receiptlist/approvedreceipts/previewapprovedreceitlist/:id",
    element: <AdminRoute><ApprovedReceiptPreview/></AdminRoute>,
  },
  {
    path: "/admin/allusers",
    element: <AdminRoute><AllUsers/></AdminRoute>,
  },
  {
    path: "/admin/allusers/:id",
    element: <AdminRoute><SingleUserDetail/></AdminRoute>,
  },
  {
    path: "/admin/InvestmentDetail",
    element: <AdminRoute><InvestmentDetail/></AdminRoute>,
  },
  {
    path: "/admin/usersDetail", // Path for all users
    element: (
      <AdminRoute>
        <UsersDetail />
      </AdminRoute>
    ),
  },

  {
    path: "/admin/setprofitloss",
    element: <AdminRoute><ProfitLoss/></AdminRoute>,

  },
  {
    path: "/admin/setprofitloss/details/:date",
    element: <AdminRoute><ProfitLossDetail/></AdminRoute>

  },

  {
    path: "/admin/WithDrawListForApproval",
    element: <AdminRoute><WithDrawListForApproval/></AdminRoute>,
  },
  {
    path: "/admin/getWithDrawInvestmentProfileById/:id",
    element: <AdminRoute><WithDrawSingleApproval/></AdminRoute>,
  },
  {
    path: "/admin/ApprovedWithdraws",
    element: <AdminRoute><ApprovedWithdraws/></AdminRoute>,
  },

  {
    path: "/admin/ApprovingMemberDonation",
    element: <AdminRoute><ApprovingMemberDonation/></AdminRoute>,
  },
  {
    path: "/admin/getApprovedWithdrawalById/:id",
    element: <AdminRoute><SingleApprovedWithDraw/></AdminRoute>,
  },
  {
    path: "/admin/allusers/:id",
    element: <AdminRoute><SingleUserDetail /></AdminRoute>,
  }

// /admin/SingleApprovedWithDraw/
]);

function App() {

  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decoded = jwtDecode(token);
  //     checkUserExistence(decoded._id).then((res)=>{
  //     if(res === true){
  //       dispatch(signUpSuccess(decoded));
  //     }
  //     }).catch((err)=>{
  //       window.location.href = "/auth/login";
  //     })
  //   } else if (!window.location.pathname.includes("/")) {
  //     window.location.href = "/";
  //   } else {
  //     // Add code here to handle token expiration and log in again
  //   }
  //   dispatch(setLoading(false));
  // }, []);





  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token);
          const userExists = await checkUserExistence(decoded._id);
          if (userExists) {
            dispatch(signUpSuccess(decoded));
          } else {
            localStorage.removeItem('token');
            window.location.href = "/";
          }
        }
      } catch (error) {
        console.error('Error checking user existence:', error);
        localStorage.removeItem('token');
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <PropagateLoader color="#3B82F6" loading={loading} size={15} />
    </div>
  ) : (
    <div className="font-Inter">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
