import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="bg-background-light dark:bg-background-dark min-h-screen">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/history" element={<Transactions />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
      </div>
    </Router>
  );
}

export default App;
