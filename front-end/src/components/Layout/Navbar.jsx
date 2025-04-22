import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MonWallet</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard">Tableau de bord</Link>
            <Link to="/transfer">Virements</Link>
            <Link to="/crypto">Cryptomonnaies</Link>
            {user.role === 'admin' && (
              <Link to="/admin">Administration</Link>
            )}
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;