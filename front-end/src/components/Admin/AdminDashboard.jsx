import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import TransactionManagement from './TransactionManagement';
import AdminStats from './AdminStats';
import './Admin.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="loading-text">Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'stats':
        return <AdminStats />;
      case 'users':
        return <UserManagement />;
      case 'transactions':
        return <TransactionManagement />;
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Panneau d'administration</h1>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'stats' ? 'active' : ''} 
          onClick={() => setActiveTab('stats')}
        >
          Statistiques
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Utilisateurs
        </button>
        <button 
          className={activeTab === 'transactions' ? 'active' : ''} 
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>
      
      {renderActiveTab()}
    </div>
  );
};

export default AdminDashboard;