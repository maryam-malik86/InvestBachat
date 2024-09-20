import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useGetUserByIdQuery,
  useUpdateUserIsActiveMutation,
} from "../Admin side/ApprovingReceiptsApi";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root"); // This line is required for accessibility

const SingleUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetUserByIdQuery(id);
  const [updateUserIsActive] = useUpdateUserIsActiveMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleConfirmAction = () => {
    if (actionType === "toggleActivation") {
      const newIsActive = !data.data.isActive; // Toggle the isActive value
      updateUserIsActive({
        id: data.data._id,
        isActive: newIsActive,
      })
        .unwrap()
        .then((response) => {
          navigate("/admin/allusers");
          toast.success(response.message);
        });
    } else if (actionType === "removeUser") {
      toast.success("User removed successfully.");
    }
    setIsModalOpen(false);
  };

  const openModal = (type) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar />
      <LeftSideBar />
      {isLoading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <PropagateLoader color="#3B82F6" />
        </div>
      ) : (
        <>
          <div className="flex min-h-full flex-1 flex-col mt-[5.2rem] px-6 py-2  lg:px-8">
            <div className=" mt-10 md:w-[40rem] sm:w-[80%] w-[100%]  mx-auto">
              <div className="space-y-3 " action="#" method="POST">
                <div className="md:flex md:gap-4">
                  <div className="md:w-[50%] md:mb-0 mb-3">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        value={
                          data.data.fullName ? data.data.fullName : "Not filled"
                        }
                        disabled
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="md:w-[50%] md:mb-0 mb-3">
                    <label
                      htmlFor="fatherName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Father Name
                    </label>
                    <div className="mt-2">
                      <input
                        value={
                          data.data.fatherName
                            ? data.data.fatherName
                            : "Not filled"
                        }
                        disabled
                        id="fatherName"
                        name="fatherName"
                        type="text"
                        required
                        className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cnicNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    CNIC
                  </label>
                  <div className="mt-2">
                    <input
                      value={
                        data.data.cnicNumber
                          ? data.data.cnicNumber
                          : "Not filled"
                      }
                      disabled
                      id="cnicNumber"
                      name="cnicNumber"
                      type="text"
                      mask="99999-9999999-9"
                      required
                      className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="md:flex md:gap-4">
                  <div className="md:w-[50%]">
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mobile Number
                    </label>
                    <div className="mt-2">
                      <input
                        value={
                          data.data.mobileNumber
                            ? data.data.mobileNumber
                            : "Not filled"
                        }
                        disabled
                        id="mobileNumber"
                        name="mobileNumber"
                        type="text"
                        mask="9999-9999999"
                        required
                        className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="md:w-[50%]">
                    <label
                      htmlFor="optionalMobileNumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Another Number
                    </label>
                    <div className="mt-2">
                      <input
                        value={
                          data.data.optionalMobileNumber
                            ? data.data.optionalMobileNumber
                            : "Not filled"
                        }
                        disabled
                        id="optionalMobileNumber"
                        name="optionalMobileNumber"
                        type="text"
                        mask="9999-9999999"
                        required
                        className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gender
                  </label>
                  <div className="mt-2">
                    <input
                      value={data.data.gender ? data.data.gender : "Not filled"}
                      disabled
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      value={data.data.email ? data.data.email : "Not filled"}
                      disabled
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center my-6">
            <button
              onClick={() => openModal("toggleActivation")}
              type="submit"
              className="flex w-[8rem] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading}
            >
              {data.data.isActive ? "Activated" : "Not activated"}
            </button>

            <button
              onClick={() => openModal("removeUser")}
              type="button"
              className="flex w-[8rem] justify-center rounded-md mx-9 bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
              disabled={isLoading}
            >
              Remove User
            </button>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Confirmation Modal"
            className="Modal"
            overlayClassName="Overlay"
          >
            <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
            <p className="text-sm text-gray-500">
              {actionType === "toggleActivation"
                ? "Are you sure you want to change the user activation status?"
                : "Are you sure you want to remove this user?"}
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleConfirmAction}
                className={`px-3 py-2 rounded text-sm ${
                  actionType === "removeUser"
                    ? "bg-red-700 hover:bg-red-700"
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
        </>
      )}
    </div>
  );
};

export default SingleUserDetail;
