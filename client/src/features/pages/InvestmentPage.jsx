import React,{useEffect,useState} from 'react'

import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import { useGetProjectsQuery } from "../investments/MemberProjectApi";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {getLoggedInUser} from "../auth/authSlice"
import { useNavigate } from "react-router-dom";
const InvestmentPage = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  

  const { data, error, isLoading } = useGetProjectsQuery();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#3B82F6" />
      </div>
    );
  }

 

  return (
    <div>
      <div className="z-[0]">
        <Navbar />
        <LeftSideBar />
        <div className="xl:ml-[17rem] mt-[7.8rem] xl:w-[75%] w-[100vw] px-4 text-[2rem] min-h-[10rem] font-bold flex justify-center flex-wrap gap-7">
          {data && data.data.map((project) => {
            return (
              <Link to={`/member/investment/singleproject/${project._id}`}>
                <div id={project._id} className="  sm:w-[22rem]  mx-auto w-[92vw] h-[23rem] mb-3 rounded-lg  shadow-custom  p-5">
                  <div className="w-[100%] h-[14rem] overflow-hidden">
                  <img
                    className="w-[100%]  h-[14rem] object-cover transition-transform transform hover:scale-110"
                    src={project.project_picture}
                    alt=""
                  />
                  </div>
                  <p className="text-xl text-indigo-500 pb-2 text-center pt-4">
                    {project.project_name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;
