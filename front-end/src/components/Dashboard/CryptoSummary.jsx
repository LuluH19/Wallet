import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CryptoSummary = () => {
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoAssets = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const mockAssets = [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', amount: 0.05, value: 2250 },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', amount: 1.2, value: 3840 },
        ];
        
        setCryptoAssets(mockAssets);
      } catch (error) {
        console.error('Erreur lors du chargement des actifs crypto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoAssets();
  }, []);

  const totalValue = cryptoAssets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="crypto-summary-card">
      <div className="crypto-summary-header">
        <h2>Mon portefeuille crypto</h2>
        <Link to="/crypto" className="crypto-action-btn">Gérer</Link>
      </div>
      
      {loading ? (
        <p className="loading-text">Chargement du portefeuille...</p>
      ) : (
        <>
          <div className="crypto-total-value">
            <span>Valeur totale</span>
            <h3>{totalValue.toLocaleString()}€</h3>
          </div>
          
          <div className="crypto-assets-list">
            {cryptoAssets.length === 0 ? (
              <p className="no-assets">Vous ne possédez pas de cryptomonnaies</p>
            ) : (
              cryptoAssets.map(asset => (
                <div key={asset.id} className="crypto-asset-item">
                  <div className="crypto-asset-info">
                    <span className="crypto-asset-symbol">{asset.symbol}</span>
                    <span className="crypto-asset-name">{asset.name}</span>
                  </div>
                  <div className="crypto-asset-value">
                    <span className="crypto-asset-amount">{asset.amount}</span>
                    <span className="crypto-asset-price">{asset.value.toLocaleString()}€</span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="crypto-actions">
            <Link to="/crypto/buy" className="crypto-btn buy">Acheter</Link>
            <Link to="/crypto/sell" className="crypto-btn sell">Vendre</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoSummary;