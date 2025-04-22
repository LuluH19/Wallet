import React, { useEffect, useState } from 'react';
import Balance from './Balance';
import RecentTransactions from './RecentTransactions';
import CryptoSummary from './CryptoSummary';
import { Navigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-container">
      <h1>Bienvenue, {user.prenom} !</h1>
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