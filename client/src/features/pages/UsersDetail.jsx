// src/features/pages/UsersDetail.jsx
import React, { useState, useEffect } from 'react';
import { useGettingAllUsersQuery } from '../Admin side/ApprovingReceiptsApi';
import { useFetchInvestmentProfilesMutation } from '../dashboard/dashboardApi';
import { useGettingAllProfitsAndLossMutation } from "../billing/billingApi"; // Ensure this path is correct
import { PropagateLoader } from 'react-spinners';
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import { toast } from 'react-toastify';

const UsersDetail = () => {
  const { data, isLoading } = useGettingAllUsersQuery();
  const [users, setUsers] = useState([]);
  const [profitAndLossData, setProfitAndLossData] = useState([]);
  const [loadingProfits, setLoadingProfits] = useState(true);

  // Fetching investments for all users
  const [fetchInvestmentProfiles] = useFetchInvestmentProfilesMutation();
  const [gettingAllProfitsAndLoss] = useGettingAllProfitsAndLossMutation();

  useEffect(() => {
    if (data) {
      setUsers(data.data);
      fetchUsersInvestmentAndProfit(data.data); // Fetch both investment and profit/loss
    }
  }, [data]);

  const fetchUsersInvestmentAndProfit = async (userArray) => {
    setLoadingProfits(true); // Start loading
    const promises = userArray.map(async (user) => {
      try {
        // Fetch user's investment data
        const investmentResponse = await fetchInvestmentProfiles({ user_id: user._id }).unwrap();
        const investedAmount = investmentResponse.data.reduce(
          (total, profile) => profile.is_active ? total + profile.invested_amount : total, 0
        );

        // Fetch profit and loss data for the user
        const profitLossResponse = await gettingAllProfitsAndLoss({ user_id: user._id }).unwrap();

        return {
          id: user._id,
          fullName: user.fullName,
          investment: investedAmount || 0,
          profit: profitLossResponse.totalProfit || 0,
          loss: profitLossResponse.totalLoss || 0,
        };
      } catch (error) {
      //  toast.error("Error fetching data for user: " + user.fullName);
        return {
          id: user._id,
          fullName: user.fullName,
          investment: 0,
          profit: 0,
          loss: 0,
        };
      }
    });

    const results = await Promise.all(promises);
    setProfitAndLossData(results);
    setLoadingProfits(false); // Stop loading
  };

  return (
    <div>
      <Navbar />
      <LeftSideBar />
      <div className="xl:ml-[15rem] mt-[5.8rem] p-5">
        <h1 className="text-2xl mb-4">Users Details</h1>

        {isLoading || loadingProfits ? (
          <div className="flex justify-center items-center h-full">
            <PropagateLoader color="#3B82F6" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border">
              <thead>
                <tr className="bg-blue-100 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Investment</th>
                  <th className="py-3 px-6 text-left">Profit</th>
                  <th className="py-3 px-6 text-left">Loss</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {profitAndLossData.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">{user.id || '-'}</td>
                    <td className="py-3 px-6 text-left">{user.fullName || '-'}</td>
                    <td className="py-3 px-6 text-left">{user.investment !== undefined ? user.investment : '-'}</td>
                    <td className="py-3 px-6 text-left">{user.profit || '-'}</td>
                    <td className="py-3 px-6 text-left">{user.loss || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersDetail;
