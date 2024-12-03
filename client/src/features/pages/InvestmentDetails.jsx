import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import { useGettingAllProjectsQuery, useCalculateUserCapitalMutation } from "../Admin side/ApprovingReceiptsApi";
import PropagateLoader from "react-spinners/PropagateLoader";

const InvestmentDetail = () => {
  const { data, isLoading, refetch } = useGettingAllProjectsQuery();
  const [calculateUserCapital] = useCalculateUserCapitalMutation();
  const [projectCapitals, setProjectCapitals] = useState({});
  const [totalInvestment, setTotalInvestment] = useState(0);
  const navigate = useNavigate();

  // Fetch all projects on component mount
  useEffect(() => {
    refetch();
  }, []);

  // Fetch capital amount for each project
  useEffect(() => {
    const fetchProjectCapitals = async () => {
      if (data && data.data) {
        let total = 0;
        for (const project of data.data) {
          const response = await calculateUserCapital({ projectId: project._id }).unwrap();
          const projectCapital = response.userDetails.reduce(
            (acc, user) => acc + user.capital_amount,
            0
          );
          setProjectCapitals((prev) => ({ ...prev, [project._id]: projectCapital }));
          total += projectCapital;
        }
        setTotalInvestment(total);
      }
    };

    fetchProjectCapitals();
  }, [data, calculateUserCapital]);

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
              <p className="text-2xl font-semibold">{totalInvestment.toFixed(1)}</p>
            </div>

            {data &&
              data.data.map((project) => (
                <div key={project._id} className="pb-3 rounded-lg cursor-pointer">
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
                      <p className="text-sm text-indigo-600">Capital Amount</p>
                      <p className="text-lg font-semibold text-black">
                        {projectCapitals[project._id]?.toFixed(1) || "Loading..."}
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
