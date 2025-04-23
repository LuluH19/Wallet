import React, { useEffect, useState } from 'react';
import Balance from './Balance';
import RecentTransactions from './RecentTransactions';
import CryptoSummary from './CryptoSummary';
import { Navigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      console.log("Dashboard - userData from localStorage:", userData);
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        console.log("Dashboard - parsedUser:", parsedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Erreur dans Dashboard:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="loading-container">Chargement...</div>;
  }

  if (error) {
    return <div className="error-container">Erreur lors du chargement: {error}</div>;
  }

  if (!user) {
    console.log("Dashboard - Redirection vers login car user est null");
    return <Navigate to="/login" replace />;
  }

  console.log("Dashboard - Rendu du dashboard pour l'utilisateur:", user.email);
  
  return (
    <div className="dashboard-container">
      <h1>Bienvenue {user.prenom} {user.nom}</h1>
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <Balance />
          <RecentTransactions />
        </div>
        <div className="dashboard-sidebar">
          <CryptoSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;