import React, { useState, useEffect } from 'react';
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import { useGetInvestmentProfilesWithProjectNamesQuery,useSetWithdrawFlagForInvestmentProfilesMutation,useGettingAllProfitsAndLossMutation,useCreateDonationMutation } from '../billing/billingApi';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const MemberDonation = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);
    const [gettingAllProfitsAndLoss] = useGettingAllProfitsAndLossMutation();
    const { data, isLoading, refetch } = useGetInvestmentProfilesWithProjectNamesQuery(userData._id);
    const [createDonation] = useCreateDonationMutation()
    const [setWithdrawFlagForInvestmentProfiles] = useSetWithdrawFlagForInvestmentProfilesMutation();
    const [formData, setFormData] = useState({
        donationAmount: "", // Added donationAmount field
        user_id: userData._id
    });
    const [netProfit,setNetProfit] = useState(0)

    useEffect(() => {
        refetch()
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

    const handleDonation = () => {
        // Add logic here for handling withdrawal based on withdrawalType
       
            // Withdrawal from profit logic
            if(formData.donationAmount === ""){
                toast.error("Please fill all the fields")
                // withdraw_type,withdraw_amount
            }else if(formData.donationAmount > netProfit){
                toast.error("You can't donate more than your net profit")
            }
            else{
                createDonation({
                user_id: userData._id,
                donation_amount:formData.donationAmount
              }).then((response)=>{
                if(response.data){
                    toast.success("Donation request sent successfull    ")
                    navigate("/member/dashboard")
                }else{
                    toast.error(response.error.data.message)
                }
              })
            }
    }

    return (
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
                    <h2 className='text-bold text-2xl mx-auto w-full text-center py-10'>Donate your money</h2>
                    <div className="flex justify-center mt-4 mb-10 space-x-4">
                        
                        

                        </div>
                    <div className="flex sm:flex-row flex-col items-center sm:justify-between mb-4">
                        <label htmlFor="investment-amount" className="font-bold">
                           Enter Amount :
                        </label>
                        
                            <input
                                onChange={formDataHandler}
                                id="donationAmount"
                                name="donationAmount"
                                type="number"
                                autoComplete="donationAmount"
                                required
                                value={formData.donationAmount}
                                className="sm:ml-2 p-1 my-3 w-[80%] bg-slate-100 rounded-md"
                            />
                        
                    </div>

                    <button
                        type="submit"
                        className={`flex mx-auto w-[7rem] mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        onClick={handleDonation}
                    >
                        Donate
                    </button>
                </div>
                </div>

            )}
        </div>
    );
};

export default MemberDonation;
