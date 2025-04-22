/**
 * Service pour gérer les appels API vers le backend
 */

// URL de base de l'API
const API_URL = 'http://localhost:4000';

/**
 * Authentification utilisateur
 */
export const login = async (credentials) => {
  // Pour la démo, on simule une authentification
  // En production, remplacer par un appel fetch réel à l'API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simuler un succès ou échec en fonction des identifiants
  if (credentials.email === 'user@example.com' && credentials.password === 'password') {
    const userData = {
      _id: 'user123',
      nom: 'Dupont',
      prenom: 'Jean',
      email: credentials.email,
      role: 'client',
      token: 'fake-jwt-token-12345'
    };
    
    // Stocker les données utilisateur dans localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'fake-jwt-token-12345');
    
    return userData;
  } else if (credentials.email === 'admin@example.com' && credentials.password === 'admin') {
    const adminData = {
      _id: 'admin456',
      nom: 'Admin',
      prenom: 'Super',
      email: credentials.email,
      role: 'admin',
      token: 'fake-admin-jwt-token-67890'
    };
    
    // Stocker les données admin dans localStorage
    localStorage.setItem('user', JSON.stringify(adminData));
    localStorage.setItem('token', 'fake-admin-jwt-token-67890');
    
    return adminData;
  } else {
    // Simuler une erreur d'authentification
    throw new Error('Identifiants incorrects');
  }
};

/**
 * Inscription utilisateur
 */
export const register = async (userData) => {
  // Pour la démo, on simule une inscription
  // En production, remplacer par un appel fetch réel à l'API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simuler un succès
  const newUser = {
    _id: 'user' + Math.floor(Math.random() * 1000),
    nom: userData.nom,
    prenom: userData.prenom,
    email: userData.email,
    role: 'client',
    token: 'fake-jwt-token-' + Math.random().toString(36).substring(2, 15)
  };
  
  // Stocker les données utilisateur dans localStorage
  localStorage.setItem('user', JSON.stringify(newUser));
  localStorage.setItem('token', newUser.token);
  
  return newUser;
};

/**
 * Déconnexion
 */
export const logout = () => {
  // Supprimer les données de session
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

/**
 * Récupérer les comptes de l'utilisateur
 */
export const getComptes = async () => {
  // Pour la démo, on retourne des données simulées
  // En production, remplacer par un appel fetch réel à l'API
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mockComptes = [
    { _id: 'compte1', nom: 'Compte courant', numeroCompte: 'FR7630001007941234567890185', solde: 1500 },
    { _id: 'compte2', nom: 'Compte épargne', numeroCompte: 'FR7630004000031234567890143', solde: 2300 }
  ];
  
  return mockComptes;
};

/**
 * Effectuer un virement entre deux comptes
 */
export const performTransfer = async (transferData) => {
  // Pour la démo, on simule un virement
  // En production, remplacer par un appel fetch réel à l'API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulation de réponse réussie
  return {
    success: true,
    message: `Virement de ${transferData.montant}€ effectué avec succès`
  };
};

/**
 * Récupérer l'historique des virements
 */
export const getVirements = async () => {
  // Pour la démo, on simule des données
  // En production, remplacer par un appel fetch réel à l'API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(now);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  const mockTransactions = [
    { 
      _id: 'tr1', 
      type: 'virement', 
      montant: 250, 
      date: '2025-04-15T10:30:00Z',
      libelle: 'Virement à Jean Dupont',
      debit: true
    },
    { 
      _id: 'tr2', 
      type: 'virement', 
      montant: 500, 
      date: '2025-04-10T08:15:00Z',
      libelle: 'Salaire Avril 2025',
      debit: false
    },
    { 
      _id: 'tr3', 
      type: 'achat', 
      montant: 120, 
      date: '2025-04-08T14:20:00Z',
      libelle: 'Achat Bitcoin',
      debit: true
    },
  ];
  
  return mockTransactions;
};

/**
 * Récupérer les cours des cryptomonnaies
 */
export const getCryptoRates = async () => {
  // Pour la démo, on simule des données
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockCryptos = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: 45000, price_change_percentage_24h: 2.5 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: 3200, price_change_percentage_24h: -1.2 },
    { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', current_price: 420, price_change_percentage_24h: 0.8 },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', current_price: 1.20, price_change_percentage_24h: -0.3 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', current_price: 98, price_change_percentage_24h: 5.7 },
  ];
  
  return mockCryptos;
};

/**
 * Acheter de la cryptomonnaie
 */
export const buyCrypto = async (buyData) => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return {
    success: true,
    message: `Achat de ${buyData.amount} ${buyData.symbol} effectué avec succès`
  };
};

/**
 * Vendre de la cryptomonnaie
 */
export const sellCrypto = async (sellData) => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return {
    success: true,
    message: `Vente de ${sellData.amount} ${sellData.symbol} effectuée avec succès`
  };
};

/**
 * Version future: implémenter les vraies requêtes API avec token d'authentification
 */
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = token;
  }
  
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }
  
  return response.json();
};