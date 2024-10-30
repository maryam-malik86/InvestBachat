import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useGetUserByIdQuery,
  useUpdateUserIsActiveMutation,
  useRemoveUserMutation,
} from "../Admin side/ApprovingReceiptsApi"; // Adjust the import path as needed
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SingleUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetUserByIdQuery(id);
  const [updateUserIsActive] = useUpdateUserIsActiveMutation();
  const [removeUser] = useRemoveUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleConfirmAction = async () => {
    try {
      if (actionType === "toggleActivation") {
        const newIsActive = !data.data.isActive;
        const response = await updateUserIsActive({
          id: data.data._id,
          isActive: newIsActive,
        }).unwrap();
        toast.success(response.message);
      }  else if (actionType === "removeUser") {
        toast.success("User has been removed");
       const response = await removeUser(data.data._id).unwrap();
       navigate("/admin/allusers");
      }
      
      
    } catch (error) {
      const errorMessage = error.data?.message || "An error occurred.";
      toast.error(errorMessage);
    }
    setIsModalOpen(false);
  };

  const openModal = (type) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <PropagateLoader color="#3B82F6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <p className="text-red-500">Failed to load user details. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <LeftSideBar />
      <div className="flex min-h-full flex-1 flex-col mt-[5.2rem] px-6 py-2 lg:px-8">
        <div className="mt-10 md:w-[40rem] sm:w-[80%] w-[100%] mx-auto">
          <div className="space-y-3">
            <div className="md:flex md:gap-4">
              <div className="md:w-[50%] md:mb-0 mb-3">
                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    value={data.data.fullName || "Not filled"}
                    disabled
                    id="fullName"
                    type="text"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="md:w-[50%] md:mb-0 mb-3">
                <label htmlFor="fatherName" className="block text-sm font-medium leading-6 text-gray-900">
                  Father Name
                </label>
                <div className="mt-2">
                  <input
                    value={data.data.fatherName || "Not filled"}
                    disabled
                    id="fatherName"
                    type="text"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="cnicNumber" className="block text-sm font-medium leading-6 text-gray-900">
                CNIC
              </label>
              <div className="mt-2">
                <input
                  value={data.data.cnicNumber || "Not filled"}
                  disabled
                  id="cnicNumber"
                  type="text"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="md:flex md:gap-4">
              <div className="md:w-[50%]">
                <label htmlFor="mobileNumber" className="block text-sm font-medium leading-6 text-gray-900">
                  Mobile Number
                </label>
                <div className="mt-2">
                  <input
                    value={data.data.mobileNumber || "Not filled"}
                    disabled
                    id="mobileNumber"
                    type="text"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="md:w-[50%]">
                <label htmlFor="optionalMobileNumber" className="block text-sm font-medium leading-6 text-gray-900">
                  Another Number
                </label>
                <div className="mt-2">
                  <input
                    value={data.data.optionalMobileNumber || "Not filled"}
                    disabled
                    id="optionalMobileNumber"
                    type="text"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender
              </label>
              <div className="mt-2">
                <input
                  value={data.data.gender || "Not filled"}
                  disabled
                  id="gender"
                  type="text"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={data.data.email || "Not filled"}
                  disabled
                  id="email"
                  type="email"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full justify-center mt-6">
          <button
            onClick={() => openModal("toggleActivation")}
            type="button"
            className="flex w-[8rem] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
            disabled={isLoading}
          >
            {data.data.isActive ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={() => openModal("removeUser")}
            type="button"
            className="ml-4 flex w-[8rem] justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
          >
            Remove User
          </button>
        </div>

        {/* Modal */}
        <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  contentLabel="Confirmation Modal"
  className="Modal"
  overlayClassName="Overlay"
>
  <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
  <p className="text-sm text-gray-500">
    {actionType === "toggleActivation"? 
  data.data.isActive ? "Are you sure you want to deactivate the user?"
        : "Are you sure you want to activate the user?"
      : "Are you sure you want to remove this user?"}
  </p>
  <div className="mt-4 flex justify-end gap-3">
    <button
      onClick={handleConfirmAction}
      className={`px-3 py-2 rounded text-sm ${
        actionType === "removeUser"
          ? "bg-red-700 hover:bg-red-800"
          : "bg-green-500 hover:bg-green-600"
      } text-white`}
    >
      Confirm
    </button>
    <button
      onClick={() => setIsModalOpen(false)}
      className="bg-gray-500 text-white px-3 py-2 rounded text-sm"
    >
      Cancel
    </button>
  </div>
</Modal>
      </div>
    </div>
  );
};

export default SingleUserDetail;
