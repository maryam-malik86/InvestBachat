import React, { useEffect, useState, useRef } from "react";
import { useFetchInvestmentProfilesMutation } from "../dashboard/dashboardApi";
import { useSelector } from "react-redux";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useGetInvestmentProfilesByUserAndProjectMutation, useGetInvestmentsByProfileIdsMutation, useGetReceiptsByInvestmentProfileIdsMutation } from "../billing/billingApi";
import PdfDownload from "../../utils/PdfDownload";
import { toast } from "react-toastify";
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';

const StatementPage = () => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const userData = useSelector((state) => state.user.userData);
  const [fetchInvestmentProfiles] = useFetchInvestmentProfilesMutation();
  const [getInvestmentsByProfileIds] = useGetInvestmentsByProfileIdsMutation();
  const [getReceiptsByInvestmentProfileIds] = useGetReceiptsByInvestmentProfileIdsMutation();
  const [getInvestmentProfilesByUserAndProject] = useGetInvestmentProfilesByUserAndProjectMutation();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [investmentProfile, setInvestmentProfile] = useState(null);
  const [investments, setInvestments] = useState(null);
  const [receipts, setReceipts] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchInvestmentProfiles({ user_id: userData._id })
      .unwrap()
      .then((response) => {
        const activeData = response.data.filter((row) => row.is_active);
        setResult(activeData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching investment profiles:", error);
        setIsLoading(false);
      });
  }, [fetchInvestmentProfiles, userData._id]);

  const aggregateProjectData = () => {
    const aggregatedData = {};
    result.forEach((row) => {
      const projectId = row.project_id._id;
      if (!aggregatedData[projectId]) {
        aggregatedData[projectId] = {
          user_id: userData._id,
          project_id: projectId,
          project_name: row.project_id.project_name,
          invested_amount: 0,
          profit_earned: 0,
          loss: 0,
        };
      }
      aggregatedData[projectId].invested_amount += row.invested_amount;
      aggregatedData[projectId].profit_earned += row.profit_earned;
      aggregatedData[projectId].loss += row.loss;
    });
    return Object.values(aggregatedData);
  };

  return (
    <div>
      <Navbar />
      <LeftSideBar />
      <div className="xl:pl-[15rem] mt-[7.8rem]  flex flex-col mx-auto xl:w-[95%] w-[90%] min-h-[10rem]">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <PropagateLoader color="#3B82F6" />
          </div>
        ) : (
          <div className="overflow-x-auto sm:-mx-6  min-h-[85vh] lg:-mx-8">
            <div className="inline-block min-w-full  py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="xl:w-[58rem] w-[50rem]  mx-auto text-left text-sm font-light">
                  <thead className="border-b font-medium bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Project
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Invested Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {aggregateProjectData().map((project, index) => (
                      <tr
                        key={index}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 "
                      >
                        <td className="px-6 py-4 whitespace-nowrap">{project.project_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.invested_amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button onClick={async () => {
                              setInvestmentProfile(null);
                              setInvestments(null);
                              setReceipts(null);
                            getInvestmentProfilesByUserAndProject({user_id: project.user_id, project_id: project.project_id})
                              .then((response) => {
                                setInvestmentProfile(response.data.investmentProfiles);
                                getInvestmentsByProfileIds({investmentProfileIds: response.data.data})
                                  .then((response) => {
                                    setInvestments(response.data.investments);
                                  })
                                  .catch((error) => {
                                    toast.error("Error in fetching data");
                                  });
                                getReceiptsByInvestmentProfileIds({investmentProfileIds: response.data.data})
                                  .then((response) => {
                                    toast.success("Scroll down to download invoice");
                                    setReceipts(response.data);
                                  })
                                  .catch((error) => {
                                    toast.error("Error in fetching data");
                                  });
                              })
                              .catch((error) => {
                                toast.error("Error in fetching data");
                              });
                              handlePrint();
                          }}>
                            Show Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {investmentProfile && investments && receipts && <PdfDownload  investmentProfile={investmentProfile} investments={investments} receipts={receipts}/>}
      </div>
    </div>
  );
};

export default StatementPage;

