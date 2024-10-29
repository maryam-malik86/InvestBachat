import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import {
  useGettingAllProjectsQuery,
  useGetAllProfitLossEntriesQuery,
  useCalculateProfitPercentageForAllUsersMutation,
  useCreateProfitLossEntryMutation,
} from "../Admin side/ApprovingReceiptsApi";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";

const ProfitLoss = () => {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]); // State to hold user details

  useEffect(() => {
    // Check network speed logic...
  }, []);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const [calculateProfitPercentageForAllUsers] = useCalculateProfitPercentageForAllUsersMutation();
  const [createProfitLossEntry] = useCreateProfitLossEntryMutation();
  const { data, isLoading, refetch } = useGettingAllProjectsQuery();
  const { data: profitLossEntry, isLoading: loading, refetch: refetching } =
    useGetAllProfitLossEntriesQuery();

  useEffect(() => {
    refetch();
    refetching();
  }, []);

  const [formData, setFormData] = useState({
    profitPercentage: "",
    projectId: "",
    totalInvestedAmount: "",
    isProfitCalculated: false,
  });

  useEffect(() => {
    if (data && formData.projectId) {
      const selectedProject = data.data.find(
        (project) => project._id === formData.projectId
      );
      setFormData((prevData) => ({
        ...prevData,
        isProfitCalculated: selectedProject
          ? selectedProject.is_profit_calculated
          : false,
      }));
    }
  }, [data, formData.projectId]);

  const formDataHandler = (event) => {
    const { name, value } = event.target;
    if (name === "projectId") {
      const selectedProject = data.data.find(
        (project) => project._id === value
      );
      const totalInvestedAmount = selectedProject
        ? selectedProject.invested_amount
        : "";

      setFormData((prevData) => ({
        ...prevData,
        projectId: value,
        totalInvestedAmount: totalInvestedAmount,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCalculateClick = () => {
    if (!formData.projectId || !formData.profitPercentage) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    handleCalculateProfit();
  };

  const handleCalculateProfit = () => {
    if (isSlowNetwork) {
      toast.error(
        "Your internet connection is too slow. Please try again later."
      );
    } else {
      const profitPercentage = parseFloat(formData.profitPercentage);
      const totalInvestedAmount = parseFloat(formData.totalInvestedAmount);
      const profitLossAmount =
        (Math.abs(profitPercentage) / 100) * totalInvestedAmount;
      const isProfit = profitPercentage >= 0;

      calculateProfitPercentageForAllUsers({
        projectId: formData.projectId,
        profitAmount: isProfit ? profitLossAmount : -profitLossAmount,
        totalInvestedAmount: totalInvestedAmount,
      })
        .then((response) => {
          if (response.data) {
            toast.success(response.data.message);
            createProfitLossEntry({
              user_id: userData._id,
              project_id: formData.projectId,
              amount: isProfit ? profitLossAmount : -profitLossAmount,
            });

            if (response.data.userDetails && response.data.userDetails.length > 0) {
              setUserDetails(response.data.userDetails);
            } else {
              toast.error("No user details found.");
            }
          } else {
            toast.error("Failed to calculate profit/loss.");
          }
        })
        .catch((error) => {
          toast.error("An error occurred. Please try again later.");
        });
    }
  };

  const getSelectedProjectName = () => {
    if (!data || !formData.projectId) return "";
    const project = data.data.find(p => p._id === formData.projectId);
    return project ? project.project_name : "";
  };


  return (
    <>
      <div>
        <Navbar />
        <LeftSideBar />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <PropagateLoader color="#3B82F6" />
          </div>
        ) : (
          <div className="xl:pl-[12rem]">
            <div className="mt-[7.6rem] xl:ml-[17rem] xl:w-[75%] w-[90%] mx-auto shadow-custom min-h-[70vh] p-5">
              <h2 className="text-bold text-2xl mx-auto w-full text-center py-10">
                Calculate Profit / Loss here
              </h2>

              <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
                <label htmlFor="investment-amount" className="font-bold">
                  Select the Project
                </label>
                <select
                  name="projectId"
                  onChange={formDataHandler}
                  value={formData.projectId}
                  id="investment-amount"
                  className="sm:ml-2 p-1 my-3 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
                >
                  <option value="">Select</option>
                  {data &&
                    data.data.map((project) => (
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
                    onChange={formDataHandler}
                    id="profitPercentage"
                    name="profitPercentage"
                    type="number"
                    autoComplete="profitPercentage"
                    required
                    className="focus:outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <button
                type="button"
                className={`flex mx-auto w-[9rem] mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  formData.isProfitCalculated && "cursor-not-allowed opacity-50"
                }`}
                disabled={isLoading || formData.isProfitCalculated}
                onClick={handleCalculateClick}
              >
                {formData.isProfitCalculated
                  ? "No Investment Yet"
                  : "Calculate Profit"}
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Confirm Calculation</h2>
          <p className="text-sm mb-6 text-left">Are you sure you want to proceed with this calculation?</p>
          <div className="mb-4 text-sm text-gray-500 text-left">
            <p className="mb-2"><strong>Project:</strong> {getSelectedProjectName()}</p>
            <p className="mb-2"><strong>Total Investment:</strong> {formData.totalInvestedAmount}</p>
            <p className="mb-2"><strong>Profit/Loss Percentage:</strong> {formData.profitPercentage}%</p>
          </div>
        
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirm}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Confirm
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* User details table */}
      <div className="xl:pl-[18rem] w-full flex justify-center mt-10 mb-10">
        <div className="w-[90%] overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="px-2 py-1 bg-gray-200 text-left">#</th>
                <th className="px-2 py-1 bg-gray-200 text-left">Name</th>
                <th className="px-2 py-1 bg-gray-200 text-left">Email</th>
                <th className="px-2 py-1 bg-gray-200 text-left">Investment</th>
                <th className="px-2 py-1 bg-gray-200 text-left">Profit</th>
                <th className="px-2 py-1 bg-gray-200 text-left">Loss</th>
                <th className="px-2 py-1 bg-gray-200 text-left">Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.length > 0 ? (
                userDetails.map((user, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-100"}>
                    <td className="px-2 py-1">{index + 1}</td>
                    <td className="px-2 py-1">{user.name}</td>
                    <td className="px-2 py-1">{user.email}</td>
                    <td className="px-2 py-1">{user.invested_amount}</td>
                    <td className="px-2 py-1">{user.profit_amount}</td>
                    <td className="px-2 py-1">{user.loss_amount}</td>
                    <td className="px-2 py-1">
                      {user.profit_amount - user.loss_amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No data to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProfitLoss;