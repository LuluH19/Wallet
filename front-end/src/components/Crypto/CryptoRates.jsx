import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Crypto.css';

const CryptoRates = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        // En production, remplacez par un appel API réel, par exemple CoinGecko
        // const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10');
        
        // Pour la démo, on simule une réponse après un petit délai
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées
        const mockData = [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: 45000, price_change_percentage_24h: 2.5 },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: 3200, price_change_percentage_24h: -1.2 },
          { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', current_price: 420, price_change_percentage_24h: 0.8 },
          { id: 'cardano', name: 'Cardano', symbol: 'ADA', current_price: 1.20, price_change_percentage_24h: -0.3 },
          { id: 'solana', name: 'Solana', symbol: 'SOL', current_price: 98, price_change_percentage_24h: 5.7 },
        ];
        
        setCryptos(mockData);
      } catch (err) {
        setError('Erreur lors du chargement des données crypto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="crypto-container">
      <h1>Cours des Cryptomonnaies</h1>
      
      <div className="crypto-card">
        {loading && <p className="loading-text">Chargement des cours...</p>}
        {error && <div className="error-message">{error}</div>}
        
        {!loading && !error && (
          <>
            <div className="crypto-list">
              {cryptos.map((crypto) => (
                <div key={crypto.id} className="crypto-item">
                  <div className="crypto-info">
                    <span className="crypto-name">{crypto.name}</span>
                    <span className="crypto-symbol">{crypto.symbol}</span>
                  </div>
                  <div className="crypto-price-info">
                    <span className="crypto-price">{crypto.current_price.toLocaleString()}€</span>
                    <span className={`crypto-change ${crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                      {crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="crypto-actions">
              <Link to="/crypto/buy" className="crypto-btn buy">Acheter</Link>
              <Link to="/crypto/sell" className="crypto-btn sell">Vendre</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CryptoRates;