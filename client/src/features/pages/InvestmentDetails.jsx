import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import { useGettingAllProjectsQuery } from "../Admin side/ApprovingReceiptsApi";
import PropagateLoader from "react-spinners/PropagateLoader";

const InvestmentDetail = () => {
  const { data, isLoading, refetch } = useGettingAllProjectsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const totalInvestment = data
    ? data.data.reduce((acc, project) => acc + project.invested_amount, 0)
    : 0;


  return (
    <div>
      <div className="z-[0] relative">
        <Navbar />
        <LeftSideBar className="" />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <PropagateLoader color="#3B82F6" />
          </div>
        ) : (
          <div className="xl:ml-[19rem] mt-[7.8rem] xl:w-[70%] w-[100vw] px-4 text-[2rem] min-h-[10rem] font-bold justify-center">
            <div className="total flex justify-center items-center mb-10">
              <p className="text-2xl font-semibold text-indigo-600 mr-2">
                Total Investment:
              </p>
              <p className="text-2xl font-semibold">{totalInvestment}</p>
            </div>

            {data &&
              data.data.map((project) => (
                <div 
                  key={project._id} 
                  className="pb-3 rounded-lg cursor-pointer"
                  
                >
                  <div className="flex justify-between items-center w-full mx-auto mb-2 rounded-lg bg-gray-100 border-l-indigo-400 border-l-8 p-3 shadow-sm">
                    <div className="flex items-center">
                      <img
                        className="md:w-[7rem] md:h-[6rem] w-[4rem] h-[4rem] object-cover transition-transform transform hover:scale-110"
                        src={project.project_picture}
                        alt={project.project_name}
                      />
                      <p className="text-lg text-center ml-[1rem] text-black">
                        {project.project_name}
                      </p>
                    </div>
                    <div className="invest text-right">
                      <p className="text-sm text-indigo-600">
                        Invested Amount
                      </p>
                      <p className="text-lg font-semibold text-black">
                        {project.invested_amount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentDetail;