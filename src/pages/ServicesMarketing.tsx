
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarketingHero from '../components/marketing/MarketingHero';
import ServicesGrid from '../components/marketing/ServicesGrid';
import MarketingProcessSection from '../components/marketing/MarketingProcessSection';
import SuperPackSection from '../components/marketing/SuperPackSection';
import MarketingFaqSection from '../components/marketing/MarketingFaqSection';

const ServicesMarketing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-ozy-light/20">
      <Navbar />
      <MarketingHero />
      <ServicesGrid />
      <SuperPackSection />
      <MarketingProcessSection />
      <MarketingFaqSection />
      <Footer />
    </div>
  );
};

export default ServicesMarketing;
