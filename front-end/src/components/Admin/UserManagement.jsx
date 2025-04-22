import React, { useState, useEffect } from 'react';
import './Admin.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    role: 'client'
  });
  const [mode, setMode] = useState('list'); // 'list', 'add', 'edit'

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUsers = [
        { _id: 'user1', email: 'john@example.com', nom: 'Doe', prenom: 'John', role: 'client', status: 'actif' },
        { _id: 'user2', email: 'jane@example.com', nom: 'Smith', prenom: 'Jane', role: 'client', status: 'actif' },
        { _id: 'user3', email: 'admin@example.com', nom: 'Admin', prenom: 'Super', role: 'admin', status: 'actif' },
        { _id: 'user4', email: 'mark@example.com', nom: 'Johnson', prenom: 'Mark', role: 'client', status: 'inactif' },
      ];
      
      setUsers(mockUsers);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddUser = () => {
    setMode('add');
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      role: 'client'
    });
  };

  const handleEditUser = (user) => {
    setMode('edit');
    setSelectedUser(user);
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simuler une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === 'add') {
        // Simuler l'ajout d'un utilisateur
        const newUser = {
          _id: `user${users.length + 1}`,
          ...formData,
          status: 'actif'
        };
        setUsers([...users, newUser]);
      } else if (mode === 'edit' && selectedUser) {
        // Simuler la modification d'un utilisateur
        const updatedUsers = users.map(user => 
          user._id === selectedUser._id ? { ...user, ...formData } : user
        );
        setUsers(updatedUsers);
      }
      
      // Revenir à la liste
      setMode('list');
      setSelectedUser(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      try {
        setLoading(true);
        // Simuler une suppression
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Filtrer l'utilisateur supprimé
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      setLoading(true);
      // Simuler une mise à jour de statut
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mettre à jour le statut
      const updatedUsers = users.map(u => 
        u._id === user._id 
          ? { ...u, status: u.status === 'actif' ? 'inactif' : 'actif' } 
          : u
      );
      setUsers(updatedUsers);
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-user-management">
      <div className="admin-header">
        <h2>Gestion des utilisateurs</h2>
        {mode === 'list' && (
          <button className="admin-btn add" onClick={handleAddUser}>
            Ajouter un utilisateur
          </button>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <p className="loading-text">Chargement...</p>}
      
      {mode === 'list' && !loading && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className={user.status === 'inactif' ? 'inactive-row' : ''}>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="admin-btn edit" 
                      onClick={() => handleEditUser(user)}
                    >
                      Modifier
                    </button>
                    <button 
                      className="admin-btn status" 
                      onClick={() => handleToggleStatus(user)}
                    >
                      {user.status === 'actif' ? 'Désactiver' : 'Activer'}
                    </button>
                    <button 
                      className="admin-btn delete" 
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {(mode === 'add' || mode === 'edit') && (
        <div className="admin-form-container">
          <h3>{mode === 'add' ? 'Ajouter un utilisateur' : 'Modifier un utilisateur'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Rôle</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="client">Client</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            
            <div className="form-buttons">
              <button 
                type="button" 
                className="admin-btn cancel" 
                onClick={() => setMode('list')}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="admin-btn save"
                disabled={loading}
              >
                {loading ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;