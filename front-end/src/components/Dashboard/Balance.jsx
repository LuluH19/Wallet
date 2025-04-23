import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Balance = () => {
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        setLoading(true);
        // Pour la démo, on simule une réponse
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Données de test
        const mockComptes = [
          { _id: 'compte1', nom: 'Compte courant', numeroCompte: 'FR7630001007941234567890185', solde: 1500 },
          { _id: 'compte2', nom: 'Compte épargne', numeroCompte: 'FR7630004000031234567890143', solde: 2300 }
        ];
        
        setComptes(mockComptes);
      } catch (err) {
        setError('Erreur lors du chargement des comptes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComptes();
  }, []);

  const totalBalance = comptes.reduce((sum, compte) => sum + compte.solde, 0);

  return (
    <div className="balance-card">
      <div className="balance-header">
        <h2>Mes comptes</h2>
        <Link to="/transfer" className="balance-action-btn">Virement</Link>
      </div>
      
      {loading && <p className="loading-text">Chargement des comptes...</p>}
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && (
        <>
          <div className="total-balance">
            <span>Solde total</span>
            <h3>{totalBalance.toLocaleString()}€</h3>
          </div>
          
          <div className="accounts-list">
            {comptes.map(compte => (
              <div key={compte._id} className="account-item">
                <div className="account-info">
                  <span className="account-name">{compte.nom}</span>
                  <span className="account-number">{compte.numeroCompte.substring(0, 4)}...{compte.numeroCompte.substring(compte.numeroCompte.length - 4)}</span>
                </div>
                <span className="account-balance">{compte.solde.toLocaleString()}€</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Balance;