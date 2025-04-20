import React, { useState } from 'react';

const Transfer = () => {
  const [transferData, setTransferData] = useState({
    recipientEmail: '',
    amount: ''
  });

  const handleTransfer = (e) => {
    e.preventDefault();
    // TODO: Implement transfer logic
    alert(`Transfert de ${transferData.amount}€ vers ${transferData.recipientEmail}`);
  };

  return (
    <div className="transfer-container">
      <h2>Effectuer un virement</h2>
      <form onSubmit={handleTransfer}>
        <div className="form-group">
          <label>Email du destinataire:</label>
          <input
            type="email"
            value={transferData.recipientEmail}
            onChange={(e) => setTransferData({...transferData, recipientEmail: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Montant (€):</label>
          <input
            type="number"
            value={transferData.amount}
            onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
            min="0"
            required
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Transfer;