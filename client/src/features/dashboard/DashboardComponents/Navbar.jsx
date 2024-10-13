import React from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { IoIosMenu } from 'react-icons/io';
import { FiUser } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaListUl,FaRegUser } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { setToNull } from "../../auth/authSlice";
import { useDispatch } from "react-redux";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import axios from "axios";
const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function downloadPdf() {
      axios({
        url: `${process.env.REACT_APP_API_URL}admin/download-database-pdf`,
        method: 'GET',
        responseType: 'blob', // important
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'database.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('Error downloading PDF:', error);
      });
    }
   const userData = useSelector((state) => state.user.userData);
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div className="text-black fixed top-0 w-full z-[1]">
      <nav className="bg-indigo-400 text-xl flex justify-between px-[2rem] md:px-[4rem]  h-[5.35rem] font-bold items-center  drop-shadow-2">
        <div>
          Invest Bachat
        </div>
        <div className="bg-white w-[70%] h-[300vh] xl:hidden   xsm:w-[60%] md:w-[25rem] gap-4 flex xl:flex-row flex-col xl:static absolute top-0 left-0 min-h-dvh xl:w-[40rem] items-start xl:items-center px-8 xl:px-0 xl:py-0 xl:min-h-1 py-8 xl:justify-between text-black duration-300"
          style={{ left: isOpen ? '0' : '-100%' }} >
        <ul className="flex flex-col gap-4 overflow-auto h-[90vh] pb-16 w-full"
        >
          <li className="mb-1 flex xl:hidden w-full justify-end text-2xl">
            <IoClose onClick={() => setIsOpen(false)} />
          </li>
          <li className="mb-5  xl:hidden block">InvestBachat</li>
          {userData.role === "Member" &&(
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
          <Link to={"/member/dashboard"} className="cursor-pointer font-normal text-lg">
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

          <Link to={"/member/investment"} className="cursor-pointer font-normal">
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

          <Link to={"/member/statement"} className="cursor-pointer font-normal">
            Statement
          </Link>
        </li>

        <li className="flex items-start gap-2 font-normal">
<MdOutlineNotificationsActive className="text-2xl" />
          <Link to={"/member/Notifications"} className="cursor-pointer">
            Notifications
          </Link>
        </li>


        <li className="flex items-start gap-2 font-normal">
<BiMoneyWithdraw  className="text-2xl" />
          <Link to={"/member/withdraw"} className="cursor-pointer">
            With draw
          </Link>
        </li>

        <li className="flex items-start gap-2 font-normal">
        <FaDonate  className="text-2xl" />
          <Link to={"/member/donateAmount"} className="cursor-pointer">
            Donate
          </Link>
        </li>
  
  </>
)
}

{
  userData.role === "Admin" && (
    <>

<li className="flex items-center gap-2 font-normal">
  <FaRegUser />
    <Link
      to="/admin/allusers"
      className="cursor-pointer"
    >
      Users
    </Link>
  </li>
  <li className="flex items-center gap-2 font-normal">
  <FaRegUser />
  <Link to="/admin/usersDetail" className="cursor-pointer">
    Users Detail
  </Link>
</li>


  <li className="flex items-center gap-2">
    <FaClockRotateLeft className="text-xl" />
    <Link
      to="/admin/receiptlist"
      className="cursor-pointer font-normal"
    >
      Pending Payments
    </Link>
  </li>
  <li className="flex items-center gap-2">
  <TiTickOutline className="text-2xl" />
    <Link
      to="/admin/receiptlist/approvedreceipts"
      className="cursor-pointer font-normal"
    >
      Approved payments
    </Link>
  </li>
  <li className="flex items-center gap-2">
  <MdOutlineCreateNewFolder />
    <Link
      to="/admin/createproject"
      className="cursor-pointer font-normal"
    >
      Create Project
    </Link>
  </li>
  <li className="flex items-center gap-2 font-normal">
  <FaListUl />
    <Link
      to="/admin/allprojects"
      className="cursor-pointer"
    >
      Projects List
    </Link>
  </li>
  
  <li className="flex items-center gap-2 font-normal">
  <GiProfit />
    <Link
      to="/admin/setprofitloss"
      className="cursor-pointer"
    >
      Profit/Loss
    </Link>
  </li>

  <li className="flex items-center gap-2 font-normal">
  <FaClockRotateLeft className="text-xl" />
    <Link
      to="/admin/WithDrawListForApproval"
      className="cursor-pointer"
    >
      Pending Withdraws
    </Link>
  </li>

  <li className="flex items-center gap-2 font-normal">
  <GiProfit />
    <Link
      to="/admin/ApprovingMemberDonation"
      className="cursor-pointer"
    >
      Donations
    </Link>
  </li>

  <li className="flex items-center gap-2 font-normal">
  <TiTickOutline className="text-2xl" />
    <Link
      to="/admin/ApprovedWithdraws"
      className="cursor-pointer"
    >
      Approved Withdraws
    </Link>
  </li>

  <li className="flex items-center gap-2 font-normal">
  <GoDatabase />
    <button onClick={()=>{
      downloadPdf()
    }}>
      Export DB
    </button>
  </li>

    </>
  )
}

<li className="flex items-center gap-2 font-normal cursor-pointer">
        <MdOutlineTipsAndUpdates className="text-2xl" />


        <Link to={`/user/editDetails/${userData._id}`}>
            Edit Profile
          </Link>
        </li> 


<li className="flex items-center gap-2">
        <FaClockRotateLeft />


          <Link
            to="/auth/reset-password"
            className="cursor-pointer font-normal"
          >
            Reset Password
          </Link>
        </li> 


<li className="flex items-start gap-2 font-normal">
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
              dispatch(setToNull())
              navigate("/");
            }}
          >
            Log Out
          </button>
        </li>

        </ul>
        </div>

       <div className='flex items-center gap-2 md:gap-2'>

<div className="w-[3rem] h-[3rem] rounded-full bg-white flex items-center justify-center ">
        <FiUser className="3xl" />
</div>
<span className="xl:block hidden text-xl">

{userData.fullName}

</span>
        <IoIosMenu className="text-3xl xl:hidden block" onClick={() => setIsOpen(true)} />
        {/* <CiSearch className='text-2xl'/> */}
       </div>
      </nav>
    </div>
  );
};

export default Navbar;
