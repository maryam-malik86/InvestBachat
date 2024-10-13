import React, { useState } from 'react';
import { Link ,useNavigate  } from "react-router-dom";
import { useLoginMutation } from "../rtk";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUpFailure, signUpSuccess } from "../authSlice";
import { useSelector } from "react-redux";
function ForgotOtp({show, onClose, email, password}) {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [otp, setOtp] = useState(Array(6).fill('')); // Initialize OTP state as an array of 6 empty strings

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
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
              {Array(6).fill(0).map((_, index) => (
                <input
                  className="w-10 mr-2 px-2 py-2 border rounded my-6"
                  type="text"
                  maxLength="1"
                  key={index}
                  value={otp[index]}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                />
              ))}
              <button
                className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded"
                onClick={() => {
                  // Verify OTP here

                  login({
                    password: password,
                    email: email,
                    otp_value: otp.join('')
                  })
                    .then((response) => {
                      console.log(response)
                      if (response.data) {
                        localStorage.setItem("token", response.data.data.token);
                        dispatch(signUpSuccess(response.data.data));
                        if(response.data.data.role === "Member") {
                          navigate("/member/dashboard");
                          onClose();
                        }
                        if(response.data.data.role === "Admin") {
                          navigate("/Admin/receiptlist");
                          onClose();
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

                  console.log(otp.join('')); // OTP value
                //   
                    setOtp(Array(6).fill(''));
                }}
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