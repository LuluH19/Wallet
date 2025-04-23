import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  const userString = localStorage.getItem('user');
  console.log("ProtectedRoute - userString:", userString);
  
  if (!userString) {
    console.log("ProtectedRoute - Pas d'utilisateur, redirection vers login");
    return <Navigate to="/login" replace />;
  }
  
  try {
    const user = JSON.parse(userString);
    console.log("ProtectedRoute - User trouvé:", user);
    
    return children;
  } catch (error) {
    console.error("ProtectedRoute - Erreur de parsing:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;