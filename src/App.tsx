
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import ThankYouPage from './components/ThankYouPage';
import NotFound from './pages/NotFound';
import MentionsLegales from './pages/legal/MentionsLegales';
import PolitiqueConfidentialite from './pages/legal/PolitiqueConfidentialite';
import ConditionsGenerales from './pages/legal/ConditionsGenerales';
import PolitiqueCookies from './pages/legal/PolitiqueCookies';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Requests from './pages/admin/Requests';
import Clients from './pages/admin/Clients';
import Settings from './pages/admin/Settings';
import { trackLeadEvent, trackPixelEvent } from './utils/pixelEvents';

function App() {
  // Use a custom component to handle the thank you page
  const ThankYouPageWrapper = () => {
    const location = useLocation();
    
    useEffect(() => {
      // If the user came from the form, track Lead event
      if (location.state?.fromForm) {
        trackLeadEvent();
        console.log('Lead event tracked on thank you page');
      } else {
        // For direct access, still track a PageView event
        trackPixelEvent('PageView', { page: '/merci' });
        console.log('PageView event tracked on thank you page (direct access)');
      }
    }, [location]);
    
    return <ThankYouPage />;
  };

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/merci" element={<ThankYouPageWrapper />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="/conditions-generales" element={<ConditionsGenerales />} />
      <Route path="/politique-cookies" element={<PolitiqueCookies />} />
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
