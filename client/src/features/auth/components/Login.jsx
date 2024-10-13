import React, { useState } from "react";
import { Link ,useNavigate  } from "react-router-dom";
import { useLoginMutation } from "../rtk";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUpFailure, signUpSuccess } from "../authSlice";
import { useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputMask from 'react-input-mask';
import PopUp from "./PopUp";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [login, { isLoading }] = useLoginMutation(); // Destructuring isLoading from useLoginMutation
  const [showPassword, setShowPassword] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleUserData = () => {
    login({
      password: formData.password,
      email: formData.email,
    })
      .then((response) => {
        console.log(response)
        if (response.data) {
          if(response.data.message === "User logged in successfully"){
          //toast.success("user logged in successfully");
          localStorage.setItem("token", response.data.data.token);
          dispatch(signUpSuccess(response.data.data));
          if(response.data.data.role === "Member") {
            navigate("/member/dashboard");
          }
          }
          if(response.data.message === "Email sent successfully"){
          toast.success(response.data.message);
           setShowPopUp(true);
           return
          }
          console.log(response.data.message)
        
          if(response.data.data.role === "Admin") {
            navigate("/Admin/receiptlist");
          }
          toast.success(response.data.message);
        } else {
          toast.error(response.error.data.message);
          dispatch(signUpFailure(response.error.data.message));
        }
      })
      .catch((error) => {
        console.log(error.message)
        console.error("Error during login:", error);
        toast.error("An error occurred during login");
        dispatch(signUpFailure({ message: "An error occurred during login" }));
      });
  };

  const formDataHandler = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    handleUserData();
  };

  return (
    <>
    <PopUp  
      show={showPopUp} 
      onClose={() => setShowPopUp(false)} 
      email={formData.email} 
      password={formData.password}
    />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-[7rem] lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={submitHandler}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
              <InputMask
                    onChange={formDataHandler}
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                <div className="text-sm">
                  <Link
                    to="/auth/forgot-password"
                    className="font-semibold text-indigo-400 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <span className="flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <input
                    className="ml-2 w-[90%] focus:outline-none"
                    onChange={formDataHandler}
                    id="password"
                    name="password"
                    type={showPassword ? "password" : "type"}
                    autoComplete="current-password"
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Logging in..." : "Log in"} {/* Show loading text */}
              </button>
            </div>
          </form>
          
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/auth/signup"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
