import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored user:', storedUser); 
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('Parsed user:', parsedUser); 
      console.log('User role:', parsedUser.role); 
      setUser(parsedUser);
    }
  }, [location]); 

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log('Current user state:', user);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <Link to="/">MonWallet</Link>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          {user ? (
            <>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                Tableau de bord
              </Link>
              <Link to="/transfer" className={location.pathname === '/transfer' ? 'active' : ''}>
                Virements
              </Link>
              <Link to="/crypto" className={location.pathname === '/crypto' ? 'active' : ''}>
                Cryptomonnaies
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={location.pathname.startsWith('/admin') ? 'active' : ''}>
                  Administration
                </Link>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                Connexion
              </Link>
              <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;