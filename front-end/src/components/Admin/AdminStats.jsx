import React, { useState, useEffect } from 'react';
import './Admin.css';

const AdminStats = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    usersCount: 0,
    transactionsCount: 0,
    totalVolume: 0,
    activeUsers: 0,
    pendingTransactions: 0,
    cryptoVolume: 0
  });
  const [transactionsPerDay, setTransactionsPerDay] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setStats({
        usersCount: 145,
        transactionsCount: 367,
        totalVolume: 254890,
        activeUsers: 87,
        pendingTransactions: 12,
        cryptoVolume: 43250
      });
      
      setTransactionsPerDay([
        { date: '2025-04-16', count: 42, volume: 35780 },
        { date: '2025-04-17', count: 38, volume: 29450 },
        { date: '2025-04-18', count: 45, volume: 41200 },
        { date: '2025-04-19', count: 31, volume: 22800 },
        { date: '2025-04-20', count: 29, volume: 19450 },
        { date: '2025-04-21', count: 48, volume: 42890 },
        { date: '2025-04-22', count: 51, volume: 47920 },
      ]);
      
      setTopUsers([
        { _id: 'user1', nom: 'Doe', prenom: 'John', transactionCount: 24, volume: 18750 },
        { _id: 'user2', nom: 'Smith', prenom: 'Jane', transactionCount: 19, volume: 15230 },
        { _id: 'user3', nom: 'Johnson', prenom: 'Mark', transactionCount: 16, volume: 12450 },
        { _id: 'user4', nom: 'Williams', prenom: 'Sarah', transactionCount: 14, volume: 10980 },
        { _id: 'user5', nom: 'Brown', prenom: 'Michael', transactionCount: 12, volume: 9870 },
      ]);
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="admin-stats">
      <h2>Tableau de bord administrateur</h2>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <p className="loading-text">Chargement des statistiques...</p>}
      
      {!loading && (
        <>
          <div className="stats-summary">
            <div className="stat-card">
              <h3>Utilisateurs</h3>
              <div className="stat-value">{stats.usersCount}</div>
              <div className="stat-detail">
                <span>{stats.activeUsers} actifs aujourd'hui</span>
              </div>
            </div>
            
            <div className="stat-card">
              <h3>Transactions</h3>
              <div className="stat-value">{stats.transactionsCount}</div>
              <div className="stat-detail">
                <span>{stats.pendingTransactions} en attente</span>
              </div>
            </div>
            
            <div className="stat-card">
              <h3>Volume total</h3>
              <div className="stat-value">{formatCurrency(stats.totalVolume)}</div>
              <div className="stat-detail">
                <span>Transactions bancaires</span>
              </div>
            </div>
            
            <div className="stat-card">
              <h3>Volume crypto</h3>
              <div className="stat-value">{formatCurrency(stats.cryptoVolume)}</div>
              <div className="stat-detail">
                <span>Achats et ventes</span>
              </div>
            </div>
          </div>
          
          <div className="stats-charts">
            <div className="stat-chart-container">
              <h3>Transactions des 7 derniers jours</h3>
              <div className="transactions-chart">
                {transactionsPerDay.map((day, index) => (
                  <div key={index} className="chart-day">
                    <div 
                      className="chart-bar" 
                      style={{ height: `${(day.count / 60) * 100}%` }}
                      title={`${day.count} transactions - ${formatCurrency(day.volume)}`}
                    ></div>
                    <div className="chart-date">
                      {new Date(day.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="top-users-container">
            <h3>Top 5 des utilisateurs les plus actifs</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Utilisateur</th>
                  <th>Transactions</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.prenom} {user.nom}</td>
                    <td>{user.transactionCount}</td>
                    <td>{formatCurrency(user.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminStats;