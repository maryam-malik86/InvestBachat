import React, { useState,useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import {useGetUserByIdQuery} from "../Admin side/ApprovingReceiptsApi";
import {useUpdateUserDataMutation} from "../billing/billingApi";
import { toast } from "react-toastify";
import InputMask from 'react-input-mask';
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import { useParams } from "react-router";
import { PropagateLoader } from "react-spinners";
export default function EditUserDetails() {
  const navigate = useNavigate();
    const {id} = useParams();
    const {data,isLoading,refetch} = useGetUserByIdQuery(id);
    const [updateUserData, { isLoading: isUpdating }] = useUpdateUserDataMutation();
  const [formData, setformData] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    mobileNumber: "",
    optionalMobileNumber: "",
    cnicNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    kinName: "",
    kinCnic: "",
    kinMobileNumber:"",
    kinAnotherNumber:"",
    secondkinName: "",
    secondkinCnic: "",
    secondkinMobileNumber:"",
    secondkinAnotherNumber:"",
  });
  useEffect(() => {
    if (data) {
      refetch()
        // Update formData when data changes
        setformData({
            fullName: data.data.fullName,
            fatherName: data.data.fatherName,
            email: data.data.email,
            mobileNumber: data.data.mobileNumber,
            optionalMobileNumber: data.data.optionalMobileNumber,
            cnicNumber: data.data.cnicNumber,
            kinName: data.data.kinName,
            kinCnic: data.data.kinCnic,
            kinMobileNumber:data.data.kinMobileNumber,
            kinAnotherNumber:data.data.kinMobileNumber,
            secondkinName: data.data.secondkinName,
            secondkinCnic: data.data.secondkinCnic,
            secondkinMobileNumber:data.data.secondkinMobileNumber,
            secondkinAnotherNumber:data.data.secondkinMobileNumber,
          });
    }
}, [data]);

  function formDataHandler(event) {
    setformData((prevData) => {
      const { name, value, checked, type } = event.target;
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  let array = [];
  const submitHandler = () => {
        if (formData.email === "" || formData.password === "" || formData.confirmPassword === "" || formData.mobileNumber === "" || formData.cnicNumber === "" || formData.fullName ==="")  {
          toast.error("All * Fields required")          
        }else if (formData.password.length < 8) {
          toast.warn("Password must contain at least 8 characters");
      }else if(formData.password !== formData.confirmPassword){
        toast.warn("Passwords do not match");
      }else {
          handleUserData();
        }
      };
  const handleUserData = () => {
   
  };

  return (
    <div>
      <Navbar/>
      <LeftSideBar/>
      {
        isLoading ? (
            <div className="flex justify-center items-center h-[100vh]">
              <PropagateLoader color="#3B82F6" />
            </div>
        ):(
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
                     value={formData.fullName}
                    onChange={formDataHandler}
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
                     value={formData.fatherName }
                     onChange={formDataHandler}
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
                <InputMask
                   value={formData.cnicNumber}
                   onChange={formDataHandler}
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
                  <InputMask
                     value={formData.mobileNumber }
                     onChange={formDataHandler}
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
                <InputMask
                     value={formData.optionalMobileNumber }
                     onChange={formDataHandler}
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




            <div className="flex min-h-full flex-1 flex-col mt-[5.2rem] px-6 py-2  lg:px-8">
            <div className="w-full flex justify-center">
        <div className='flex justify-center border-slate-400 rounded-full w-[9rem] border-2'>
            Kin details
            </div>
      </div>

        <div className=" mt-10 md:w-[40rem] sm:w-[80%] w-[100%]  mx-auto">
          <div className="space-y-3 " action="#" method="POST">
            <div className="md:flex md:gap-4">
              <div className="w-[100%] md:mb-0 mb-3">
                <label
                  htmlFor="kinName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name 
                </label>
                <div className="mt-2">
                  <input
                     value={formData.kinName}
                    onChange={formDataHandler}
                    id="kinName"
                    name="kinName"
                    type="text"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            
            </div>

            <div>
              <label
                htmlFor="kinCnic"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CNIC 
              </label>
              <div className="mt-2">
                <InputMask
                   value={formData.kinCnic}
                   onChange={formDataHandler}
                  id="kinCnic"
                  name="kinCnic"
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
                  htmlFor="kinMobileNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile Number 
                </label>
                <div className="mt-2">
                  <InputMask
                     value={formData.kinMobileNumber }
                     onChange={formDataHandler}
                    id="kinMobileNumber"
                    name="kinMobileNumber"
                    type="text"
                    mask="9999-9999999"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="md:w-[50%]">
                <label
                  htmlFor="kinAnotherNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Another Number
                </label>
                <div className="mt-2">
                <InputMask
                     value={formData.kinAnotherNumber }
                     onChange={formDataHandler}
                    id="kinAnotherNumber"
                    name="kinAnotherNumber"
                    type="text"
                    mask="9999-9999999"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

          

          </div>
          
        </div>
      </div>
     












            <div className="flex min-h-full flex-1 flex-col mt-[5.2rem] px-6 py-2  lg:px-8">
            <div className="w-full flex justify-center">
        <div className='flex justify-center border-slate-400 rounded-full w-[9rem] border-2'>
            Kin details
            </div>
      </div>

        <div className=" mt-10 md:w-[40rem] sm:w-[80%] w-[100%]  mx-auto">
          <div className="space-y-3 " action="#" method="POST">
            <div className="md:flex md:gap-4">
              <div className="w-[100%] md:mb-0 mb-3">
                <label
                  htmlFor="secondkinName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name 
                </label>
                <div className="mt-2">
                  <input
                     value={formData.secondkinName}
                    onChange={formDataHandler}
                    id="kinName"
                    name="secondkinName"
                    type="text"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            
            </div>

            <div>
              <label
                htmlFor="secondkinCnic"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CNIC 
              </label>
              <div className="mt-2">
                <InputMask
                   value={formData.secondkinCnic}
                   onChange={formDataHandler}
                  id="secondkinCnic"
                  name="secondkinCnic"
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
                  htmlFor="secondkinMobileNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile Number 
                </label>
                <div className="mt-2">
                  <InputMask
                     value={formData.secondkinMobileNumber }
                     onChange={formDataHandler}
                    id="secondkinMobileNumber"
                    name="secondkinMobileNumber"
                    type="text"
                    mask="9999-9999999"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="md:w-[50%]">
                <label
                  htmlFor="secondkinAnotherNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Another Number
                </label>
                <div className="mt-2">
                <InputMask
                     value={formData.secondkinAnotherNumber }
                     onChange={formDataHandler}
                    id="secondkinAnotherNumber"
                    name="secondkinAnotherNumber"
                    type="text"
                    mask="9999-9999999"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

          

          </div>
          
        </div>
      </div>
        <div className='flex w-full justify-center my-6'>
            <button
            
                type="submit"
                className="flex w-[9rem] mt-7 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={()=>{
                    updateUserData({id:id,newData:formData}).then((response)=>{
                        toast.success("User Updated Successfully")
                        navigate('/member/dashboard')
                    }).catch((error)=>{
                        toast.error("Error Updating User")
                    })
                }}
              >
                Update Profile
              </button>
            </div>















    </>
        )
      }
    </div>
  )
}
