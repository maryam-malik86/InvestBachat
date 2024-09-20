

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function MemberRoute({ children }) {
  const { userData } = useSelector((state) => state.user);

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem('token');
  //   };
  // }, []);

  if(userData && userData.role === "Admin"){
    return <Navigate to="/admin/receiptlist" />
  }

  return userData && userData.role === 'Member' ? children : <Navigate to="/" />;
}

export default MemberRoute;
