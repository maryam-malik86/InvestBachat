import React, { useState, useEffect } from 'react';
import { useGettingAllUsersQuery, useUpdatinguserroleMutation } from '../Admin side/ApprovingReceiptsApi';
import { PropagateLoader } from 'react-spinners';
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGettingAllUsersQuery();
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [showActive, setShowActive] = useState(true);
  const [updatinguserrole] = useUpdatinguserroleMutation();
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    refetch();
    if (data) {
      setActiveUsers(data.data.filter((user) => user.isActive));
      setInactiveUsers(data.data.filter((user) => !user.isActive));
    }
  }, [data]);

  const handleNavigate = (userId) => {
    navigate(`/admin/allusers/${userId}`);
  };

  const handleAddUser = () => {
    navigate('/auth/signup');
  };

  const handleRoleChange = (userId, newRole) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));

    updatinguserrole({
      userId: userId,
      newRole: newRole,
    })
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error('Error updating role');
      });
  };

  return (
    <div>
      <Navbar />
      <LeftSideBar />
      <div className="xl:ml-[15rem] mt-[5.8rem] p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl ">Users</h1>
          <div className="flex gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all shadow-md"
              onClick={handleAddUser}
            >
              + Add User
            </button>
            <button
              className={`px-4 py-2 text-white font-semibold ${
                showActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 hover:bg-gray-400'
              } rounded transition-all`}
              onClick={() => setShowActive(true)}
            >
              Active Users
            </button>
            <button
              className={`px-4 py-2 text-white font-semibold ${
                !showActive ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 hover:bg-gray-400'
              } rounded transition-all`}
              onClick={() => setShowActive(false)}
            >
              Inactive Users
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[full]">
            <PropagateLoader color="#3B82F6" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border">
              <thead>
                <tr className="bg-blue-100 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Full Name</th>
                  <th className="py-3 px-6 text-left">Mobile Number</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {(showActive ? activeUsers : inactiveUsers).map((user) => (
                  <tr
                    key={user._id}
                    className={`border-b border-gray-200 hover:bg-gray-50`} // No border classes here
                  >
                    <td className="py-3 px-6 text-left font-medium">{user.fullName}</td>
                    <td className="py-3 px-6 text-left">{user.mobileNumber}</td>
                    <td className="py-3 px-6 text-left">
                      <select
                        value={selectedRoles[user._id] || user.role}
                        onChange={(event) =>
                          handleRoleChange(user._id, event.target.value)
                        }
                        className="p-2 bg-gray-100 border rounded-md focus:outline-none"
                      >
                        <option value="Member">Member</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span
                        className={`py-1 px-3 rounded-full text-xs ${
                          user.isActive
                            ? 'bg-green-200 text-green-600'
                            : 'bg-red-200 text-red-600'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleNavigate(user._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all shadow-md"
                      >
                        View
                      </button>
                    </td>
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

export default AllUsers;
