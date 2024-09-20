import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import { useGettingReceiptByIdQuery } from "../Admin side/ApprovingReceiptsApi";
import { useParams } from "react-router-dom";
import { useAddTransctionIdMutation ,useUpdateReceiptIdMutation} from "../Admin side/ApprovingReceiptsApi";
import {
  useUpdatingReceiptMutation,
  useUpdatingInvestmentProfileMutation,
} from "../billing/billingApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

const CheckReceipt = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGettingReceiptByIdQuery(id);
  const [updateReceiptId] = useUpdateReceiptIdMutation();
  const [formData, setFormData] = useState({
    inputField: data ? data.receipt_id : "", // Initialize formData with receipt_id if data is available
  });

  useEffect(() => {
    if (data) {
      // Update formData with receipt_id whenever data changes
      setFormData((prevData) => ({
        ...prevData,
        inputField: data.receipt_id,
      }));
    }
  }, [data]);

  const [addTransctionId] = useAddTransctionIdMutation();
  const [updatingReceipt] = useUpdatingReceiptMutation();
  const [updatingInvestmentProfile] = useUpdatingInvestmentProfileMutation();

  const formDataHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// console.log(data._id,formData.inputField)
const submitHandler = () => {
  if (formData.inputField !== "") {
      // Show confirmation alert
      if (window.confirm("Are you sure you have submit the preview Section?")) {
          addTransctionId({ transactionId: formData.inputField })
              .unwrap()
              .then((res) => {
                  if (res.message) {
                      toast.success(res.message);
                      updatingReceipt({ id: data._id }).unwrap();
                      updatingInvestmentProfile({
                          id: data.investment_profile_id,
                      }).unwrap();
                      updateReceiptId({ id: data._id, receipt_id: formData.inputField }).unwrap();
                      navigate("/admin/receiptlist");
                  } else {
                      toast.error("Already exists");
                  }
              })
              .catch((e) => {
                  toast.error("Something went wrong");
              });
      }
  } else {
      toast.warn("Please enter the transaction id");
  }
};

  return (
    <div className="z-[0] w-full">
      <Navbar />
      <LeftSideBar />
      <div className="">
        <div className="xl:ml-[17rem] mt-[7.8rem]">
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <PropagateLoader color="#3B82F6" />
            </div>
          ) : (
            <div>
              <img
                className="xl:w-[90%] w-full"
                src={data.receipt_path}
                alt=""
              />
              <div className="pl-2 xl:mx-0  my-2 fixed bottom-0 bg-white flex items-center justify-between h-[3rem] focus:outline-none  xl:w-[78%] w-[100%]  rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-">
                <input
                  onChange={formDataHandler}
                  id="inputField"
                  name="inputField"
                  type="text"
                  autoComplete="inputField"
                  required
                  placeholder="Enter the receipt id here..."
                  className="h-7 w-[90%]"
                  value={formData.inputField}
                />
                <button
                  onClick={submitHandler}
                  className="h-full w-[4rem] bg-indigo-500 font-bold text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckReceipt;
