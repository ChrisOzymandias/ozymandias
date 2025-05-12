
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
import { trackLeadEvent } from './utils/pixelEvents';

function App() {
  // Use a custom component to handle the redirect based on location
  const RedirectComponent = () => {
    const location = useLocation();
    
    // Track PageView for thank you page
    React.useEffect(() => {
      if (location.pathname === '/merci' && location.state?.fromForm) {
        // Déclenche l'événement Lead quand l'utilisateur arrive sur la page de remerciement
        trackLeadEvent();
        console.log('Lead event tracked on thank you page');
      }
    }, [location]);
    
    // If we're trying to access /merci directly (without state from form), redirect to homepage
    if (location.pathname === '/merci' && !location.state?.fromForm) {
      console.log('Redirecting from /merci to / because there is no state from form');
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
