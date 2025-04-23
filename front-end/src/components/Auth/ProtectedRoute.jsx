import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Récupérer l'utilisateur depuis le localStorage
  const userString = localStorage.getItem('user');
  console.log("ProtectedRoute - userString:", userString);
  
  // Vérifier si l'utilisateur existe
  if (!userString) {
    console.log("ProtectedRoute - Pas d'utilisateur, redirection vers login");
    return <Navigate to="/login" replace />;
  }
  
  // Essayer de parser l'utilisateur
  try {
    const user = JSON.parse(userString);
    console.log("ProtectedRoute - User trouvé:", user);
    
    // Si tout est bon, afficher les enfants (le dashboard)
    return children;
  } catch (error) {
    console.error("ProtectedRoute - Erreur de parsing:", error);
    // En cas d'erreur de parsing, rediriger vers login
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;