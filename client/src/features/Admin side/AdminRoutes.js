

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function AdminRoute({ children }) {
  const { userData } = useSelector((state) => state.user);

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem('token');
  //   };
  // }, []);
  if(userData && userData.role === "Member"){
    return <Navigate to="/member/dashboard" />
  }

  return userData && userData.role === 'Admin' ? children : <Navigate to="/" />;
}

export default AdminRoute;
