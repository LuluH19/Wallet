import React from 'react';

const Balance = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="balance-container">
      <h2>Mon Solde</h2>
      <div className="balance-amount">
        <span>{user?.balance || 0} €</span>
      </div>
    </div>
  );
};

export default Balance;