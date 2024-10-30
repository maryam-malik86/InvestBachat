import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useResetPasswordMutation} from "../rtk";
import { useDispatch } from "react-redux";
import { signUpFailure, signUpSuccess } from "../authSlice";
import { useSelector } from "react-redux";
import Navbar from "../../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../../dashboard/DashboardComponents/LeftSideBar";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetPassword]= useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [showPassword3,setShowPassword3] =useState(true);
  const [formData, setformData] = useState({
    email:"",
    oldPassword: "",
    password: "",
    confirmPassword:"",
  });

  const userData = useSelector((state) => state.user.userData);
  const handleUserData = () => {
    resetPassword({
      email:formData.email,
      oldPassword:formData.oldPassword,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    })
      .then((response) => {
        if (response.data) {
          if(userData.role === "Member"){
            navigate("/member/dashboard");
          }
          // Show success toast
          toast.success(response.data.message);
        } else {
          // Show error toast
          toast.error(response.error.data.message);
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        // Show error toast
        toast.error("An error occurred during sign up");
        dispatch(
          signUpFailure({ message: "An error occurred during sign up" })
        );
      });
  };

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
  function submitHandler() {
    
    array.push(formData);
  }
  return (
    <>
    <Navbar/>
    <LeftSideBar/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6  pt-[3rem] lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
             Reset your Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div
            
            className="space-y-6"
            action="#"
            method="POST"
          >
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={formDataHandler}
                  id="email"
                  name="email"
                  type="email"
                  
                  required
                  className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              
              <div className="flex items-center justify-between">
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Old Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <span className="flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <input
                    className="ml-2 w-[90%] focus:outline-none"
                    onChange={formDataHandler}
                    id="oldPassword"
                    name="oldPassword"
                    type={showPassword3 ? "password" : "type"}
                    
                    required
                  />
                  <span onClick={() => setShowPassword3(!showPassword3)}>
                    {showPassword3 ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>
                </span>
              </div>
            </div>

            <div>
              
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <span className="flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <input
                    className="ml-2 w-[90%] focus:outline-none"
                    onChange={formDataHandler}
                    id="password"
                    name="password"
                    type={showPassword ? "password" : "type"}
                    
                    required
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <span className="flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <input
                  className="focus:outline-none ml-2 w-[90%]"
                  onChange={formDataHandler}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword2 ? "password" : "type"}
                  
                  required
                />
                <span onClick={() => setShowPassword2(!showPassword2)}>
                  {showPassword2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  if (formData.password !== formData.confirmPassword) {
                    toast.warn("Passwords do not match");
                  } else {
                    submitHandler();
                    handleUserData();
                  }
                }}
              >
                Reset Password
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
