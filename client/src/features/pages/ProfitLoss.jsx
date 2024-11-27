import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import {
  useGettingAllProjectsQuery,
  useFetchProfitLossByDateQuery,
  useGetAllProfitLossEntriesQuery,
  useCalculateProfitPercentageForAllUsersMutation,
  useCreateProfitLossEntryMutation,
} from "../Admin side/ApprovingReceiptsApi";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const ProfitLoss = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEntryDetails, setSelectedEntryDetails] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [formData, setFormData] = useState({
    profitPercentage: "",
    projectId: "",
    totalInvestedAmount: "",
    isProfitCalculated: false,
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  // RTK Queries and Mutations
  const {
    data: projects,
    isLoading: projectsLoading,
    refetch: refetchProjects,
  } = useGettingAllProjectsQuery();
  const { data: profitLossEntries, refetch: refetchEntries } =
    useGetAllProfitLossEntriesQuery();
  const { data: profitLossByDate, isLoading: profitLossLoading } =
    useFetchProfitLossByDateQuery(selectedDate, {
      skip: !selectedDate, // Skip fetch if no date is selected
    });
  const [calculateProfitPercentageForAllUsers] =
    useCalculateProfitPercentageForAllUsersMutation();
  const [createProfitLossEntry] = useCreateProfitLossEntryMutation();

  useEffect(() => {
    refetchProjects();
    refetchEntries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "projectId") {
      const selectedProject = projects?.data?.find(
        (project) => project._id === value
      );
      setFormData((prev) => ({
        ...prev,
        projectId: value,
        totalInvestedAmount: selectedProject?.invested_amount || "",
        isProfitCalculated: selectedProject?.is_profit_calculated || false,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCalculateClick = () => {
    if (!formData.projectId || !formData.profitPercentage) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmCalculation = async () => {
    setIsModalOpen(false);

    const profitPercentage = parseFloat(formData.profitPercentage);
    const totalInvestedAmount = parseFloat(formData.totalInvestedAmount);
    const profitLossAmount =
      (Math.abs(profitPercentage) / 100) * totalInvestedAmount;
    const isProfit = profitPercentage >= 0;

    try {
      // First, create the profit/loss entry
      const createdEntryResponse = await createProfitLossEntry({
        user_id: userData._id,
        project_id: formData.projectId,
        amount: isProfit ? profitLossAmount : -profitLossAmount,
      });

      console.log("Created Profit Loss Entry Response:", createdEntryResponse);

      if (createdEntryResponse?.data) {
        const profitLossEntryId = createdEntryResponse.data.data._id;
        console.log("ProfitLossEntryId:", profitLossEntryId);

        // Then, calculate profit percentage for all users
        const response = await calculateProfitPercentageForAllUsers({
          projectId: formData.projectId,
          profitAmount: isProfit ? profitLossAmount : -profitLossAmount,
          totalInvestedAmount,
          profit_loss_entry_id: profitLossEntryId,
        });

        console.log("Profit Percentage Calculation Response:", response);

        if (response?.data) {
          toast.success("Profit/loss calculated successfully!");
          refetchEntries();
        } else {
          toast.error("Failed to calculate profit/loss.");
        }
      } else {
        toast.error("Failed to create profit/loss entry.");
      }
    } catch (error) {
      console.error("Error in handleConfirmCalculation:", error);
      toast.error("An error occurred during calculation.");
    }
  };
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  };

  const handleViewDetails = (entry) => {
    navigate(`/admin/setprofitloss/details/${entry._id}`);
  };

  useEffect(() => {
    console.log("profitLossByDate:", profitLossByDate);
    if (profitLossByDate) {
      setSelectedEntryDetails({
        records: profitLossByDate.records,
        date: selectedDate,
      });
    }
  }, [profitLossByDate, selectedDate]);

  return (
    <>
      <Navbar />
      <LeftSideBar />

      {projectsLoading ? (
        <div className="flex justify-center items-center h-screen">
          <PropagateLoader color="#3B82F6" />
        </div>
      ) : (
        <div>
          <div className="xl:pl-[12rem]">
            <div className="mt-[7.6rem] xl:ml-[17rem] xl:w-[75%] w-[90%] mx-auto shadow-custom min-h-[70vh] p-5">
              <h2 className="text-2xl font-bold text-center py-5">
                Profit/Loss Calculation
              </h2>

              <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
                <label htmlFor="investment-amount" className="font-bold">
                  Select the Project
                </label>
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleInputChange}
                  className="sm:ml-2 p-2 rounded-md bg-slate-100"
                >
                  <option value="">Select</option>
                  {projects?.data?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.project_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="my-4">
                <label
                  htmlFor="profitPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Profit / Loss Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="profitPercentage"
                    value={formData.profitPercentage}
                    onChange={handleInputChange}
                    className="focus:outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter percentage"
                  />
                </div>
              </div>

              <button
                className={`flex mx-auto w-[11rem] mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  formData.isProfitCalculated && "cursor-not-allowed opacity-50"
                }`}
                onClick={handleCalculateClick}
              >
                Calculate Profit/Loss
              </button>
            </div>
          </div>

          {/* Modal for Confirmation */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Confirmation Modal"
            className="Modal"
            overlayClassName="Overlay"
          >
            <h2 className="text-lg font-bold mb-4">Confirm Calculation</h2>
            <p>
              Are you sure you want to calculate profit/loss for this project?
            </p>
            <div className="mb-4 text-sm text-gray-500 text-left">
              <p className="mb-2">
                <strong>Total Investment:</strong>{" "}
                {formData.totalInvestedAmount}
              </p>
              <p className="mb-2">
                <strong>Profit/Loss Percentage:</strong>{" "}
                {formData.profitPercentage}%
              </p>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                onClick={handleConfirmCalculation}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>

          {/* Table of Profit/Loss Entries */}
          <div className="xl:ml-[15rem] mt-[2rem] xl:p-[5rem] p-4">
          <div class="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border">
              <thead>
                <tr className="bg-blue-100 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">Project</th>
                  <th class="py-3 px-6 text-left">Amount</th>
                  <th class="py-3 px-6 text-left">Date</th>
                  <th class="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {profitLossEntries?.entries
                  ?.slice()
                  .reverse()
                  .map((entry) => (
                    <tr
                      key={entry._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-6 text-left font-medium">
                        {entry.project_id?.project_name}
                      </td>
                      <td className="py-3 px-6 text-left font-medium">
                        {entry.amount}
                      </td>
                      <td className="py-3 px-6 text-left font-medium">
                        {formatDateTime(entry.createdAt)}
                      </td>
                      <td className="py-2 md:py-3 px-3 md:px-6 text-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-3 md:py-2 md:px-4 rounded transition-all shadow-md text-xs md:text-base"
                          onClick={() => handleViewDetails(entry)}
                        >
                          View
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
    </>
  );
};

export default ProfitLoss;
