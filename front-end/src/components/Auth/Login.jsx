import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      setLoading(true);
      // Pour la démo, on simule une connexion
      // En production, utilisez le service login
      // const userData = await login(formData);
      
      // Simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = {
        id: '123',
        email: formData.email,
        nom: 'Doe',
        prenom: 'John',
        role: formData.email.includes('admin') ? 'admin' : 'client',
        token: 'fake-jwt-token'
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      
      navigate('/dashboard');
    } catch (err) {
      setError('Identifiants incorrects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Connexion</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;