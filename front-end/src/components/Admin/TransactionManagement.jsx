import React, { useState, useEffect } from 'react';
import './Admin.css';

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filters, setFilters] = useState({
    dateDebut: '',
    dateFin: '',
    montantMin: '',
    montantMax: '',
    statut: '',
    type: ''
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(now);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      const mockTransactions = [
        { 
          _id: 'tr1', 
          expediteur: { nom: 'Doe', prenom: 'John', compte: 'FR7630001007941234567890185' },
          destinataire: { nom: 'Smith', prenom: 'Jane', compte: 'FR7630004000031234567890143' }, 
          montant: 250, 
          description: 'Remboursement déjeuner',
          date: now.toISOString().slice(0, 10), 
          statut: 'complété',
          type: 'virement'
        },
        { 
          _id: 'tr2', 
          expediteur: { nom: 'Smith', prenom: 'Jane', compte: 'FR7630004000031234567890143' },
          destinataire: { nom: 'Doe', prenom: 'John', compte: 'FR7630001007941234567890185' }, 
          montant: 500, 
          description: 'Loyer avril',
          date: yesterday.toISOString().slice(0, 10), 
          statut: 'complété',
          type: 'virement'
        },
        { 
          _id: 'tr3', 
          expediteur: { nom: 'Johnson', prenom: 'Mark', compte: 'FR7630099999999999999999' },
          destinataire: { nom: 'Exchange', prenom: '', compte: 'EXCHANGE-BTC' }, 
          montant: 1200, 
          description: 'Achat Bitcoin',
          date: twoDaysAgo.toISOString().slice(0, 10), 
          statut: 'complété',
          type: 'achat'
        },
        { 
          _id: 'tr4', 
          expediteur: { nom: 'Exchange', prenom: '', compte: 'EXCHANGE-ETH' },
          destinataire: { nom: 'Doe', prenom: 'John', compte: 'FR7630001007941234567890185' }, 
          montant: 350, 
          description: 'Vente Ethereum',
          date: twoDaysAgo.toISOString().slice(0, 10), 
          statut: 'en attente',
          type: 'vente'
        },
      ];
      
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
    } catch (err) {
      setError('Erreur lors du chargement des transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];
    
    if (filters.dateDebut) {
      filtered = filtered.filter(t => t.date >= filters.dateDebut);
    }
    
    if (filters.dateFin) {
      filtered = filtered.filter(t => t.date <= filters.dateFin);
    }
    
    if (filters.montantMin) {
      filtered = filtered.filter(t => t.montant >= parseFloat(filters.montantMin));
    }
    
    if (filters.montantMax) {
      filtered = filtered.filter(t => t.montant <= parseFloat(filters.montantMax));
    }
    
    if (filters.statut) {
      filtered = filtered.filter(t => t.statut === filters.statut);
    }
    
    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    
    setFilteredTransactions(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const resetFilters = () => {
    setFilters({
      dateDebut: '',
      dateFin: '',
      montantMin: '',
      montantMax: '',
      statut: '',
      type: ''
    });
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseDetails = () => {
    setSelectedTransaction(null);
  };

  const approveTransaction = async (transactionId) => {
    try {
      setLoading(true);
      // Simuler approbation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mettre à jour le statut de la transaction
      const updatedTransactions = transactions.map(t => 
        t._id === transactionId ? { ...t, statut: 'complété' } : t
      );
      
      setTransactions(updatedTransactions);
    } catch (err) {
      setError('Erreur lors de l\'approbation de la transaction');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const rejectTransaction = async (transactionId) => {
    if (window.confirm('Êtes-vous sûr de vouloir rejeter cette transaction?')) {
      try {
        setLoading(true);
        // Simuler rejet
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mettre à jour le statut de la transaction
        const updatedTransactions = transactions.map(t => 
          t._id === transactionId ? { ...t, statut: 'rejeté' } : t
        );
        
        setTransactions(updatedTransactions);
      } catch (err) {
        setError('Erreur lors du rejet de la transaction');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="admin-transaction-management">
      <div className="admin-header">
        <h2>Gestion des transactions</h2>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {/* Filtres */}
      <div className="transaction-filters">
        <h3>Filtres</h3>
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="dateDebut">Date début</label>
            <input
              type="date"
              id="dateDebut"
              name="dateDebut"
              value={filters.dateDebut}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="dateFin">Date fin</label>
            <input
              type="date"
              id="dateFin"
              name="dateFin"
              value={filters.dateFin}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="montantMin">Montant min</label>
            <input
              type="number"
              id="montantMin"
              name="montantMin"
              value={filters.montantMin}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="montantMax">Montant max</label>
            <input
              type="number"
              id="montantMax"
              name="montantMax"
              value={filters.montantMax}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="statut">Statut</label>
            <select
              id="statut"
              name="statut"
              value={filters.statut}
              onChange={handleFilterChange}
            >
              <option value="">Tous</option>
              <option value="complété">Complété</option>
              <option value="en attente">En attente</option>
              <option value="rejeté">Rejeté</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Tous</option>
              <option value="virement">Virement</option>
              <option value="achat">Achat</option>
              <option value="vente">Vente</option>
            </select>
          </div>
          
          <button className="admin-btn reset" onClick={resetFilters}>
            Réinitialiser les filtres
          </button>
        </div>
      </div>
      
      {loading && <p className="loading-text">Chargement...</p>}
      
      {/* Liste des transactions */}
      {!loading && !selectedTransaction && (
        <div className="admin-table-container">
          <p>{filteredTransactions.length} transaction(s) trouvée(s)</p>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Expéditeur</th>
                <th>Destinataire</th>
                <th>Montant (€)</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <tr key={transaction._id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>
                    {transaction.expediteur.prenom} {transaction.expediteur.nom}
                    <br />
                    <small>{transaction.expediteur.compte}</small>
                  </td>
                  <td>
                    {transaction.destinataire.prenom} {transaction.destinataire.nom}
                    <br />
                    <small>{transaction.destinataire.compte}</small>
                  </td>
                  <td className="amount-cell">{transaction.montant}€</td>
                  <td>
                    <span className={`status-badge ${transaction.statut}`}>
                      {transaction.statut}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="admin-btn view" 
                      onClick={() => handleViewDetails(transaction)}
                    >
                      Détails
                    </button>
                    {transaction.statut === 'en attente' && (
                      <>
                        <button 
                          className="admin-btn approve" 
                          onClick={() => approveTransaction(transaction._id)}
                        >
                          Approuver
                        </button>
                        <button 
                          className="admin-btn reject" 
                          onClick={() => rejectTransaction(transaction._id)}
                        >
                          Rejeter
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Détails de la transaction */}
      {selectedTransaction && (
        <div className="transaction-details">
          <div className="transaction-details-header">
            <h3>Détails de la transaction</h3>
            <button className="admin-btn close" onClick={handleCloseDetails}>
              Retour à la liste
            </button>
          </div>
          
          <div className="transaction-details-content">
            <div className="transaction-detail-section">
              <h4>Informations générales</h4>
              <div className="detail-row">
                <span className="detail-label">ID Transaction:</span>
                <span className="detail-value">{selectedTransaction._id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{selectedTransaction.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{selectedTransaction.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Montant:</span>
                <span className="detail-value">{selectedTransaction.montant}€</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{selectedTransaction.description}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Statut:</span>
                <span className={`status-badge ${selectedTransaction.statut}`}>
                  {selectedTransaction.statut}
                </span>
              </div>
            </div>
            
            <div className="transaction-detail-section">
              <h4>Expéditeur</h4>
              <div className="detail-row">
                <span className="detail-label">Nom:</span>
                <span className="detail-value">
                  {selectedTransaction.expediteur.prenom} {selectedTransaction.expediteur.nom}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Compte:</span>
                <span className="detail-value">{selectedTransaction.expediteur.compte}</span>
              </div>
            </div>
            
            <div className="transaction-detail-section">
              <h4>Destinataire</h4>
              <div className="detail-row">
                <span className="detail-label">Nom:</span>
                <span className="detail-value">
                  {selectedTransaction.destinataire.prenom} {selectedTransaction.destinataire.nom}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Compte:</span>
                <span className="detail-value">{selectedTransaction.destinataire.compte}</span>
              </div>
            </div>
            
            {selectedTransaction.statut === 'en attente' && (
              <div className="transaction-actions">
                <button 
                  className="admin-btn approve large" 
                  onClick={() => approveTransaction(selectedTransaction._id)}
                >
                  Approuver cette transaction
                </button>
                <button 
                  className="admin-btn reject large" 
                  onClick={() => rejectTransaction(selectedTransaction._id)}
                >
                  Rejeter cette transaction
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;