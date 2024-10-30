import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaListUl, FaRegUser } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import axios from "axios";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { setToNull } from "../../auth/authSlice";
import { useDispatch } from "react-redux";
import { GiProfit } from "react-icons/gi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
const LeftSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const userData = useSelector((state) => state.user.userData);
  function downloadPdf() {
    axios({
      url: `${process.env.REACT_APP_API_URL}admin/download-database-pdf`,
      method: "GET",
      responseType: "blob", // important
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "database.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  }

  return (
    <div className="text-black xl:block hidden w-[100%] sm:w-[10rem] md:w-[11rem] lg:w-[15rem] sm:h-[100vh] fixed   bg-white pt-[2rem] top-[5.5rem] shadow-custom ">
      <ul className="pl-5 flex sm:flex-col  gap-[.5rem] h-[100vh] overflow-auto">
        {userData.role === "Member" && (
          <>
            <li className="flex items-start gap-2">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <Link to={"/member/dashboard"} className="cursor-pointer text-lg">
                Dashboard
              </Link>
            </li>

            <li className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15V9m-4 4h8"
                />
              </svg>

              <Link to={"/member/investment"} className="cursor-pointer">
                Projects
              </Link>
            </li>

            <li className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M3 16h18M3 12h18M3 6h18"
                />
              </svg>
              <Link to={"/member/statement"} className="cursor-pointer">
                Statement
              </Link>
            </li>

            <li className="flex items-start gap-2">
              <MdOutlineNotificationsActive className="text-2xl" />
              <Link to={"/member/Notifications"} className="cursor-pointer">
                Notifications
              </Link>
            </li>

            <li className="flex items-start gap-2">
              <BiMoneyWithdraw className="text-2xl" />
              <Link to={"/member/withdraw"} className="cursor-pointer">
                With draw
              </Link>
            </li>
            <li className="flex items-start gap-2">
              <FaDonate className="text-2xl" />
              <Link to={"/member/donateAmount"} className="cursor-pointer">
                Donate amount
              </Link>
            </li>
            {/* /admin/ApprovingMemberDonation */}
          </>
        )}

        {userData.role === "Admin" && (
          <>
            <li className="flex items-center gap-2">
              <FaRegUser />
              <Link to="/admin/allusers" className="cursor-pointer">
                Users
              </Link>
            </li>

            <li className="flex items-center gap-2">
              <FaClockRotateLeft />
              <Link to="/admin/receiptlist" className="cursor-pointer">
                Pending Payments
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <TiTickOutline className="text-2xl" />
              <Link
                to="/admin/receiptlist/approvedreceipts"
                className="cursor-pointer"
              >
                Approved payments
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineCreateNewFolder />
              <Link to="/admin/createproject" className="cursor-pointer">
                Create Project
              </Link>
            </li>

            <li className="flex items-center gap-2">
              <FaListUl />
              <Link to="/admin/allprojects" className="cursor-pointer">
                Projects List
              </Link>
            </li>

            <li className="flex items-center gap-2">
              <GiProfit />
              <Link to="/admin/setprofitloss" className="cursor-pointer">
                Profit/Loss
              </Link>
            </li>

            <li className="flex items-center gap-2">
              <FaClockRotateLeft />
              <Link
                to="/admin/WithDrawListForApproval"
                className="cursor-pointer"
              >
                Pending Withdraws
              </Link>
            </li>

            <li className="flex items-center gap-2">
              <TiTickOutline className="text-2xl" />
              <Link to="/admin/ApprovedWithdraws" className="cursor-pointer">
                Approved Withdraws
              </Link>
            </li>

            <li className="flex items-center gap-2">
              <GiProfit />
              <Link
                to="/admin/ApprovingMemberDonation"
                className="cursor-pointer"
              >
                Donations
              </Link>
            </li>

            {/* /admin/ApprovingMemberDonation */}

            <li className="flex items-center gap-2">
              <GoDatabase />
              <button
                onClick={() => {
                  downloadPdf();
                }}
              >
                Export DB
              </button>
            </li>
          </>
        )}

        <li className="flex items-center gap-2 font-normal cursor-pointer">
          <MdOutlineTipsAndUpdates className="text-2xl" />

          <Link to={`/user/editDetails/${userData._id}`}>Edit Profile</Link>
        </li>

        <li className="flex items-center gap-2">
          <FaClockRotateLeft />

          <Link to="/auth/reset-password" className="cursor-pointer">
            Reset Password
          </Link>
        </li>

        <li className="flex items-start gap-2">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(setToNull());
              navigate("/");
            }}
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LeftSideBar;
