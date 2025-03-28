
import { useState, useEffect } from "react";
import {
  usePrevieweReceiptByIdQuery,
} from "../Admin side/ApprovingReceiptsApi";
import { useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
const ApprovedReceiptPreview = () => {
  const { id } = useParams();
  const { data, isLoading ,refetch } = usePrevieweReceiptByIdQuery(id);


  useEffect(()=>{
    refetch()
  },[])

  const [img, setImg] = useState(false);
  const submitImg = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "vnkvr19i");
    data.append("cloud_name", "deiuxbyphp");
    setImg(true);
    
  };



  return (
  <>
  <Navbar />
      <LeftSideBar />
  {isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <PropagateLoader color="#3B82F6" />
    </div>
  ) : (
    <div>
      <div className="xl:ml-[17rem] mt-[7.8rem] xl:w-[75%]">
        <div className="text-black w-[100%] text-sm bg-white sm:mb-10 mx-auto p-8  shadow-custom">
          <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
            <label htmlFor="investment-amount" className="font-bold">
              How much do you want to invest?
            </label>
         <select
  name="investment_amount"
  disabled
  value={data?.investment_profile_id?.invested_amount || ""}
  id="investment-amount"
  className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
>
  <option>Select</option>
  {[...Array(100)].map((_, index) => {
    const amount = (index + 1) * 1000; 
    return (
      <option key={amount} value={amount}>
        {amount.toLocaleString()}
      </option>
    );
  })}
</select>

          </div>
          <div className="flex flex-col gap-4 ">
            <div className=" ">
              <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
                <label htmlFor="investment-amount" className="font-bold">
                  Investment Frequency
                </label>
               <select
  name="investment_amount"
  disabled
  value={data?.investment_profile_id?.invested_amount || ""}
  id="investment-amount"
  className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
>
  <option>Select</option>
  {[...Array(10)].map((_, index) => {
    const amount = (index + 1) * 1000; 
    return (
      <option key={amount} value={amount}>
        {amount.toLocaleString()} 
      </option>
    );
  })}
</select>
              </div>

              <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
                <label htmlFor="investment-amount" className="font-bold">
                 Project Name
                </label>
                <input
                type="text"
                  name="investment_frequency"
                  // onChange={formDataHandler}
                  disabled
                  value={data.investment_profile_id.project_id.project_name}
                  className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
                >
                </input>
              </div>



              <div className=" md:mb-0 mb-3">
                <label
                  htmlFor="required_investment"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                 Transaction Id
                </label>
                <div className="mt-2">
                  <input
                    id="required_investment"
                    name="required_investment"
                    type="text"
                    value={data.receipt_id}
                    disabled
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
      </div>

              <label htmlFor="image-upload" className="font-bold h-[2rem]">
                Receipt :
              </label>

              <div className="mt-5">
                
              
                  <div className="mt-4 flex justify-center ">
                    <img
                      src={data.receipt_path}
                      alt="Receipt Preview"
                      className="md:w-[40%] w-[100%] h-[100%] object-cover "
                    />
                  </div>
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )}
  </>
  )
};

export default ApprovedReceiptPreview;

