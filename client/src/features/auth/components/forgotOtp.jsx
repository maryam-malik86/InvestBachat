import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../rtk";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUpFailure, signUpSuccess } from "../authSlice";

function ForgotOtp({ show, onClose, email, password, confirmPassword, cnicNumber }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgot, { isLoading }] = useForgotPasswordMutation();
  const [otp, setOtp] = useState(Array(6).fill('')); // Initialize OTP state as an array of 6 empty strings

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
    setOtp(newOtp);

    console.log("Updated OTP state:", newOtp); // Log the OTP to check changes

    // Focus next input
    if (element.nextSibling) {
        element.nextSibling.focus();
    }
};


  // Handle form submission
  const handleSubmit = async () => {
    // Ensure OTP is fully filled (6 digits)
    if (otp.join('').length < 6) {
      toast.error('Please fill in the complete OTP.');
      return;
    }
    const otp_value = otp.join('');  // Combine OTP array into a single string
console.log('OTP Value:', otp_value);  // Log the joined OTP value


    // Construct the request body
    const requestData = {
      email: email, 
      cnicNumber: cnicNumber, 
      password: password, 
      confirmPassword: confirmPassword,
      otp_value: otp_value, // Combine OTP array into a string
    };

    console.log("Sending this data to the backend:", requestData);

    try {
      const response = await forgot(requestData).unwrap(); // Send OTP and form data to backend
     
        toast.success(response.message);
        onClose();
        navigate("/auth/login");

        // localStorage.setItem("token", response.data.token); // Store the token in local storage
        //  dispatch(signUpSuccess(response.data)); // Update state with successful login
      
        
        //   navigate("/loginPage");
      

        // onClose(); // Close the OTP popup
        // toast.success(response.message); // Show success message
  
    } catch (error) {
      toast.error(error.data?.message || 'Error submitting OTP'); // Show error message
      dispatch(signUpFailure(error.data?.message || 'Error submitting OTP')); // Dispatch failure
    }

    // setOtp(Array(6).fill('')); // Reset OTP after submission
  };

  return (
    <div className="App">
      {show && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded shadow-lg w-[25rem]">
            <div className="px-4 py-2 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Enter OTP</h2>
            </div>
            <hr />
            <div className="p-4">
              {/* Render 6 OTP input fields */}
              {Array(6).fill(0).map((_, index) => (
                <input
                  className="w-10 mr-2 px-2 py-2 border rounded my-6"
                  type="text"
                  maxLength="1"
                  key={index}
                  value={otp[index]}  // Bind the OTP value
                  onChange={(e) => handleChange(e.target, index)}  // Handle changes
                  onFocus={(e) => e.target.select()}  // Focus the field
                />
              ))}
              <button
                className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded"
                onClick={handleSubmit} // Handle OTP submission
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotOtp;
