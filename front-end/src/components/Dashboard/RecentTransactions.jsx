import React, { useEffect, useState } from 'react';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        // Pour la démo, on simule une réponse
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données de test
        const mockTransactions = [
          { 
            _id: 'tr1', 
            type: 'virement', 
            montant: 250, 
            date: '2025-04-15T10:30:00Z',
            libelle: 'Virement à Jean Dupont',
            debit: true
          },
          { 
            _id: 'tr2', 
            type: 'virement', 
            montant: 500, 
            date: '2025-04-10T08:15:00Z',
            libelle: 'Salaire Avril 2025',
            debit: false
          },
          { 
            _id: 'tr3', 
            type: 'achat', 
            montant: 120, 
            date: '2025-04-08T14:20:00Z',
            libelle: 'Achat Bitcoin',
            debit: true
          },
        ];
        
        setTransactions(mockTransactions);
      } catch (err) {
        setError('Erreur lors du chargement des transactions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="transactions-card">
      <h2>Transactions récentes</h2>
      
      {loading && <p className="loading-text">Chargement des transactions...</p>}
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && (
        <div className="transactions-list">
          {transactions.length === 0 ? (
            <p className="no-transactions">Aucune transaction récente</p>
          ) : (
            transactions.map(transaction => (
              <div key={transaction._id} className="transaction-item">
                <div className="transaction-icon">
                  {transaction.type === 'virement' ? (
                    <i className="fas fa-exchange-alt"></i>
                  ) : (
                    <i className="fas fa-coins"></i>
                  )}
                </div>
                <div className="transaction-details">
                  <div className="transaction-main">
                    <span className="transaction-name">{transaction.libelle}</span>
                    <span className={`transaction-amount ${transaction.debit ? 'debit' : 'credit'}`}>
                      {transaction.debit ? '-' : '+'}{transaction.montant}€
                    </span>
                  </div>
                  <div className="transaction-meta">
                    <span className="transaction-date">{formatDate(transaction.date)}</span>
                    <span className="transaction-type">{transaction.type === 'virement' ? 'Virement' : 'Crypto'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;