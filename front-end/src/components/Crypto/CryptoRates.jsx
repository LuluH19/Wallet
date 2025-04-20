import React from 'react';

const CryptoRates = () => {
  const mockRates = [
    { name: 'Bitcoin', symbol: 'BTC', price: '45000' },
    { name: 'Ethereum', symbol: 'ETH', price: '3200' },
    { name: 'Binance Coin', symbol: 'BNB', price: '420' },
    { name: 'Cardano', symbol: 'ADA', price: '1.20' },
  ];

  return (
    <div className="crypto-container">
      <h2>Cours des Cryptomonnaies</h2>
      <div className="crypto-list">
        {mockRates.map((crypto) => (
          <div key={crypto.symbol} className="crypto-item">
            <span className="crypto-name">{crypto.name}</span>
            <span className="crypto-symbol">{crypto.symbol}</span>
            <span className="crypto-price">{crypto.price}€</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoRates;