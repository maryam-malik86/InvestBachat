// import React from "react";
// import { useState,useEffect } from "react";
// import { toast } from "react-toastify";
// import {
//   useAdminBankDetailsQuery,
//   useCreateInvestmentsMutation,
//   useCreateInvestmentProfileMutation,
//   useInvestmentReciptMutation,
// } from "../billingApi";
// import PropagateLoader from "react-spinners/PropagateLoader";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import imageCompression from 'browser-image-compression';
// const AdminBankDetailsComponent = ({ id }) => {
//   const userId = useSelector((state) => state.user.userData);
//   const { data, isLoading } = useAdminBankDetailsQuery();
//   const [createInvestmentProfile, { isLoading: profileLoading }] = useCreateInvestmentProfileMutation();
//   const [investmentRecipt, { isLoading: receiptLoading }] = useInvestmentReciptMutation();
//   const [createInvestments, { isLoading: investmentsLoading }] = useCreateInvestmentsMutation();
//   const navigate = useNavigate();

//   const [isSlowNetwork, setIsSlowNetwork] = useState(false);

//   const checkNetworkSpeed = async () => {
//       try {
//           const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
//           if (connection) {
//               const downlinkSpeed = connection.downlink;
//               setIsSlowNetwork(downlinkSpeed < 0.25); // Assuming 0.25 Mbps as threshold for slow network (2G)
//           }
//       } catch (error) {
//           console.error('Error while detecting network speed:', error);
//       }
//   };
//   useEffect(() => {
//       checkNetworkSpeed();
//   }, []);

//   const [formData, setformData] = useState({
//     investment_amount: "",
//     investment_frequency: "",
//     receipt_picture: "",
//     receiptId:"",
//     agree:false
//   });
//   const [img,setImg] = useState(false);
//   const submitImg = (e)=>{
//     const file = e.target.files[0]
//     const data = new FormData();
//     data.append("file",file);
//     data.append("upload_preset","vnkvr19i");
//     data.append("cloud_name","deiuxbyphp")
//     setImg(true);
//     fetch("https://api.cloudinary.com/v1_1/deiuxbyph/image/upload",{
//       method:"post",
//       body:data
//     }).then((response)=>response.json())
//     .then((data)=>{
    

//       setformData((prevData) => ({
//         ...prevData,
//         receipt_picture: data.url
//       }));
//     setImg(false)
//     }).catch((error)=>{
//       setImg(false)
//       toast.error("Error uploading image refresh the page")
//     })
//   }


//   function formDataHandler(event) {
//     const { name, value, checked, type } = event.target;
//     setformData((prevData) => {
//       return {
//         ...prevData,
//         [name]: type === "checkbox" ? checked : value,
//       };
//     });
//   }
//   let array = [];
//   function submitHandler(event) {
//     array.push(formData);
//   }

//   return isLoading || profileLoading || receiptLoading || investmentsLoading ? (
//     <div className="flex justify-center items-center h-screen">
//       <PropagateLoader color="#3B82F6" />
//     </div>
//   ) : (
//     <div className="text-black w-[100%] text-sm bg-white sm:mb-10 mx-auto p-8  shadow-custom">
//       <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
//         <label htmlFor="investment-amount" className="font-bold">
//           How much do you want to invest?
//         </label>
//         <select
//           name="investment_amount"
//           onChange={formDataHandler}
//           value={formData.investment_amount}
//           id="investment-amount"
//           className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
//         >
//           <option>Select</option>
//           <option value="1000">1 Thousand</option>
//           <option value="2000">2 Thousand</option>
//           <option value="5000">5 Thousand</option>
//           <option value="10000">10 Thousand</option>
//           <option value="20000">20 Thousand</option>
//           <option value="30000">30 Thousand</option>
//           <option value="50000">50 Thousand</option>
//           <option value="70000">70 Thousand</option>
//           <option value="100000">100 Thousand</option>
//         </select>
//       </div>
//       <div className="flex flex-col gap-4 ">
//         <div className=" ">
//           <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
//             <label htmlFor="investment-amount" className="font-bold">
//               Investment Frequency
//             </label>
//             <select
//               name="investment_frequency"
//               onChange={formDataHandler}
//               value={formData.investment_frequency}
//               id="investment-amount"
//               className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
//             >
//               <option>Select</option>
//               <option value="1">Monthly</option>
//               <option value="6">By Annually</option>
//               <option value="12">Annually</option>
//             </select>
//           </div>

//           <div className="overflow-auto">
//             <div className="min-w-full sm:my-16 my-6">
//               <div className="sm:grid grid-cols-3 gap-4 px-2 py-1 bg-gray-200">
//                 <div className="hidden sm:block">Bank Logo</div>
//                 <div className="">Bank Details</div>
//                 <div className="hidden sm:block sm:ml-5">Account Number</div>
//               </div>
//               {data.bankAccount.map((data) => (
//                 <div
//                   key={data.account_no}
//                   className="sm:grid grid-cols-2 sm:grid-cols-3 gap-4 border-b"
//                 >
//                   <div className="px-2 py-1 font-bold hidden sm:block pt-2">
//                    <img src={data.bank_logo} alt="not found" className="w-[7rem]" /> 
//                   </div>
//                   <div className="px-2 py-1">{data.bank_name}</div>
//                   <div className="px-2 py-1">
//                     <div className="relative w-full sm:ml-2 bg-gray-100 px-2 py-1 rounded-md text-xs sm:text-sm md:text-base">
//                       <input
//                         id="account-number"
//                         type="text"
//                         value={data.account_no}
//                         readOnly
//                         className="w-full bg-transparent"
//                       />
//                       <button
//                         onClick={() => {
//                           navigator.clipboard.writeText(data.account_no);
//                           toast.success("Copied to clipboard");
//                         }}
//                         className="absolute  right-0 h-[90%] w-[3rem] sm:top-0 top-[-.2rem] px-2 py-1 text-black rounded-md"
//                       >
//                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy">
//     <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//   </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="my-4">
//               <label
//                 htmlFor="receiptId"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Enter Transaction id
//               </label>
//               <div className="mt-2">
//                 <input
//                   onChange={formDataHandler}
//                   id="receiptId"
//                   name="receiptId"
//                   type="receiptId"
//                   autoComplete="receiptId"
//                   placeholder="123456789"
//                   required
//                   className="focus:outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>  

//           <label htmlFor="image-upload" className="font-bold h-[2rem]">
//             Upload Receipt :
//           </label>

//           <div className="mt-5">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e)=>submitImg(e)}
//               className="hidden"
//               id="fileInput"
//             />
//             {
//             img ? (
//               <div className="flex justify-center">
//                 <PropagateLoader color="#3B82F6" />
//               </div>
//             ) :formData.receipt_picture ? (
//               <div className="mt-4 flex justify-center ">
//                 <img
//                   src={formData.receipt_picture}
//                   alt="Receipt Preview"
//                   className="md:w-[40%] w-[100%] h-[100%] object-cover "
//                 />
//               </div>
//             ) : (
//               <label
//                 htmlFor="fileInput"
//                 className="flex items-center justify-center w-full h-[5rem] sm:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-400 dark:hover:bg-gray-300"
//               >
//                 <div className="flex flex-col  items-center justify-center pt-5 pb-6">
//                   <svg
//                     className="sm:block hidden w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 16"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                     />
//                   </svg>
//                   <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                     <span className="font-semibold">Click to upload</span>{" "}
//                     Receipt Photo
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     PNG, JPG
//                   </p>
//                 </div>
//               </label>
//             )}
//           </div>
//         </div>


//         <div className="flex sm:flex-row  sm:justify-start my-3">
//         <label htmlFor="agree" className="font-bold">
//           I agree with all the company terms and conditions <input id="agree" name="agree" checked={formData.agree} onChange={formDataHandler} type="checkbox" />
//         </label>
        
//       </div>
           

//         {/* <button
//           className="sm:mt-5 mt-1 w-[100%] bg-indigo-600 rounded-lg text-white py-1 text-xl"
//           onClick={() => {
//             if (
//               !formData.receipt_picture ||
//               !formData.investment_amount ||
//               !formData.investment_frequency ||
//               formData.investment_amount === "Select" ||
//               formData.investment_frequency === "Select" ||
//               formData.receiptId === ""||
//               formData.agree === false
//             ) {
//               return toast.error("Please fill all fields");
//             } else {
//               submitHandler();
//               createInvestmentProfile({
//                 user_id: userId._id,
//                 project_id: id,
//                 invested_amount: formData.investment_amount,
//                 profit_earned: "0",
//                 loss: "0",
//                 investment_frequency: formData.investment_frequency,
//                 duration: formData.investment_frequency,
//                 is_active: false,
//               })
//                 .unwrap()
//                 .then((res) => {
//                   let investment_profile_id = res.data._id;
//                   createInvestments({
//                     investment_profile_id: res.data._id,
//                     duration: formData.investment_frequency,
//                     amount: formData.investment_amount,
//                     is_active: false,
//                     isSubmitted: true,
//                   })
//                     .unwrap()
//                     .then((res) => {
//                       investmentRecipt({
//                         receipt_path: formData.receipt_picture,
//                         user_id: userId._id,
//                         investment_profile_id: investment_profile_id,
//                         investment_id: res.investment._id,
//                         receipt_id:formData.receiptId,
//                         is_deleted:false
//                       })
//                         .unwrap()
//                         .then((res) => {
//                           toast.success(
//                             "Investment Profile Created Successfully"
//                           );
//                           navigate("/member/dashboard");
//                         })  
//                         .catch((error) => {
//                           toast.error(
//                             "Select the same details and attach the receipt again"
//                           );
//                           // Logic to prompt user to select the same details and attach the receipt again
//                         });
//                     })
//                     .catch((error) => {
//                       toast.error("Error creating Investments");
//                     });
//                 })
//                 .catch((error) => {
//                   toast.error("Error creating investment profile");
//                 });
//             }
//           }}
//         >
//           Submit
//         </button> */}




//         <button
//           className="sm:mt-5 mt-1 w-[100%] bg-indigo-600 rounded-lg text-white py-1 text-xl"
//           onClick={async () => {
//             await checkNetworkSpeed()
//             if (isSlowNetwork) {
//               // Show error message for slow network
//               toast.error("Your internet connection is too slow. Please try again later.");
//           } else {
//             if (
//               !formData.receipt_picture ||
//               !formData.investment_amount ||
//               !formData.investment_frequency ||
//               formData.investment_amount === "Select" ||
//               formData.investment_frequency === "Select" ||
//               formData.receiptId === ""||
//               formData.agree === false
//             ) {
//               return toast.error("Please fill all fields");
//             } else {
//               createInvestmentProfile({
//                 user_id: userId._id,
//                 project_id: id,
//                 invested_amount: formData.investment_amount,
//                 profit_earned: "0",
//                 loss: "0",
//                 investment_frequency: formData.investment_frequency,
//                 duration: formData.investment_frequency,
//                 is_active: false,
//                 receipt_path: formData.receipt_picture,
//                 receipt_id: formData.receiptId,
//                 is_deleted: false,
//                 isSubmitted:true
//           }).then((res) => {
//             console.log(res)
//             if(res.data.data){
//               toast.success("Investment Profile Created Successfully");
//               navigate("/member/dashboard");
//             }else{
//               toast.error("Error in creating investment profile")
//             }
//           })
//           .catch((error) => {
//             if (error.response && error.response.data) {
//               toast.error(error.response.data.message);
//             } else {
//               toast.error("An error occurred while processing your request.");
//             }
//           });
//             }
//           }}}
//         >
//           Submit
//         </button>



//       </div> 
//     </div>
//   );
// };

// export default AdminBankDetailsComponent;
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useAdminBankDetailsQuery,
  useCreateInvestmentsMutation,
  useCreateInvestmentProfileMutation,
  useInvestmentReciptMutation,
} from "../billingApi";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
const AdminBankDetailsComponent = ({
  id,
  onChange,
  placeholder = "Select...",
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
 
  // Options: 1,000 to 100,000 in steps of 1,000

  const options = Array.from({ length: 100 }, (_, i) => ({
    label: (i + 1) * 1000, // Corrected: Removed `${}`
    value: (i + 1) * 1000,
  }));

  // Filter options based on search input
  const filteredOptions = options.filter((opt) =>
    opt.label.toString().toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    
    // Update formData with the selected value
    setformData({
      ...formData,
      investment_amount: option.value.toString()
    });
  };

  const userId = useSelector((state) => state.user.userData);
  const { data, isLoading } = useAdminBankDetailsQuery();
  const [createInvestmentProfile, { isLoading: profileLoading }] =
    useCreateInvestmentProfileMutation();
  const [investmentRecipt, { isLoading: receiptLoading }] =
    useInvestmentReciptMutation();
  const [createInvestments, { isLoading: investmentsLoading }] =
    useCreateInvestmentsMutation();
  const navigate = useNavigate();

  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  const checkNetworkSpeed = async () => {
    try {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (connection) {
        const downlinkSpeed = connection.downlink;
        setIsSlowNetwork(downlinkSpeed < 0.25); // Assuming 0.25 Mbps as threshold for slow network (2G)
      }
    } catch (error) {
      console.error("Error while detecting network speed:", error);
    }
  };
  useEffect(() => {
    checkNetworkSpeed();
  }, []);

  const [formData, setformData] = useState({
    investment_amount: "",
    investment_frequency: "",
    receipt_picture: "",
    receiptId: "",
    agree: false,
  });
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
        toast.error("Error uploading image refresh the page");
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

  return isLoading || profileLoading || receiptLoading || investmentsLoading ? (
    <div className="flex justify-center items-center h-screen">
      <PropagateLoader color="#3B82F6" />
    </div>
  ) : (
    <div className="text-black w-[100%] text-sm bg-white sm:mb-10 mx-auto p-8  shadow-custom">
     <div className="flex sm:flex-row flex-col sm:justify-between mb-4 relative">
  <label htmlFor="investment-amount" className="font-bold">
    How much do you want to invest?
  </label>
  
  {/* Container with relative positioning for the dropdown */}
  <div className="relative w-full sm:w-64">
    {/* Selected Amount Display */}
    <div
      className="border border-gray-300 p-2 rounded-lg cursor-pointer flex justify-between items-center w-full"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{selected ? selected.label : placeholder}</span>
      <span className="text-gray-500">&#9662;</span>
    </div>
    
    {/* Dropdown List - now properly positioned below input */}
    {isOpen && (
      <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
        {/* Search Input */}
        <input
          type="text"
          value={search}
          name="investment-amount"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border-b outline-none"
          placeholder="Search..."
          autoFocus
        />
        
        {/* Dropdown Options */}
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

      <div className="flex flex-col gap-4 ">
        <div className=" ">
          <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
            <label htmlFor="investment-amount" className="font-bold">
              Investment Frequency
            </label>
            <select
              name="investment_frequency"
              onChange={formDataHandler}
              value={formData.investment_frequency}
              id="investment-amount"
              className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
            >
              <option>Select</option>
              <option value="1">Monthly</option>
              <option value="6">By Annually</option>
              <option value="12">Annually</option>
            </select>
          </div>

          <div className="overflow-auto">
            <div className="min-w-full sm:my-16 my-6">
              <div className="sm:grid grid-cols-3 gap-4 px-2 py-1 bg-gray-200">
                <div className="hidden sm:block">Bank Logo</div>
                <div className="">Bank Details</div>
                <div className="hidden sm:block sm:ml-5">Account Number</div>
              </div>
              {data.bankAccount.map((data) => (
                <div
                  key={data.account_no}
                  className="sm:grid grid-cols-2 sm:grid-cols-3 gap-4 border-b"
                >
                  <div className="px-2 py-1 font-bold hidden sm:block pt-2">
                    <img
                      src={data.bank_logo}
                      alt="not found"
                      className="w-[7rem]"
                    />
                  </div>
                  <div className="px-2 py-1">{data.bank_name}</div>
                  <div className="px-2 py-1">
                    <div className="relative w-full sm:ml-2 bg-gray-100 px-2 py-1 rounded-md text-xs sm:text-sm md:text-base">
                      <input
                        id="account-number"
                        type="text"
                        value={data.account_no}
                        readOnly
                        className="w-full bg-transparent"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(data.account_no);
                          toast.success("Copied to clipboard");
                        }}
                        className="absolute  right-0 h-[90%] w-[3rem] sm:top-0 top-[-.2rem] px-2 py-1 text-black rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 34 34"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-copy"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="my-4">
            <label
              htmlFor="receiptId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter Transaction id
            </label>
            <div className="mt-2">
              <input
                onChange={formDataHandler}
                id="receiptId"
                name="receiptId"
                type="receiptId"
                autoComplete="receiptId"
                placeholder="123456789"
                required
                className="focus:outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <label htmlFor="image-upload" className="font-bold h-[2rem]">
            Upload Receipt :
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

        <div className="flex sm:flex-row  sm:justify-start my-3">
          <label htmlFor="agree" className="font-bold">
            I agree with all the company terms and conditions{" "}
            <input
              id="agree"
              name="agree"
              checked={formData.agree}
              onChange={formDataHandler}
              type="checkbox"
            />
          </label>
        </div>

        <button
          className="sm:mt-5 mt-1 w-[100%] bg-indigo-600 rounded-lg text-white py-1 text-xl"
          onClick={async () => {
            await checkNetworkSpeed();
            if (isSlowNetwork) {
              // Show error message for slow network
              toast.error(
                "Your internet connection is too slow. Please try again later."
              );
            } else {
              if (
                !formData.receipt_picture ||
                !formData.investment_frequency ||
                !formData.investment_amount ||
                formData.investment_frequency === "Select" ||
                formData.receiptId === "" ||
                formData.agree === false
              ) {
               
                return toast.error("Please fill all the fields");
              } else {
                
                createInvestmentProfile({
                  user_id: userId._id,
                  project_id: id,
                  invested_amount: formData.investment_amount,
                  profit_earned: "0",
                  loss: "0",
                  investment_frequency: formData.investment_frequency,
                  duration: formData.investment_frequency,
                  is_active: false,
                  receipt_path: formData.receipt_picture,
                  receipt_id: formData.receiptId,
                  is_deleted: false,
                  isSubmitted: true,
                })
                  .then((res) => {
                    console.log(res);
                    if (res.data.data) {
                      toast.success("Investment Profile Created Successfully");
                      navigate("/member/dashboard");
                    } else {
                      toast.error("Error in creating investment profile");
                    }
                  })
                  .catch((error) => {
                    if (error.response && error.response.data) {
                      toast.error(error.response.data.message);
                    } else {
                      toast.error(
                        "An error occurred while processing your request."
                      );
                    }
                  });
              }
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminBankDetailsComponent;

