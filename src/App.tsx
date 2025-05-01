
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ThankYouPage from './components/ThankYouPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/merci" element={<ThankYouPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
