// import React from "react";
// import Navbar from "../dashboard/DashboardComponents/Navbar";
// import { useSelector } from "react-redux";
// import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
// import { useFetchInvestmentProfilesMutation } from "../dashboard/dashboardApi";
// import { useEffect, useState } from "react";
// import {useGettingAllProfitsAndLossMutation} from "../billing/billingApi";
// import { toast } from "react-toastify";
// const Main = () => {
//   const [gettingAllProfitsAndLoss] = useGettingAllProfitsAndLossMutation();
//   const [loading, setLoading] = useState(true);
//   const [profitAndLoss,setProfitAndLoss] =useState({
//     profitEarned:0,
//     loss:0,
//     netProfit:0,
//     capital:0
//   })

//   const [amount, setAmount] = useState({
//     investedAmount: 0,
//   });
//   const userData = useSelector((state) => state.user.userData);
//   const [fetchInvestmentProfiles] = useFetchInvestmentProfilesMutation();


//   useEffect(() => {
//     // Fetch investment profiles when component mounts
//     fetchInvestmentProfiles({ user_id: userData._id })
//       .then((response) => {
//         const totals = response.data.data.reduce(
//           (totals, profile) => {
//             if (profile.is_active) {
//               totals.investedAmount += profile.invested_amount;
//             }
//             return totals;
//           },
//           { investedAmount: 0}
//         );
//         setAmount({ ...totals });
//       })
//       .catch((error) => {
//         setLoading(false);
//       });

//       gettingAllProfitsAndLoss({ user_id: userData._id })
//           .then((response) => {
//             setProfitAndLoss({
//               profitEarned: response.data.totalProfit,
//               loss: response.data.totalLoss,
//               netProfit: response.data.totalProfit - response.data.totalLoss,
//               capital:response.data.totalProfit - response.data.totalLoss
//             });
//             setLoading(false);
//           })
//           .catch((error) => {
//             toast.error("Error fetching profits and loss");
//             setLoading(false);
//           });

//   }, []);



//   return (
//     <div className="z-[0]">
//       <Navbar />
//       <LeftSideBar />

//       <div className=" flex flex-col items-center  xl:ml-[17rem] text-[2rem] min-h-[100vh] mb-[7rem] z-[-99] font-bold">
//         <div className=" md:block hidden w-[90%] mb-3 h-[12rem] rounded-lg mt-[7.8rem] shadow-custom  p-3">
//           Hello {userData.fullName} !
//         </div>
//         <div className="flex flex-wrap gap-7 lg:flex-nowrap md:mt-5 xl:mt-2 mt-[7.8rem] w-[90%] text-2xl h-[16rem] items-center  text-slate-700">
//           <div className="flex w-full gap-7 flex-wrap md:flex-nowrap">
//             <div className="relative bg-blue-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
//               Active investment
//               <div>Rs {loading ? "Loading..." : amount.investedAmount}</div>
//               <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
//                 <svg
//                   className="fill-primary dark:fill-blue-500"
//                   width="22"
//                   height="16"
//                   viewBox="0 0 22 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
//                     fill="currentColor"
//                   ></path>
//                   <path
//                     d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
//                     fill="currentColor"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//             <div className="relative bg-green-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
//               Profit Earned
//               <div>Rs {loading ? "Loading..." : profitAndLoss.profitEarned}</div>
//               <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
//                 <svg
//                   aria-hidden="true"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   className="h-6 w-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="flex w-full flex-wrap lg:flex-nowrap  gap-7">
//             <div className="relative bg-red-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
//               Lost Amount
//               <div>Rs {loading ? "Loading..." : profitAndLoss.loss}</div>
//               <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
//                 <svg
//                   aria-hidden="true"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   className="h-6 w-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <div className="relative bg-green-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
//               Net Profit
//               <div>Rs {loading ? "Loading..." : profitAndLoss.netProfit}</div>
//               <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
//                 <svg
//                   aria-hidden="true"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   className="h-6 w-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <div className="relative bg-green-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
//               Capital Amount
//               <div>Rs {loading ? "Loading..." : amount.investedAmount+ profitAndLoss.capital}</div>
//               <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
//                 <svg
//                   aria-hidden="true"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   className="h-6 w-6" 
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;
import React, { useEffect, useState } from "react";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import { useSelector } from "react-redux";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import { useFetchInvestmentProfilesMutation } from "../dashboard/dashboardApi";
import { useGettingAllProfitsAndLossMutation } from "../billing/billingApi";
import { toast } from "react-toastify";

const Main = () => {
  const [gettingAllProfitsAndLoss] = useGettingAllProfitsAndLossMutation();
  const [loading, setLoading] = useState(true);
  const [profitAndLoss, setProfitAndLoss] = useState({
    profitEarned: 0,
    loss: 0,
    netProfit: 0,
    capital: 0,
  });

  const [amount, setAmount] = useState({
    investedAmount: 0,
  });
  
  const userData = useSelector((state) => state.user.userData);
  const [fetchInvestmentProfiles] = useFetchInvestmentProfilesMutation();

  useEffect(() => {
    // Fetch investment profiles when component mounts
    fetchInvestmentProfiles({ user_id: userData._id })
      .then((response) => {
        const totals = response.data.data.reduce(
          (totals, profile) => {
            if (profile.is_active) {
              totals.investedAmount += profile.invested_amount;
            }
            return totals;
          },
          { investedAmount: 0 }
        );
        setAmount({ ...totals });
      })
      .catch((error) => {
        setLoading(false);
      });

    gettingAllProfitsAndLoss({ user_id: userData._id })
      .then((response) => {
        const totalProfit = response.data.totalProfit || 0;
        const totalLoss = response.data.totalLoss || 0;
        setProfitAndLoss({
          profitEarned: totalProfit,
          loss: totalLoss,
          netProfit: totalProfit - totalLoss, // Net profit calculated here
          capital: totalProfit - totalLoss, // Capital calculated here
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching profits and loss");
        setLoading(false);
      });
  }, [userData._id, fetchInvestmentProfiles, gettingAllProfitsAndLoss]);

  // Format numbers with one decimal place
  const formatAmount = (amount) => {
    return amount.toFixed(1); // Formatting with one decimal place
  };

  return (
    <div className="z-[0]">
      <Navbar />
      <LeftSideBar />

      <div className=" flex flex-col items-center xl:ml-[17rem] text-[2rem] min-h-[100vh] mb-[7rem] z-[-99] font-bold">
        <div className="md:block hidden w-[90%] mb-3 h-[12rem] rounded-lg mt-[7.8rem] shadow-custom p-3">
          Hello {userData.fullName} !
        </div>
        <div className="flex flex-wrap gap-7 lg:flex-nowrap md:mt-5 xl:mt-2 mt-[7.8rem] w-[90%] text-2xl h-[16rem] items-center text-slate-700">
          <div className="flex w-full gap-7 flex-wrap md:flex-nowrap">
            <div className="relative bg-blue-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
              Active investment
              <div>Rs {loading ? "Loading..." : formatAmount(amount.investedAmount)}</div>
              <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                <svg
                  className="fill-primary dark:fill-blue-500"
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="relative bg-green-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
              Profit Earned
              <div>Rs {loading ? "Loading..." : formatAmount(profitAndLoss.profitEarned)}</div>
              <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-wrap lg:flex-nowrap gap-7">
            <div className="relative bg-red-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
              Lost Amount
              <div>Rs {loading ? "Loading..." : formatAmount(profitAndLoss.loss)}</div>
              <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
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
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
            </div>
            <div className="relative bg-green-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
              Net Profit
              <div>Rs {loading ? "Loading..." : formatAmount(profitAndLoss.netProfit)}</div>
              <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div className="relative bg-green-300 md:w-[48%] w-full h-[12rem] rounded-lg shadow-custom p-3">
              Capital Amount
              <div>Rs {loading ? "Loading..." : formatAmount(amount.investedAmount + profitAndLoss.capital)}</div>
              <div className=" absolute right-0 bottom-5 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

