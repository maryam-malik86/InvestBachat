import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  usePrevieweReceiptByIdQuery,
  useUpdateInvestmentProfileByIdMutation,
  useUpdateInvestmentByIdMutation,
  useUpdateReceiptTransctionIdMutation,
  useAddInvestmentMutation,
  useUpdateInvestmentStatusByIdMutation,
} from "../Admin side/ApprovingReceiptsApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import { AppContext } from "../../app/AppContext";
const PreviewReceipt = () => {
  const [updateInvestmentProfileById] =
    useUpdateInvestmentProfileByIdMutation();
  const [updateInvestmentById] = useUpdateInvestmentByIdMutation();
  // const [updateReceiptTransctionId] = useUpdateReceiptTransctionIdMutation();
  const [updateInvestmentStatusById] = useUpdateInvestmentStatusByIdMutation();
  const [addInvestment] = useAddInvestmentMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading ,refetch } = usePrevieweReceiptByIdQuery(id);
  const [formData, setformData] = useState({
    investment_amount: "",
    investment_frequency: "",
    receipt_picture: "",
    receiptId: "",
  });

  useEffect(()=>{
    refetch()
  },[])

  useEffect(() => {
    if (data) {
      // Update formData when data changes
      setformData({
        investment_amount: data.investment_profile_id.invested_amount,
        investment_frequency: data.investment_profile_id.investment_frequency,
        receipt_picture: data.receipt_path,
        receiptId: data.receipt_id,
      });
    }
  }, [data]);

  const [img, setImg] = useState(false);
  const submitImg = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "vnkvr19i");
    data.append("cloud_name", "deiuxbyphp");
    setImg(true);
    fetch("https://api.cloudinary.com/v1_1/deiuxbyph/image/upload", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setformData((prevData) => ({
          ...prevData,
          receipt_picture: data.url,
        }));
        setImg(false);
      })
      .catch((error) => {
        setImg(false);
        console.log(error);
      });
  };

  function formDataHandler(event) {
    const { name, value, checked, type } = event.target;
    setformData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  let array = [];
  function submitHandler(event) {
    array.push(formData);
  }

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
              onChange={formDataHandler}
              value={formData.investment_amount}
              id="investment-amount"
              className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
            >
              <option>Select</option>
              <option value="1000">1 Thousand</option>
              <option value="2000">2 Thousand</option>
              <option value="5000">5 Thousand</option>
              <option value="10000">10 Thousand</option>
              <option value="20000">20 Thousand</option>
              <option value="30000">30 Thousand</option>
              <option value="50000">50 Thousand</option>
              <option value="70000">70 Thousand</option>
              <option value="100000">100 Thousand</option>
            </select>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className=" ">
              <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
                <label htmlFor="investment-amount" className="font-bold">
                  Investment Frequency
                </label>
                <select
                  name="investment_frequency"
                  // onChange={formDataHandler}
                  disabled
                  value={data.investment_profile_id.investment_frequency}
                  id="investment-amount"
                  className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
                >
                  <option>Select</option>
                  <option value="1">Monthly</option>
                  <option value="6">By Annually</option>
                  <option value="12">Annually</option>
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


              <label htmlFor="image-upload" className="font-bold h-[2rem]">
                Receipt :
              </label>

              <div className="mt-5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => submitImg(e)}
                  className="hidden"
                  id="fileInput"
                />
                {img ? (
                  <div className="flex justify-center">
                    <PropagateLoader color="#3B82F6" />
                  </div>
                ) : formData.receipt_picture ? (
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
            </div>

            <button
              className="sm:mt-5 mt-1 w-[100%] bg-indigo-600 rounded-lg text-white py-1 text-xl"
              onClick={() => {
                submitHandler();
                updateInvestmentProfileById({
                  id: data.investment_profile_id._id,
                  invested_amount: formData.investment_amount,
                  investment_frequency: formData.investment_frequency,
                });
                updateInvestmentById({
                  id: data.investment_id[0]._id,
                  investment_amount: formData.investment_amount,
                });
                //   updateReceiptTransctionId({id:data._id,receiptId:data.receipt_id,})
                
                addInvestment({
                  id: data.investment_profile_id.project_id,
                  amount: formData.investment_amount,
                  investment_status:
                    data.investment_id[0].Investments.investment_status,
                })
                  .unwrap()
                  .then((response) => {
                      updateInvestmentStatusById({
                        id: data.investment_id[0]._id,
                        investment_status: "paid",
                      })
                        .unwrap()
                        .then((response) => {
                        })
                        .catch(() => {
                          toast.error("Error Occured");
                        });
                        
                    
                  })
                  .catch((error) => {
                    toast.error("Error Occured");
                  });
                toast.success("Previewed");
                  navigate('/admin/receiptlist')
                  
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
    </>
);
};

export default PreviewReceipt;
