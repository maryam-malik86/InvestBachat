
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import { PropagateLoader } from 'react-spinners';
import { TbSpeakerphone } from "react-icons/tb";
import { useCheckInvestmentTimeMutation } from "../billing/billingApi";

const Notifications = () => {
    const [checkInvestmentTime, { isLoading }] = useCheckInvestmentTimeMutation();
    const [notifications, setNotifications] = useState([])
    const userData = useSelector((state) => state.user.userData);

    useEffect(() => {
        checkInvestmentTime({ user_id: userData._id }).then((res) => {
           
            if(res.data){
                setNotifications(res.data.projectsForNewInvestment)
            }
        })
    }, [userData])
    return (
        <div>
            <Navbar />
            <LeftSideBar />
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <PropagateLoader color="#3B82F6" />
                </div>
            ) : (
                <div className="xl:ml-[17rem] mt-[7.8rem] h-screen">
                    <div className="mt-4">
                        {notifications ? (
                            notifications.map((notification) => (
                                <div key={notification} className="relative mb-4 w-[95%] mx-auto min-h-[8rem] bg-gray-200 p-4 rounded-lg shadow-lg">
                                    <h1 className="font-bold text-2xl text-red-400">Alert!</h1>
                                    <div className='absolute right-5 bottom-5 flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-red-200 rounded-full'>
                                        <TbSpeakerphone className='text-red-400 text-3xl transform rotate-6' />
                                    </div>
                                    <h1 className=" mt-5 sm:w-[80%] w-[71%] text-lg">It's time for new investment in <span className='font-bold text-indigo-400'>{notification}</span> Project</h1>
                                </div>
                            ))
                        ):(
                            <div className="text-center font-bold text-gray-500">No notifications yet</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notifications;
