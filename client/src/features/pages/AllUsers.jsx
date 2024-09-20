import React from 'react'
import { useGettingAllUsersQuery } from '../Admin side/ApprovingReceiptsApi';
import { PropagateLoader } from 'react-spinners';
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import {useUpdatinguserroleMutation,useUpdateUserIsActiveMutation} from '../Admin side/ApprovingReceiptsApi'
import { FaRegUser } from "react-icons/fa";
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
const AllUsers = () => {
  const navigate = useNavigate()
  const handleNavigate = (userId) => {
    
    // Replace '/admin/allusers' with the path you want to navigate to
    navigate(`/admin/allusers/${userId}`);
  };
  const [selectedRoles, setSelectedRoles] = useState({});
const [previousRoles, setPreviousRoles] = useState({});
  const {data,isLoading,refetch} = useGettingAllUsersQuery()
  const [updatinguserrole] = useUpdatinguserroleMutation()
  const [updateUserIsActive] = useUpdateUserIsActiveMutation()

  const [formData, setformData] = useState({
    userRole:""
  });
  useEffect(() => {
    refetch();
  }, []);
const formDataHandler = (selectedValue, id) => {
 
    updatinguserrole({
      userId: id,
      newRole: selectedValue
    }).unwrap().then((response) => {
      toast.success(response.message);
    });
  };

const handleRoleChange = (userId, role) => {
  setSelectedRoles(prevRoles => ({
    ...prevRoles,
    [userId]: role,
  }));
};
const toggleIsActive = (userId, currentIsActive) => {
  const confirmation = window.confirm("Are you sure you want to change the user activation?");
    if (confirmation) {
      const newIsActive = !currentIsActive; // Toggle the isActive value
      updateUserIsActive({
        id: userId,
        isActive: newIsActive
      }).unwrap().then((response) => {
        window.location.reload();
        toast.success(response.message);
      });
    }
};
  return (
    <div>
      <Navbar/>
      <LeftSideBar/>
      {
        isLoading ? (
          <div className="flex justify-center items-center h-[full]">
              <PropagateLoader color="#3B82F6" />
            </div>
        ):(
          <div className='xl:ml-[15rem] mt-[5.8rem] p-5'>
            { data &&
              data.data.map((user) => (
                // <button onClick={() => toggleIsActive(user._id, user.isActive)} key={user._id} className={`text-black w-full flex justify-between items-center p-4 border-b border-gray-200 ${user.isActive ? 'bg-indigo-400' : 'bg-red-400'}`}>
                  <button onClick={(event) => {
                    handleNavigate(user._id);
                  }}  key={user._id} className={`text-black w-full flex justify-between items-center p-4 border-b border-gray-200 ${user.isActive ? 'bg-indigo-400' : 'bg-red-400'}`}>
                  <div>
                    <p className='text-start'>{user.fullName}</p>
                    <p className='text-start'>{user.mobileNumber}</p>
                  </div>
                  <div>
                  <select
              name={`role_${user._id}`}
              onClick={(event) => event.stopPropagation()}
              onChange={(event)=>{
                handleRoleChange(user._id, event.target.value);
                formDataHandler(event.target.value, user._id );
              }}
              value={selectedRoles[user._id] || user.role}
              id="project_duration"
              className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
                    
                  </div>
                  </button>
                  // </button>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default AllUsers
