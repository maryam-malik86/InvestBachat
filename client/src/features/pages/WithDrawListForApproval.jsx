import React,{useEffect} from 'react'
import {useGetAllWithdrawsQuery} from '../Admin side/ApprovingReceiptsApi'
import Navbar from '../dashboard/DashboardComponents/Navbar'
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar'
import { PropagateLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
const WithDrawListForApproval = () => {
    const navigate = useNavigate()
    const {data,isLoading,refetch} = useGetAllWithdrawsQuery()
    useEffect(()=>{
      refetch()
    },[])
    return (
        <div className="z-[0] ">
          <Navbar />
          <LeftSideBar />
    
          <div className="">
            <div className="xl:pl-[16rem] mx-auto xl:w-[96%] w-[95%] mt-[7.8rem] min-h-[10rem]">
              {isLoading ? (
                <div className="flex justify-center items-center h-[full]">
                  <PropagateLoader color="#3B82F6" />
                </div>
              ) : (
                <div>
  {data?.length > 0 ? (
    data?.map((approveWithDraw) => (
      <div className="my-4" key={approveWithDraw._id}>
        <div className="flex justify-between items-center pl-5 bg-gray-200 w-[100%] rounded-lg">
          <div className="w-[60%] flex justify-between">
            <div>{approveWithDraw.user_id.fullName}</div>
            <div className="md:block hidden">{approveWithDraw.user_id.cnicNumber}</div>
          </div>

          <div className="flex gap-2">
            <button
              className="h-[3rem] w-[5rem] bg-indigo-500 text-white rounded-lg"
              onClick={() => {
                navigate(`/admin/getWithDrawInvestmentProfileById/${approveWithDraw._id}`);
              }}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="flex flex-col justify-center items-center h-screen text-2xl font-bold text-indigo-500 space-y-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-12 w-12 text-indigo-500"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      No pending left
    </div>
  )}
</div>

              )}
            </div>
          </div>
        </div>
      );
}

export default WithDrawListForApproval
