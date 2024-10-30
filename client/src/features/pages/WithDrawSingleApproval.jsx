import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useWithdrawFindByIdQuery,useDeleteInvestmentProfileMutation,useWithdrawFindByIdAndDeleteMutation,useSubtractAmountFromProfitMutation,useCreateApprovedWithdrawalMutation } from "../Admin side/ApprovingReceiptsApi";
import { PropagateLoader } from "react-spinners";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
const WithDrawSingleApproval = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  const [deleteInvestmentProfile]=useDeleteInvestmentProfileMutation()
  const [createApprovedWithdrawal] = useCreateApprovedWithdrawalMutation();
  const { data, isLoading } = useWithdrawFindByIdQuery(id);
  const [withdrawFindByIdAndDelete] = useWithdrawFindByIdAndDeleteMutation(id)
  const [subtractAmountFromProfit] = useSubtractAmountFromProfitMutation()
  const [user, setUser] = useState("");
  const [project_name, setProject_name] = useState("");
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState("");
  const [formData, setformData] = useState({
    receipt_picture: ""
  });

  useEffect(() => {
    if (data) {
        
      setUser(data.user_id.fullName);
      if(data.withdraw_type === "project"){
      setProject_name(data.investment_profile_ids[0].project_id.project_name);
      const totalInvestmentAmount = data.investment_profile_ids.reduce(
        (total, profile) => {
          // Assuming 'investment_amount' is the property name for investment amount
          return total + profile.invested_amount;
        },
        0
      );
      setTotalInvestmentAmount(totalInvestmentAmount);
    }
    }
  }, [data]);

  function formDataHandler(event) {
    const { name, value, checked, type } = event.target;
    setformData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const [img,setImg] = useState(false);
  const submitImg = (e)=>{
    const file = e.target.files[0]
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset","vnkvr19i");
    data.append("cloud_name","deiuxbyphp")
    setImg(true);
    fetch("https://api.cloudinary.com/v1_1/deiuxbyph/image/upload",{
      method:"post",
      body:data
    }).then((response)=>response.json())
    .then((data)=>{
    

      setformData((prevData) => ({
        ...prevData,
        receipt_picture: data.url
      }));
    setImg(false)
    }).catch((error)=>{
      setImg(false)
      console.log(error)
    })
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
        <div className="xl:pl-[12rem]">
        <div className="mt-[7.6rem] xl:ml-[17rem] xl:w-[75%] w-[90%] mx-auto shadow-custom min-h-[70vh] p-5">
          {
            data.withdraw_type === "project" ?(
              <>
          <p className="lg:text-xl md:text-lg sm:text-md ">
            {" "}
            <span className="font-bold ">User name : </span> {user}
          </p>
          <p className="lg:text-xl md:text-lg sm:text-md">
            <span className="font-bold ">Project name : </span>
            {project_name}
          </p>
          <p className="lg:text-xl md:text-lg sm:text-md">
            <span className="font-bold ">Invested Amount : </span>
            {totalInvestmentAmount}
          </p>
          <p className="lg:text-xl md:text-lg sm:text-md">
            <span className="font-bold ">Account name : </span>
            {data.accountName}
          </p>
              </>
            ) : (
              <>
              <div>
              <p className="text-xl">
            {" "}
            <span className="font-bold ">User name : </span> {user}
              </p>
              <p className="text-xl">
            {" "}
            <span className="font-bold ">Amount from profit : </span> {data.withdraw_amount}
              </p>

              </div>
              </>
            )
          }
{/* 
<div className="md:flex md:gap-4">
              <div className="md:w-[50%] md:mb-0 mb-3">
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
                    value={data.account_number}
                    disabled
                    type="Number"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div> */}

<div className="relative w-full sm:ml-2 bg-gray-100 px-2 py-1 rounded-md text-xs sm:text-sm md:text-base">
                      <input
                        id="account-number"
                        type="text"
                        value={data.account_number}
                        readOnly
                        className="w-full bg-transparent"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(data.account_number);
                          toast.success("Copied to clipboard");
                        }}
                        className="absolute  right-0 h-[90%] w-[3rem] sm:top-0 top-[-.2rem] px-2 py-1 text-black rounded-md"
                      >
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
                      </button>
                    </div>


          <label htmlFor="image-upload" className="lg:text-xl md:text-lg sm:text-md">
            Upload Receipt :
          </label>

          <div className="mt-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e)=>submitImg(e)}
              className="hidden"
              id="fileInput"
            />
            {
            img ? (
              <div className="flex justify-center">
                <PropagateLoader color="#3B82F6" />
              </div>
            ) :formData.receipt_picture ? (
              <div className="mt-4 flex justify-center ">
                <img
                  src={formData.receipt_picture}
                  alt="Receipt Preview"
                  className="md:w-[40%] w-[100%] h-[100%] object-cover "
                />
              </div>
            ) : (
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center w-full h-[5rem] sm:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-400 dark:hover:bg-gray-300"
              >
                <div className="flex flex-col  items-center justify-center pt-5 pb-6">
                  <svg
                    className="sm:block hidden w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>{" "}
                    Receipt Photo
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG
                  </p>
                </div>
              </label>
            )}
          </div>


          <button
            className={`flex mx-auto w-[7rem] mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            onClick={()=>{
              if(data.withdraw_type === "project"){
                if(formData.receipt_picture === ""){
                    return toast.error("Please upload receipt")
                }else{
                    deleteInvestmentProfile({
                        user_id:data.investment_profile_ids[0].user_id._id,
                        project_id:data.investment_profile_ids[0].project_id._id,
                        with_draw:true
                    }).then((response)=>{
                      createApprovedWithdrawal({
                        receipts_url:formData.receipt_picture,
                        account_number:data.account_number,
                        user_name:data.user_id.fullName,
                        user_cnic:data.user_id.cnicNumber
                      })
                        withdrawFindByIdAndDelete({id})
                        navigate("/admin/ApprovedWithdraws")
                        toast.success("Approved Successful")
                    }).catch((error)=>{
                        toast.error("Something went wrong")
                    })
                }
              }else{
                if(formData.receipt_picture === ""){
                    return toast.error("Please upload receipt")
                }else{
                subtractAmountFromProfit({
                  user_id:data.user_id._id,
                  amount:data.withdraw_amount
                }).then((response)=>{
                  createApprovedWithdrawal({
                    receipts_url:formData.receipt_picture,
                    account_number:data.account_number,
                    user_name:data.user_id.fullName,
                    user_cnic:data.user_id.cnicNumber
                  })
                  withdrawFindByIdAndDelete({id})
                  navigate("/admin/WithDrawListForApproval")
                        toast.success("Approved Successful")
                        // window.location.reload()
                })
              }
            }
             
            }}
          >
            Withdraw
          </button>

        </div>
        </div>
      )}
    </div>
  );
};

export default WithDrawSingleApproval;






