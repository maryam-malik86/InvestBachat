import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../rtk";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUpFailure, signUpSuccess } from "../authSlice";
import { useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputMask from 'react-input-mask';
export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const [forgotPassword] = useForgotPasswordMutation();
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [formData, setformData] = useState({
    email: "",
    cnicNumber: "",
    password:"",
    confirmPassword:""
  });

  const handleUserData = () => {
    forgotPassword({
      password: formData.password,
      cnicNumber: formData.cnicNumber,
      email: formData.email,
      confirmPassword: formData.confirmPassword,
    })
      .then((response) => {
        if (response) {
          console.log(response)
          navigate("/auth/login");
         
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
  function submitHandler(event) {
    event.preventDefault();
    array.push(formData);
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 p-[2rem] lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          {/* -------------------------------- */}
          <div
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
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={formDataHandler}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  autoComplete="current-password"
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
                className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  handleUserData();
                }}
              >
                Change Password
              </button>
            </div>
          </div>
          {/* -------------------------------------- */}
          
        </div>
      </div>
    </>
  );
}