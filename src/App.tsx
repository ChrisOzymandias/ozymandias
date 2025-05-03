
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import ThankYouPage from './components/ThankYouPage';
import NotFound from './pages/NotFound';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Requests from './pages/admin/Requests';
import Clients from './pages/admin/Clients';
import Settings from './pages/admin/Settings';

function App() {
  // Use a custom component to handle the redirect based on location
  const RedirectComponent = () => {
    const location = useLocation();
    
    // If we're trying to access /merci directly, redirect to homepage
    if (location.pathname === '/merci' && !location.state?.fromForm) {
      return <Navigate to="/" />;
    }
    
    return <ThankYouPage />;
  };

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/merci" element={<RedirectComponent />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="requests" element={<Requests />} />
        <Route path="clients" element={<Clients />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
