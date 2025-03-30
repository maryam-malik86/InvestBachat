import React, { useState, useEffect } from "react";
import { useGettingAllUsersQuery } from "../Admin side/ApprovingReceiptsApi";
import { useFetchInvestmentProfilesMutation } from "../dashboard/dashboardApi";
import { useGettingAllProfitsAndLossMutation } from "../billing/billingApi";
import { PropagateLoader } from "react-spinners";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const UsersDetail = () => {
  const { data, isLoading } = useGettingAllUsersQuery();
  const [users, setUsers] = useState([]);
  const [profitAndLossData, setProfitAndLossData] = useState([]);
  const [loadingProfits, setLoadingProfits] = useState(true);

  const [fetchInvestmentProfiles] = useFetchInvestmentProfilesMutation();
  const [gettingAllProfitsAndLoss] = useGettingAllProfitsAndLossMutation();

  useEffect(() => {
    if (data) {
      setUsers(data.data);
      fetchUsersInvestmentAndProfit(data.data); // Fetch both investment and profit/loss
    }
  }, [data]);
  function downloadExcel(data) {
    if (!data || data.length === 0) {
      console.error("No data available for export.");
      return;
    }
  
    // Define column headers and map data
    const formattedData = data.map((user, index) => ({
      No: index + 1,
      // ID: user.id || "-",
      Name: user.fullName || "-",
      Email: user.email || "-",
      MobileNumber: user.mobileNumber|| "-",
      Investment: user.investment || 0,
      Profit: user.profit || 0,
      Loss: user.loss || 0,
      Capital: user.capital || 0,
    }));
  
    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(formattedData);
    ws["!cols"] = [
      { wch: 5 },  // No
      { wch: 30 }, // ID
      { wch: 30 }, // Name
      { wch: 15 }, // Email
      { wch: 15 }, // Investment
      { wch: 15 }, // Profit
      { wch: 15 }, // Loss
      { wch: 15 }, // Capital
    ];
    
    // Create a workbook and append the sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users Data");
  
    // Write to a binary string
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  
    // Convert to Blob and trigger download
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(fileData, "UsersData.xlsx");
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const fetchUsersInvestmentAndProfit = async (userArray) => {
    setLoadingProfits(true);
    const promises = userArray.map(async (user) => {
      try {
        // Fetch user's investment data
        const investmentResponse = await fetchInvestmentProfiles({
          user_id: user._id,
        }).unwrap();
        const investedAmount = investmentResponse.data.reduce(
          (total, profile) =>
            profile.is_active ? total + profile.invested_amount : total,
          0
        );

        // Fetch profit and loss data for the user
        const profitLossResponse = await gettingAllProfitsAndLoss({
          user_id: user._id,
        }).unwrap();

        const profit = profitLossResponse.totalProfit || 0;
        const loss = profitLossResponse.totalLoss || 0;
        const capital = investedAmount + profit - loss;

        return {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          mobileNumber:user.mobileNumber,
          investment: investedAmount || 0,
          profit,
          loss,
          capital,
        };
      } catch (error) {
        return {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          mobileNumber:user.mobileNumber,
          investment: 0,
          profit: 0,
          loss: 0,
          capital: 0,
        };
      }
    });

    const results = await Promise.all(promises);
    setProfitAndLossData(results);
    setLoadingProfits(false);
  };

  // Calculate total pages
  const totalPages = Math.ceil(profitAndLossData.length / itemsPerPage);
  // Get users for current page
  const paginatedUsers = profitAndLossData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Navbar />
      <LeftSideBar />
      <div className="xl:ml-[15rem] mt-[5.8rem] p-5">
        <h1 className="text-2xl mb-4">Users Details</h1>

        {isLoading || loadingProfits ? (
          <div className="flex justify-center items-center h-full">
            <PropagateLoader color="#3B82F6" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <button
              onClick={() => downloadExcel(profitAndLossData)}
              style={{
                backgroundColor: "rgb(129 140 235)", 
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                float: "right", 
                marginBottom:'10px',
              }}
            >
              Export DB Excel Sheet
            </button>

            <table className="min-w-full bg-white shadow-md rounded-lg border">
              <thead>
                <tr className="bg-blue-100 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No.</th>
                  {/* <th className="py-3 px-6 text-left">ID</th> */}
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Phone Number</th>
                  <th className="py-3 px-6 text-left">Investment</th>
                  <th className="py-3 px-6 text-left">Profit</th>
                  <th className="py-3 px-6 text-left">Loss</th>
                  <th className="py-3 px-6 text-left">Capital</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {paginatedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6 text-left font-medium">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    {/* <td className="py-3 px-6 text-left">{user.id || "-"}</td> */}
                    <td className="py-3 px-6 text-left">
                      {user.fullName || "-"}
                    </td>
                    <td className="py-3 px-6 text-left">{user.email || "-"}</td>
                    <td className="py-3 px-6 text-left">{user.mobileNumber|| "-"}</td>
                    <td className="py-3 px-6 text-left">
                      {user.investment !== undefined ? user.investment : "-"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {user.profit || "-"}
                    </td>
                    <td className="py-3 px-6 text-left">{user.loss || "-"}</td>
                    <td className="py-3 px-6 text-left">
                      {user.capital || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 text-sm text-white bg-blue-500 rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 mx-1 text-sm rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 text-sm text-white bg-blue-500 rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersDetail;











































// src/features/pages/UsersDetail.jsx
// import React, { useState, useEffect } from 'react';
// import { useGettingAllUsersQuery } from '../Admin side/ApprovingReceiptsApi';
// import { useFetchInvestmentProfilesMutation } from '../dashboard/dashboardApi';
// import { useGettingAllProfitsAndLossMutation } from "../billing/billingApi";
// import { PropagateLoader } from 'react-spinners';
// import Navbar from '../dashboard/DashboardComponents/Navbar';
// import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
// import { toast } from 'react-toastify';

// const UsersDetail = () => {
//   const { data, isLoading } = useGettingAllUsersQuery();
//   const [users, setUsers] = useState([]);
//   const [profitAndLossData, setProfitAndLossData] = useState([]);
//   const [loadingProfits, setLoadingProfits] = useState(true);

//   const [fetchInvestmentProfiles] = useFetchInvestmentProfilesMutation();
//   const [gettingAllProfitsAndLoss] = useGettingAllProfitsAndLossMutation();

//   useEffect(() => {
//     if (data) {
//       setUsers(data.data);
//       fetchUsersInvestmentAndProfit(data.data); // Fetch both investment and profit/loss
//     }
//   }, [data]);

//   const fetchUsersInvestmentAndProfit = async (userArray) => {
//     setLoadingProfits(true);
//     const promises = userArray.map(async (user) => {
//       try {
//         // Fetch user's investment data
//         const investmentResponse = await fetchInvestmentProfiles({ user_id: user._id }).unwrap();
//         const investedAmount = investmentResponse.data.reduce(
//           (total, profile) => profile.is_active ? total + profile.invested_amount : total,
//           0
//         );

//         // Fetch profit and loss data for the user
//         const profitLossResponse = await gettingAllProfitsAndLoss({ user_id: user._id }).unwrap();

//        const profit = profitLossResponse.totalProfit || 0;
//         const loss = profitLossResponse.totalLoss || 0;
//         const capital = investedAmount + profit - loss;

//         return {
//           id: user._id,
//           fullName: user.fullName,
//           investment: investedAmount || 0,
//           profit,
//           loss,
//           capital, 
//         };
//       } catch (error) {
        
//         return {
//           id: user._id,
//           fullName: user.fullName,
//           investment: 0,
//           profit: 0,
//           loss: 0,
//           capital: 0,
//         };
//       }
//     });

//     const results = await Promise.all(promises);
//     setProfitAndLossData(results);
//     setLoadingProfits(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       <LeftSideBar />
//       <div className="xl:ml-[15rem] mt-[5.8rem] p-5">
//         <h1 className="text-2xl mb-4">Users Details</h1>

//         {isLoading || loadingProfits ? (
//           <div className="flex justify-center items-center h-full">
//             <PropagateLoader color="#3B82F6" />
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-lg border">
//               <thead>
//                 <tr className="bg-blue-100 uppercase text-sm leading-normal">
//                   <th className="py-3 px-6 text-left">ID</th>
//                   <th className="py-3 px-6 text-left">Name</th>
//                   <th className="py-3 px-6 text-left">Investment</th>
//                   <th className="py-3 px-6 text-left">Profit</th>
//                   <th className="py-3 px-6 text-left">Loss</th>
//                   <th className="py-3 px-6 text-left">Capital</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-600 text-sm font-light">
//                 {profitAndLossData.map((user) => (
//                   <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
//                     <td className="py-3 px-6 text-left font-medium">{user.id || '-'}</td>
//                     <td className="py-3 px-6 text-left">{user.fullName || '-'}</td>
//                     <td className="py-3 px-6 text-left">{user.investment !== undefined ? user.investment : '-'}</td>
//                     <td className="py-3 px-6 text-left">{user.profit || '-'}</td>
//                     <td className="py-3 px-6 text-left">{user.loss || '-'}</td>
//                     <td className="py-3 px-6 text-left">{user.capital || '-'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersDetail;
