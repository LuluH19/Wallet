import React, { useState, useEffect } from 'react';
import './Transfer.css';

const Transfer = () => {
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [transferData, setTransferData] = useState({
    sourceCompte: '',
    destinataireCompte: '',
    montant: '',
    description: ''
  });

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
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

  const handleChange = (e) => {
    setTransferData({
      ...transferData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (transferData.sourceCompte === transferData.destinataireCompte) {
      setError('Vous ne pouvez pas effectuer un virement vers le même compte');
      return;
    }

    if (parseFloat(transferData.montant) <= 0) {
      setError('Le montant doit être supérieur à 0');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(`Virement de ${transferData.montant}€ effectué avec succès`);
      setTransferData({
        sourceCompte: '',
        destinataireCompte: '',
        montant: '',
        description: ''
      });
    } catch (err) {
      setError("Erreur lors de l'exécution du virement");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-container">
      <h1>Effectuer un virement</h1>
      
      <div className="transfer-card">
        {loading && <p className="loading-text">Chargement...</p>}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        {!loading && (
          <form onSubmit={handleSubmit} className="transfer-form">
            <div className="form-group">
              <label>Compte source</label>
              <select 
                name="sourceCompte"
                value={transferData.sourceCompte}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un compte</option>
                {comptes.map(compte => (
                  <option key={compte._id} value={compte._id}>
                    {compte.nom} - {compte.numeroCompte.substring(0, 4)}...{compte.numeroCompte.substring(compte.numeroCompte.length - 4)} ({compte.solde}€)
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Compte destinataire</label>
              <select 
                name="destinataireCompte"
                value={transferData.destinataireCompte}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un compte</option>
                {comptes.map(compte => (
                  <option key={compte._id} value={compte._id}>
                    {compte.nom} - {compte.numeroCompte.substring(0, 4)}...{compte.numeroCompte.substring(compte.numeroCompte.length - 4)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Montant (€)</label>
              <input
                type="number"
                name="montant"
                value={transferData.montant}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Description (optionnelle)</label>
              <textarea
                name="description"
                value={transferData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            <button type="submit" className="transfer-submit-btn" disabled={loading}>
              {loading ? 'Traitement en cours...' : 'Effectuer le virement'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Transfer;