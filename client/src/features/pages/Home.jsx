import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    // Check if user is logged in
    if (userData.role === "Member") {
      // If user is logged in, redirect to dashboard
      navigate("/member/dashboard");
    }
    if(userData.role === "Admin"){
      navigate("/admin/receiptlist")
    }
  }, [userData, navigate]);


  return (
    <div className="flex items-center justify-center w-screen h-screen">
      
    </div>
  );
};

export default Home;
