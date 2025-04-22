import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../src/components/Layout/Navbar';
import Footer from '../src/components/Layout/Footer';
import Login from '../src/components/Auth/Login';
import Register from '../src/components/Auth/Register';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Transfer from '../src/components/Dashboard/Transfer';
import CryptoRates from '../src/components/Crypto/CryptoRates';
import CryptoTrading from '../src/components/Crypto/CryptoTrading';
import AdminDashboard from '../src/components/Admin/AdminDashboard';
import ProtectedRoute from '../src/components/Auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes protégées */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/transfer" element={
              <ProtectedRoute>
                <Transfer />
              </ProtectedRoute>
            } />
            <Route path="/crypto" element={
              <ProtectedRoute>
                <CryptoRates />
              </ProtectedRoute>
            } />
            <Route path="/crypto/:action" element={
              <ProtectedRoute>
                <CryptoTrading />
              </ProtectedRoute>
            } />
            
            {/* Routes admin */}
            <Route path="/admin/*" element={
              <ProtectedRoute admin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;