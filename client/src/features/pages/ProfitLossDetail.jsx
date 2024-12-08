import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProfitLossByDateQuery } from '../Admin side/ApprovingReceiptsApi';
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";


const ProfitLossDetailsPage = () => {
  const { date } = useParams();
  const { data: profitLossByDate, isLoading } = useFetchProfitLossByDateQuery(date);
  const [selectedEntryDetails, setSelectedEntryDetails] = useState(null);

  useEffect(() => {
    console.log("Received data from API:", profitLossByDate);
    if (profitLossByDate) {
      setSelectedEntryDetails({
        records: profitLossByDate.records,
        date: date,
      });
    }
  }, [profitLossByDate, date]);

  return (
    <>
      <Navbar />
      <LeftSideBar />
      <div className="xl:ml-[15rem] mt-[3rem] xl:p-[5rem]">
      <div class="overflow-x-auto">
        <div className="xl:ml-[17rem] xl:w-[75%] w-[90%] mx-auto min-h-[70vh] p-5">
          <h2 className="text-2xl font-bold text-center py-5">
            Profit/Loss Details
          </h2>

          {isLoading ? (
            <p className="text-center">Loading details...</p>
          ) : selectedEntryDetails?.records?.length > 0 ? (
            <table className="min-w-full bg-white shadow-md rounded-lg border">
              <thead>
                <tr className="bg-blue-100 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">User</th>
                  <th className="py-3 px-6 text-left">Investment Amount</th>

                  <th className="py-3 px-6 text-left">Profit</th>
                  <th className="py-3 px-6 text-left">Loss</th>
                  <th className="py-3 px-6 text-left">Net Profit</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {selectedEntryDetails.records.map((record, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{record.name}</td>
                    <td className="py-3 px-6 text-left">{record.invested_amount}</td>
                    <td className="py-3 px-6 text-left">{record.profit}</td>
                    <td className="py-3 px-6 text-left">{record.loss}</td>
                    <td className="py-3 px-6 text-left">{record.netProfit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No records found for this date.</p>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default ProfitLossDetailsPage;