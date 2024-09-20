import React from "react";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import { useGettingAllReceiptsQuery } from "../Admin side/ApprovingReceiptsApi";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useEffect } from "react";

const ReceiptsList = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGettingAllReceiptsQuery();

  useEffect(() => {
    refetch();
  }, []);

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
              {data &&
              data.filter((receipt) => !receipt.is_deleted).length > 0 ? (
                data
                  .filter((receipt) => !receipt.is_deleted) // Filter out receipts where is_deleted is false
                  .map((receipt) => {
                    return (
                      <div className=" my-4">
                        <div
                          className="flex justify-between items-center pl-5 bg-gray-200 w-[100%]  rounded-lg"
                          key={receipt._id}
                        >
                          <div className="w-[60%] flex justify-between ">
                            <div>{receipt.user_id.fullName}</div>
                            <div className="md:block hidden">
                              {receipt.user_id.cnicNumber}
                            </div>
                          </div>

                          <div className="flex gap-2">
                          <button
                            className="h-[3rem] w-[5rem] bg-red-500 text-white rounded-lg"
                            onClick={() => {
                              navigate(`/admin/receiptlist/previewreceipt/${receipt._id}`);
                            }}
                          >
                            Preview
                          </button>
                          <button
                            className="h-[3rem] w-[5rem] bg-indigo-500 text-white rounded-lg"
                            onClick={() => {
                              navigate(`/admin/chechreceipt/${receipt._id}`);
                            }}
                          >
                            Approve
                          </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="flex flex-col justify-center items-center h-screen text-2xl font-bold text-indigo-500 space-y-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-12 w-12 text-indigo-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
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
};

export default ReceiptsList;
