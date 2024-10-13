import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpFailure, signUpSuccess } from "../authSlice";
import { useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSignUpMutation } from "../rtk";
import { toast } from "react-toastify";
import InputMask from 'react-input-mask';
export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const [signUp, { isLoading }] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
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
  console.log(formData)
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
    signUp({
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      mobileNumber: formData.mobileNumber,
      cnicNumber: formData.cnicNumber,
      fullName: formData.fullName,
      fatherName: formData.fatherName,
      optionalMobileNumber: formData.optionalMobileNumber,
      gender: formData.gender,
      kinName: formData.kinName,
      kinCnic: formData.kinCnic,
      kinMobileNumber: formData.kinMobileNumber,
      kinAnotherNumber: formData.kinAnotherNumber,
      secondkinName: formData.kinName,
      secondkinCnic: formData.kinCnic,
      secondkinMobileNumber: formData.kinMobileNumber,
      secondkinAnotherNumber: formData.kinAnotherNumber,
    })
      .then((response) => {
        if (response.data) {
          // Dispatch the entire response.data object to Redux
          dispatch(signUpSuccess(response.data.data));
          if (response.data.data.role === "User") {
            navigate("/auth/login");
          }
          if (response.data.data.role === "Admin") {
            navigate("/Admin/receiptlist");
          }
          // Show success toast
          toast.success(response.data.message);
        } else {
          // Show error toast
          toast.error(response.error.data.message);
          dispatch(signUpFailure(response.error.data.message));
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

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col px-6 py-2  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Create a New Account
          </h2>
        </div>

        <div className=" mt-10 md:w-[40rem] sm:w-[80%] w-[100%]  mx-auto">
          <div className="space-y-3 " action="#" method="POST">
            <div className="md:flex md:gap-4">
              <div className="md:w-[50%] md:mb-0 mb-3">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name *
                </label>
                <div className="mt-2">
                  <input
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
                CNIC *
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

            <div className="md:flex md:gap-4">
              <div className="md:w-[50%]">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile Number *
                </label>
                <div className="mt-2">
                  <InputMask
                    onChange={formDataHandler}
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

            <div className="flex justify-center items-center gap-16">
              <div className=" flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={formDataHandler}
                />
                <label
                  htmlFor="optionalMobileNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Male
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={formDataHandler}
                />
                <label
                  htmlFor="optionalMobileNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Female
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address *
              </label>
              <div className="mt-2">
                <input
                  onChange={formDataHandler}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="md:flex md:gap-4">
              <div className="md:w-[50%] md:mb-0 mb-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password *
                  </label>
                  <div className="text-sm">
                    {/* <Link
                      to="/auth/forgot-password"
                      className="font-semibold text-indigo-400 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link> */}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <input
                      className="focus:outline-none ml-2 w-[90%]"
                      onChange={formDataHandler}
                      id="password"
                      name="password"
                      type={showPassword ? "password" : "type"}
                      autoComplete="current-password"
                      required
                      minlength="8"
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

              <div className="md:w-[50%]">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password *
                  </label>
                </div>
                <div className="mt-2">
                  <span className="flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <input
                      className="focus:outline-none ml-2 w-[90%]"
                      onChange={formDataHandler}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword2 ? "password" : "type"}
                      autoComplete="current-password"
                      required
                      minlength="8"
                    />
                    <span onClick={() => setShowPassword2(!showPassword2)}>
                      {showPassword2 ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div>
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={submitHandler}
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{" "}
            <Link
              to="/auth/login"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
