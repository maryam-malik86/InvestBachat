import React, { useState, useEffect } from 'react';
import { useGettingAllReceiptsQuery, useDeleteReceiptMutation } from '../Admin side/ApprovingReceiptsApi';
import { PropagateLoader } from 'react-spinners';
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ConnectionStates } from 'mongoose';

const ReceiptsList = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGettingAllReceiptsQuery();
  const [deleteReceipt] = useDeleteReceiptMutation(); // Add the delete mutation
  const [receipts, setReceipts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReceiptId, setDeleteReceiptId] = useState(null);

  useEffect(() => {
    refetch();
    if (data) {
      setReceipts(data);
    }
  }, [data]);

  const handleNavigate = (receiptId) => {
    navigate(`/admin/receiptlist/previewreceipt/${receiptId}`);
  };

  const handleApprove = (receiptId) => {
    navigate(`/admin/chechreceipt/${receiptId}`);
  };

  const handleDelete = (receiptId) => {
    setDeleteReceiptId(receiptId);
    setShowDeleteModal(true); 
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteReceipt(deleteReceiptId).unwrap();
   toast.success(response.message); 
   setShowDeleteModal(false);
    refetch();
    } catch (error) {
      console.error("Error deleting receipt:", error); 
   if (error.data && error.data.error) {
        toast.error(error.data.error); 
      } else {
        toast.error('Failed to delete the receipt');
      }
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteModal(false); // Close modal without deleting
  };

  return (
    <div>
      <Navbar />
      <LeftSideBar />
      <div className="xl:ml-[15rem] mt-[5.8rem] p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h1 className="text-xl md:text-2xl mb-2 md:mb-0">Pending Receipts</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[full]">
            <PropagateLoader color="#3B82F6" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border">
              <thead>
                <tr className="bg-blue-100 uppercase text-xs md:text-sm leading-normal py-2 px-4">
                  <th className="py-3 md:py-3 px-4 md:px-6 text-left">User</th>
                  <th className="py-3 md:py-3 px-4 md:px-6 text-left">CNIC</th>
                  <th className="py-3 md:py-3 px-4 md:px-6 text-center">Actions</th> {/* Centered the heading */}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-xs md:text-sm font-light">
                {receipts.map((receipt) => (
                  <tr key={receipt._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-2 md:py-3 px-3 md:px-6 text-left font-medium">
                      {receipt.user_id ? receipt.user_id.fullName : 'No name available'}
                    </td>
                    <td className="py-2 md:py-3 px-3 md:px-6 text-left">
                      {receipt.user_id ? receipt.user_id.cnicNumber : 'No CNIC available'}
                    </td>
                    <td className="py-2 md:py-3 px-3 md:px-6 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded transition-all text-xs md:text-sm"
                          onClick={() => handleNavigate(receipt._id)}
                        >
                          Preview
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded transition-all text-xs md:text-sm"
                          onClick={() => handleApprove(receipt._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition-all text-xs md:text-sm"
                          onClick={() => handleDelete(receipt._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this receipt?</h3>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptsList;
