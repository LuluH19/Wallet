import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Crypto.css';

const CryptoTrading = () => {
  const { action } = useParams();   
  const navigate = useNavigate();
  const [cryptos, setCryptos] = useState([]);
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [selectedCompte, setSelectedCompte] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockCryptos = [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: 45000 },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: 3200 },
          { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', current_price: 420 },
          { id: 'cardano', name: 'Cardano', symbol: 'ADA', current_price: 1.20 },
          { id: 'solana', name: 'Solana', symbol: 'SOL', current_price: 98 },
        ];
        
        const mockComptes = [
          { _id: 'compte1', nom: 'Compte courant', numeroCompte: 'FR7630001007941234567890185', solde: 1500 },
          { _id: 'compte2', nom: 'Compte épargne', numeroCompte: 'FR7630004000031234567890143', solde: 2300 }
        ];
        
        setCryptos(mockCryptos);
        setComptes(mockComptes);
      } catch (err) {
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    if (selectedCrypto && amount) {
      const crypto = cryptos.find(c => c.id === selectedCrypto);
      if (crypto) {
        const calculatedTotal = parseFloat(amount) * crypto.current_price;
        setPrice(crypto.current_price);
        setTotal(calculatedTotal);
      }
    } else {
      setTotal(0);
    }
  }, [selectedCrypto, amount, cryptos]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!selectedCrypto || !amount || !selectedCompte) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const crypto = cryptos.find(c => c.id === selectedCrypto);
      const compte = comptes.find(c => c._id === selectedCompte);
      
      if (action === 'buy' && compte.solde < total) {
        setError('Solde insuffisant pour effectuer cet achat');
        return;
      }
      
      const actionText = action === 'buy' ? 'acheté' : 'vendu';
      
      setSuccess(`Vous avez ${actionText} ${amount} ${crypto.symbol} pour un total de ${total.toFixed(2)}€`);
      setAmount('');
      setSelectedCrypto('');
      setSelectedCompte('');
    } catch (err) {
      setError(`Erreur lors de l'${action === 'buy' ? 'achat' : 'vente'}`);
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }
  
  return (
    <div className="crypto-container">
      <h1>{action === 'buy' ? 'Acheter des cryptomonnaies' : 'Vendre des cryptomonnaies'}</h1>
      
      <div className="crypto-card">
        {loading && <p className="loading-text">Chargement...</p>}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        {!loading && (
          <form onSubmit={handleSubmit} className="trading-form">
            <div className="form-group">
              <label>Cryptomonnaie</label>
              <select 
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                required
              >
                <option value="">Sélectionnez une cryptomonnaie</option>
                {cryptos.map(crypto => (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name} ({crypto.symbol}) - {crypto.current_price.toLocaleString()}€
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Compte {action === 'buy' ? 'à débiter' : 'à créditer'}</label>
              <select 
                value={selectedCompte}
                onChange={(e) => setSelectedCompte(e.target.value)}
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
              <label>Quantité</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.0001"
                step="0.0001"
                required
              />
            </div>
            
            {selectedCrypto && amount && (
              <div className="transaction-summary">
                <p>Prix unitaire: <strong>{price.toLocaleString()}€</strong></p>
                <p>Total: <strong>{total.toFixed(2)}€</strong></p>
              </div>
            )}
            
            <button type="submit" className={`trading-submit-btn ${action}`} disabled={loading}>
              {loading ? 'Traitement en cours...' : action === 'buy' ? 'Acheter' : 'Vendre'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CryptoTrading;