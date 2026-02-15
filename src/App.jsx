import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Portfolio from './pages/Portfolio';
import Transactions from './pages/Transactions';
import Subscriptions from './pages/Subscriptions';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './i18n';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Wrapper to protect routes
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background-dark text-primary">Cargando...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="bg-background-light dark:bg-background-dark min-h-screen">
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Private Routes */}
                  <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
                  <Route path="/history" element={<PrivateRoute><Transactions /></PrivateRoute>} />
                  <Route path="/portfolio" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
                  <Route path="/subscriptions" element={<PrivateRoute><Subscriptions /></PrivateRoute>} />
                  <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
