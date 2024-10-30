import React, { useState, useEffect } from 'react';
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import { useGetInvestmentProfilesWithProjectNamesQuery,useWithdrawFindByIdStatementQuery,useSetWithdrawFlagForInvestmentProfilesMutation,useGettingAllProfitsAndLossMutation } from '../billing/billingApi';

import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const WithDrawPage = () => {

    const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  const checkNetworkSpeed = async () => {
    try {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            const downlinkSpeed = connection.downlink;
            setIsSlowNetwork(downlinkSpeed < 0.25); // Assuming 0.25 Mbps as threshold for slow network (2G)
        }
    } catch (error) {
        console.error('Error while detecting network speed:', error);
    }
};

  useEffect(() => {
      checkNetworkSpeed();
  }, []);


    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);
    const [gettingAllProfitsAndLoss] = useGettingAllProfitsAndLossMutation();
    const {data:withdrawStatement,refetch:refetchingWithdraw} = useWithdrawFindByIdStatementQuery(userData._id)
    const { data:profitLoss, isLoading, refetch } = useGetInvestmentProfilesWithProjectNamesQuery(userData._id);
    const [setWithdrawFlagForInvestmentProfiles] = useSetWithdrawFlagForInvestmentProfilesMutation();
    const [formData, setFormData] = useState({
        project_id: "",
        profitAmount: "", // Added profitAmount field
        user_id: userData._id,
        accountNumber: "",
        accountName:""
    });
    const [netProfit,setNetProfit] = useState(0)
  
    const [withdrawalType, setWithdrawalType] = useState("profit"); // State to track withdrawal type
   
    useEffect(() => {
        refetch()
        refetchingWithdraw()
        gettingAllProfitsAndLoss({
            user_id: userData._id
        }).then((response)=>{
            setNetProfit(response.data.net_profit)
        })
    }, []);

    const formDataHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleWithdrawal = () => {
        // Add logic here for handling withdrawal based on withdrawalType
        if (withdrawalType === "profit") {
            // Withdrawal from profit logic
            if(formData.profitAmount === "" || formData.accountNumber === "" || formData.accountName === ""){
                toast.error("Please fill all the fields")
                // withdraw_type,withdraw_amount
            }else if(formData.profitAmount > netProfit){
                toast.error("You can't withdraw more than your net profit")
            }
            else{
            setWithdrawFlagForInvestmentProfiles({
                project_id: formData.project_id,
                user_id: userData._id,
                withdraw_amount:formData.profitAmount,
                withdraw_type:"profit",
                account_number:formData.accountNumber,
                accountName:formData.accountName
              }).then((response)=>{
                toast.success("Withdrawal request sent successfully")
                navigate("/member/dashboard")
              })
            }
        } else if (withdrawalType === "project") {
            if(formData.project_id === "" || formData.accountNumber === "" || formData.accountName === ""){
                toast.error("Please fill all the fields")
                // withdraw_type,withdraw_amount
            }else{
                setWithdrawFlagForInvestmentProfiles({
                  project_id: formData.project_id,
                  user_id: userData._id,
                  withdraw_type:"project",
                  account_number:formData.accountNumber,
                    accountName:formData.accountName
                }).then((response)=>{

                  toast.success("Withdrawal request sent successfully")
                  navigate("/member/dashboard")
                }).catch((error)=>{
                    toast.error("Something went wrong")
                })
            }
        }
    }



    return (
        <>
        <div>
            <Navbar />
            <LeftSideBar />
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <PropagateLoader color="#3B82F6" />
                </div>
            ) : (
                <div className='xl:pl-[12rem]'>
                <div className='mt-[7.6rem] xl:ml-[17rem] xl:w-[75%] w-[90%] mx-auto shadow-custom min-h-[70vh] p-5'>
                    <h2 className='text-bold text-2xl mx-auto w-full text-center py-10'>Withdraw your money</h2>
                    <div className="flex justify-center mt-4 mb-10 space-x-4">
                        
                        
                    <button
                            className={`flex w-[7rem] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500`}
                            onClick={() => setWithdrawalType("profit")}
                        >
                            from Profit
                        </button>
                        <button
                            className={`flex w-[7rem] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500`}
                            onClick={() => setWithdrawalType("project")}
                        >
                           from Project
                        </button>
                        </div>
                    <div className="flex sm:flex-row flex-col items-center sm:justify-between mb-4">
                        <label htmlFor="investment-amount" className="font-bold">
                            {withdrawalType === "profit" ? "Enter Amount" : "Select the Project"}
                        </label>
                        {withdrawalType === "profit" ? (
                            <input
                                onChange={formDataHandler}
                                id="profitAmount"
                                name="profitAmount"
                                type="number"
                                autoComplete="profitAmount"
                                required
                                value={formData.profitAmount}
                                className="sm:ml-2 p-1 my-3 w-[80%] bg-slate-100 rounded-md"
                            />
                        ) : (
                            <select
                                name="project_id"
                                onChange={formDataHandler}
                                value={formData.project_id}
                                id="investment-amount"
                                className="sm:ml-2 p-1 my-3 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
                            >
                                <option>Select</option>
                                {profitLoss.map((project) => (
                                    <option key={project.id} value={project.project_id}>{project.project_name}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="md:flex md:gap-4">
              <div className="w-[100%] md:mb-0 mb-3">
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Account Number
                </label>
                <div className="mt-2">
                  <input
                    onChange={formDataHandler}
                    id="accountNumber"
                    name="accountNumber"
                    type="Number"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="md:flex md:gap-4">
              <div className="w-[100%] md:mb-0 mb-3">
                <label
                  htmlFor="accountName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Account Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={formDataHandler}
                    id="accountName"
                    name="accountName"
                    type="text"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

                    <button
                        type="submit"
                        className={`flex mx-auto w-[7rem] mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        onClick={async ()=>{
                            await checkNetworkSpeed()
                            if (isSlowNetwork) {
                              // Show error message for slow network
                              toast.error("Your internet connection is too slow. Please try again later.");
                          } else {
                            handleWithdrawal()
                          }}
                        }
                    >
                        Withdraw
                    </button>
                </div>
                </div>

            )}
        </div>

        <div className='xl:pl-[18rem] w-[full] flex justify-center mt-10 mb-10'>
        <table className='w-[90%]'>
  <thead>
    <tr>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Name</th>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Project Name</th>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Amount Number</th>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Type</th>
    </tr>
  </thead>
  <tbody>
    
    {withdrawStatement && withdrawStatement.map((data, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.user_id.fullName}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.project_id ? data.project_id.project_name : "-"}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.account_number}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.withdraw_type}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>


        </>
    );
};

export default WithDrawPage;
