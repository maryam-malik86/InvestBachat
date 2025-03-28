// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { PropagateLoader } from "react-spinners";
// import { toast } from "react-toastify";
// import Navbar from "../dashboard/DashboardComponents/Navbar";
// import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
// import {
//   usePrevieweReceiptByIdQuery,
//   useUpdateInvestmentProfileByIdMutation,
//   useUpdateInvestmentByIdMutation,
//   useUpdateInvestmentStatusByIdMutation,
//   useAddInvestmentMutation,
//   useDeleteReceiptMutation,
// } from "../Admin side/ApprovingReceiptsApi";
// import { AppContext } from "../../app/AppContext";

// const PreviewReceipt = () => {
//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const [updateInvestmentProfileById] =
//     useUpdateInvestmentProfileByIdMutation();
//   const [updateInvestmentById] = useUpdateInvestmentByIdMutation();
//   const [updateInvestmentStatusById] = useUpdateInvestmentStatusByIdMutation();
//   const [addInvestment] = useAddInvestmentMutation();
//   const [deleteReceipt] = useDeleteReceiptMutation();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { data, isLoading, refetch } = usePrevieweReceiptByIdQuery(id);

//   const [formData, setformData] = useState({
//     investment_amount: "",
//     investment_frequency: "",
//     receipt_picture: "",
//     receiptId: "",
//   });
//   const options = Array.from({ length: 100 }, (_, i) => ({
//     label: (i + 1) * 1000,
//     value: (i + 1) * 1000,
//   }));
//   const [selected, setSelected] = useState(() => {
//     // Set default from formData or fallback to first option
//     const initialValue =
//       options.find(
//         (opt) => opt.value.toString() === formData.investment_amount
//       ) || options[0];
//     return initialValue;
//   });
//   const filteredOptions = options.filter((opt) =>
//     opt.label.toString().toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSelect = (option) => {
//     setSelected(option);
//     setIsOpen(false);
//     setformData((prev) => ({
//       ...prev,
//       investment_amount: option.value.toString(),
//     }));
//   };

//   const [img, setImg] = useState(false);

//   // Modal state
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (data) {
//       setformData({
//         ID: data._id,
//         investment_amount: data.investment_profile_id.invested_amount,
//         investment_frequency: data.investment_profile_id.investment_frequency,
//         receipt_picture: data.receipt_path,
//         receiptId: data.receipt_id,
//       });
//     }
//   }, [data]);

//   const submitImg = (e) => {
//     const file = e.target.files[0];
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "vnkvr19i");
//     data.append("cloud_name", "deiuxbyphp");
//     setImg(true);
//     fetch("https://api.cloudinary.com/v1_1/deiuxbyph/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setformData((prevData) => ({
//           ...prevData,
//           receipt_picture: data.url,
//         }));
//         setImg(false);
//       })
//       .catch((error) => {
//         setImg(false);
//         console.log(error);
//       });
//   };

//   function formDataHandler(event) {
//     const { name, value, checked, type } = event.target;
//     setformData((prevData) => {
//       return {
//         ...prevData,
//         [name]: type === "checkbox" ? checked : value,
//       };
//     });
//   }

//   const deleteHandler = () => {
//     deleteReceipt(formData.ID)
//       .unwrap()
//       .then((response) => {
//         toast.success(response.message);
//         setShowModal(false); // Close the modal after deletion
//         navigate("/admin/receiptlist");
//       })
//       .catch((error) => {
//         toast.error("Failed to delete receipt");
//         console.error(error);
//       });
//   };

//   const submitHandler = () => {
//     updateInvestmentProfileById({
//       id: data.investment_profile_id._id,
//       invested_amount: formData.investment_amount,
//       investment_frequency: formData.investment_frequency,
//     });
//     updateInvestmentById({
//       id: data.investment_id[0]._id,
//       investment_amount: formData.investment_amount,
//     });

//     addInvestment({
//       id: data.investment_profile_id.project_id,
//       investment_amount: formData.investment_amount,
//     });

//     updateInvestmentStatusById({
//       id: data.investment_profile_id._id,
//       investment_status: "approved",
//     });
//     navigate("/admin/approved");
//   };

//   // Open the delete modal
//   const openModal = () => setShowModal(true);

//   // Close the delete modal
//   const closeModal = () => setShowModal(false);

//   return (
//     <>
//       <Navbar />
//       <LeftSideBar />
//       {isLoading ? (
//         <div className="flex justify-center items-center h-screen">
//           <PropagateLoader color="#3B82F6" />
//         </div>
//       ) : (
//         <div className="xl:ml-[17rem] mt-[7.8rem] xl:w-[75%] p-4">
//           <div className="text-black w-full text-sm bg-white sm:mb-10 mx-auto p-8 shadow-lg rounded-lg">
//             <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
//               <label htmlFor="investment-amount" className="font-bold text-lg">
//                 How much do you want to invest?
//               </label>
//               <div className="relative w-full sm:w-64">
//                 <div
//                   className="border border-gray-300 p-2 rounded-lg cursor-pointer flex justify-between items-center w-full"
//                   onClick={() => setIsOpen(!isOpen)}
//                 >
//                   <span>{selected ? selected.label : "Select..."}</span>
//                   <span className="text-gray-500">&#9662;</span>
//                 </div>
//                 {isOpen && (
//                   <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
//                     <input
//                       type="text"
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       className="w-full p-2 border-b outline-none"
//                       placeholder="Search..."
//                       autoFocus
//                     />
//                     <ul className="max-h-40 overflow-auto">
//                       {filteredOptions.length > 0 ? (
//                         filteredOptions.map((option) => (
//                           <li
//                             key={option.value}
//                             className="p-2 hover:bg-gray-200 cursor-pointer"
//                             onClick={() => handleSelect(option)}
//                           >
//                             {option.label}
//                           </li>
//                         ))
//                       ) : (
//                         <li className="p-2 text-gray-500">No results found</li>
//                       )}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
//               <label
//                 htmlFor="investment-frequency"
//                 className="font-bold text-lg"
//               >
//                 Investment Frequency
//               </label>
//               <select
//                 name="investment_frequency"
//                 disabled
//                 value={data.investment_profile_id.investment_frequency}
//                 id="investment-frequency"
//                 className="sm:ml-2 p-2 sm:w-[15rem] w-full bg-slate-100 rounded-md"
//               >
//                 <option>Select</option>
//                 <option value="1">Monthly</option>
//                 <option value="6">By Annually</option>
//                 <option value="12">Annually</option>
//               </select>
//             </div>

//             <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
//               <label htmlFor="project-name" className="font-bold text-lg">
//                 Project Name
//               </label>
//               <input
//                 type="text"
//                 name="investment_frequency"
//                 disabled
//                 value={data.investment_profile_id.project_id.project_name}
//                 className="sm:ml-2 p-2 sm:w-[15rem] w-full bg-slate-100 rounded-md"
//               />
//             </div>

//             <label htmlFor="image-upload" className="font-bold text-lg">
//               Receipt :
//             </label>
//             <div className="mt-5">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => submitImg(e)}
//                 className="hidden"
//                 id="fileInput"
//               />
//               {img ? (
//                 <div className="flex justify-center">
//                   <PropagateLoader color="#3B82F6" />
//                 </div>
//               ) : formData.receipt_picture ? (
//                 <div className="mt-4 flex justify-center">
//                   <img
//                     src={formData.receipt_picture}
//                     alt="Receipt Preview"
//                     className="max-w-[150px] w-full h-auto object-cover rounded-md"
//                   />
//                 </div>
//               ) : (
//                 <label
//                   htmlFor="fileInput"
//                   className="flex items-center justify-center w-full h-[12rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-400 dark:hover:bg-gray-300"
//                 >
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <svg
//                       className="sm:block hidden w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 20 16"
//                     >
//                       <path
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                       />
//                     </svg>
//                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                       <span className="font-semibold">Click to upload</span>{" "}
//                       Receipt Photo
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       PNG, JPG
//                     </p>
//                   </div>
//                 </label>
//               )}
//             </div>

//             <div className="mt-4 flex justify-center space-x-4">
//               <button
//                 className="bg-indigo-600 rounded-lg text-white py-2 text-lg hover:bg-indigo-700 transition-all w-[200px]"
//                 onClick={() => {
//                   submitHandler();
//                   updateInvestmentProfileById({
//                     id: data.investment_profile_id._id,
//                     invested_amount: formData.investment_amount,
//                     investment_frequency: formData.investment_frequency,
//                   });
//                   updateInvestmentById({
//                     id: data.investment_id[0]._id,
//                     investment_amount: formData.investment_amount,
//                   });
//                   //   updateReceiptTransctionId({id:data._id,receiptId:data.receipt_id,})

//                   addInvestment({
//                     id: data.investment_profile_id.project_id,
//                     amount: formData.investment_amount,
//                     investment_status:
//                       data.investment_id[0].Investments.investment_status,
//                   })
//                     .unwrap()
//                     .then((response) => {
//                       updateInvestmentStatusById({
//                         id: data.investment_id[0]._id,
//                         investment_status: "paid",
//                       })
//                         .unwrap()
//                         .then((response) => {})
//                         .catch(() => {
//                           toast.error("Error Occured");
//                         });
//                     })
//                     .catch((error) => {
//                       toast.error("Error Occured");
//                     });
//                   toast.success("Previewed");
//                   navigate("/admin/receiptlist");
//                 }}
//               >
//                 Submit{" "}
//               </button>
//               <button
//                 className="bg-red-600 rounded-lg text-white py-2 text-lg hover:bg-red-700 transition-all w-[200px]"
//                 onClick={openModal} // Open the modal
//               >
//                 Delete Receipt
//               </button>
//             </div>

//             {/* Modal */}
//             {showModal && (
//               <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded-lg w-1/3 max-w-md">
//                   <h2 className="text-xl font-semibold text-center">
//                     Confirm Deletion
//                   </h2>
//                   <p className="mt-3 text-center text-gray-600">
//                     Are you sure you want to delete this receipt?
//                   </p>
//                   <div className="flex justify-center mt-6 space-x-4">
//                     <button
//                       className="bg-gray-500 text-white px-4 py-2 rounded-lg"
//                       onClick={closeModal}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="bg-red-600 text-white px-4 py-2 rounded-lg"
//                       onClick={deleteHandler} // Call deleteHandler directly
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PreviewReceipt;
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import {
  usePrevieweReceiptByIdQuery,
  useUpdateInvestmentProfileByIdMutation,
  useUpdateInvestmentByIdMutation,
  useUpdateInvestmentStatusByIdMutation,
  useAddInvestmentMutation,
  useDeleteReceiptMutation,
} from "../Admin side/ApprovingReceiptsApi";
import { AppContext } from "../../app/AppContext";

const PreviewReceipt = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [updateInvestmentProfileById] =
    useUpdateInvestmentProfileByIdMutation();
  const [updateInvestmentById] = useUpdateInvestmentByIdMutation();
  const [updateInvestmentStatusById] = useUpdateInvestmentStatusByIdMutation();
  const [addInvestment] = useAddInvestmentMutation();
  const [deleteReceipt] = useDeleteReceiptMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, refetch } = usePrevieweReceiptByIdQuery(id);

  const [formData, setformData] = useState({
    investment_amount: "",
    investment_frequency: "",
    receipt_picture: "",
    receiptId: "",
  });
  const options = Array.from({ length: 100 }, (_, i) => ({
    label: (i + 1) * 1000,
    value: (i + 1) * 1000,
  }));
  const [selected, setSelected] = useState(null);
  const filteredOptions = options.filter((opt) =>
    opt.label.toString().toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setformData((prev) => ({
      ...prev,
      investment_amount: option.value.toString(),
    }));
  };

  const [img, setImg] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setformData({
        ID: data._id,
        investment_amount: data.investment_profile_id.invested_amount,
        investment_frequency: data.investment_profile_id.investment_frequency,
        receipt_picture: data.receipt_path,
        receiptId: data.receipt_id,
      });
    }
  }, [data]);
  useEffect(() => {
    console.log(formData.investment_amount);
    if (formData.investment_amount) {

      const initialValue = options.find(
        (opt) => opt.value === Number(formData.investment_amount)
      );
      
 console.log(initialValue);
    setSelected(initialValue);
    }
  }, [formData.investment_amount]);

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

  const deleteHandler = () => {
    deleteReceipt(formData.ID)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        setShowModal(false); // Close the modal after deletion
        navigate("/admin/receiptlist");
      })
      .catch((error) => {
        toast.error("Failed to delete receipt");
        console.error(error);
      });
  };

  const submitHandler = () => {
    updateInvestmentProfileById({
      id: data.investment_profile_id._id,
      invested_amount: formData.investment_amount,
      investment_frequency: formData.investment_frequency,
    });
    updateInvestmentById({
      id: data.investment_id[0]._id,
      investment_amount: formData.investment_amount,
    });

    addInvestment({
      id: data.investment_profile_id.project_id,
      investment_amount: formData.investment_amount,
    });

    updateInvestmentStatusById({
      id: data.investment_profile_id._id,
      investment_status: "approved",
    });
    navigate("/admin/approved");
  };

  // Open the delete modal
  const openModal = () => setShowModal(true);

  // Close the delete modal
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      <LeftSideBar />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <PropagateLoader color="#3B82F6" />
        </div>
      ) : (
        <div className="xl:ml-[17rem] mt-[7.8rem] xl:w-[75%] p-4">
          <div className="text-black w-full text-sm bg-white sm:mb-10 mx-auto p-8 shadow-lg rounded-lg">
            <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
              <label htmlFor="investment-amount" className="font-bold text-lg">
                How much do you want to invest?
              </label>
              <div className="relative w-full sm:w-64">
                <div
                  className="border border-gray-300 p-2 rounded-lg cursor-pointer flex justify-between items-center w-full"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>{selected ? selected.label : "Select..."}</span>
                  <span className="text-gray-500">&#9662;</span>
                </div>
                {isOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full p-2 border-b outline-none"
                      placeholder="Search..."
                      autoFocus
                    />
                    <ul className="max-h-40 overflow-auto">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                          <li
                            key={option.value}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelect(option)}
                          >
                            {option.label}
                          </li>
                        ))
                      ) : (
                        <li className="p-2 text-gray-500">No results found</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
              <label
                htmlFor="investment-frequency"
                className="font-bold text-lg"
              >
                Investment Frequency
              </label>
              <select
                name="investment_frequency"
                disabled
                value={data.investment_profile_id.investment_frequency}
                id="investment-frequency"
                className="sm:ml-2 p-2 sm:w-[15rem] w-full bg-slate-100 rounded-md"
              >
                <option>Select</option>
                <option value="1">Monthly</option>
                <option value="6">By Annually</option>
                <option value="12">Annually</option>
              </select>
            </div>

            <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
              <label htmlFor="project-name" className="font-bold text-lg">
                Project Name
              </label>
              <input
                type="text"
                name="investment_frequency"
                disabled
                value={data.investment_profile_id.project_id.project_name}
                className="sm:ml-2 p-2 sm:w-[15rem] w-full bg-slate-100 rounded-md"
              />
            </div>

            <label htmlFor="image-upload" className="font-bold text-lg">
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
                <div className="mt-4 flex justify-center">
                  <img
                    src={formData.receipt_picture}
                    alt="Receipt Preview"
                    className="max-w-[150px] w-full h-auto object-cover rounded-md"
                  />
                </div>
              ) : (
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center w-full h-[12rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-400 dark:hover:bg-gray-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
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

            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="bg-indigo-600 rounded-lg text-white py-2 text-lg hover:bg-indigo-700 transition-all w-[200px]"
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
                        .then((response) => {})
                        .catch(() => {
                          toast.error("Error Occured");
                        });
                    })
                    .catch((error) => {
                      toast.error("Error Occured");
                    });
                  toast.success("Previewed");
                  navigate("/admin/receiptlist");
                }}
              >
                Submit{" "}
              </button>
              <button
                className="bg-red-600 rounded-lg text-white py-2 text-lg hover:bg-red-700 transition-all w-[200px]"
                onClick={openModal} // Open the modal
              >
                Delete Receipt
              </button>
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-1/3 max-w-md">
                  <h2 className="text-xl font-semibold text-center">
                    Confirm Deletion
                  </h2>
                  <p className="mt-3 text-center text-gray-600">
                    Are you sure you want to delete this receipt?
                  </p>
                  <div className="flex justify-center mt-6 space-x-4">
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      onClick={deleteHandler} // Call deleteHandler directly
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewReceipt;
