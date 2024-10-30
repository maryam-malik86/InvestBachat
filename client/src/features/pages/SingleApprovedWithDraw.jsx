import React from 'react'
import {useParams} from 'react-router-dom'
import {useGetApprovedWithdrawalByIdQuery} from '../Admin side/ApprovingReceiptsApi'
import Navbar from '../dashboard/DashboardComponents/Navbar'
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar'
import { PropagateLoader } from 'react-spinners'
const SingleApprovedWithDraw = () => {
    const {id} = useParams()
  
    const {data,isLoading} = useGetApprovedWithdrawalByIdQuery(id)

  return (
    <div>
      <Navbar/>
      <LeftSideBar/>
      {
        isLoading ? (
          <div className="flex justify-center items-center h-[full]">
                  <PropagateLoader color="#3B82F6" />
                </div>
        ) : (
          <div className='xl:pl-[12rem]'>
          <div className="xl:ml-[17rem] mt-[7.8rem]" >
              <img
                className="xl:w-[90%] w-full"
                src={data.receipts_url}
                alt=""
              />
              <div className="pl-2 xl:mx-0  my-2 fixed bottom-0 bg-white flex items-center justify-between h-[3rem] focus:outline-none  xl:w-[78%] w-[100%]  rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-">
                <input
                  id="inputField"
                  name="inputField"
                  type="text"
                  autoComplete="inputField"
                  
                  required
                  placeholder="Enter the receipt id here..."
                  className="h-7 w-[90%]"
                  value={data.account_number}
                  disabled
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default SingleApprovedWithDraw
