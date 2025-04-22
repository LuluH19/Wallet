import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, admin = false }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (admin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default ProtectedRoute;