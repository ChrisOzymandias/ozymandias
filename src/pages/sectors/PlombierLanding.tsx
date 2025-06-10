
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import SectorHero from '@/components/sectors/SectorHero';
import SectorFeatures from '@/components/sectors/SectorFeatures';
import SectorTestimonial from '@/components/sectors/SectorTestimonial';
import SectorPortfolio from '@/components/sectors/SectorPortfolio';
import WebsiteForm from '@/components/WebsiteForm';
import ProcessSection from '@/components/ProcessSection';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { sectorsData } from '@/data/sectorsData';
import { useAOS } from '@/hooks/use-aos';

const PlombierLanding = () => {
  const sectorData = sectorsData.plombier;
  useAOS();
  
  useEffect(() => {
    // Track page view for plombier landing
    console.log('Plombier landing page loaded');
  }, []);
  
  return (
    <>
      <Helmet>
        <title>{sectorData.seo.title}</title>
        <meta name="description" content={sectorData.seo.description} />
        <meta name="keywords" content={sectorData.seo.keywords.join(', ')} />
        <meta property="og:title" content={sectorData.seo.title} />
        <meta property="og:description" content={sectorData.seo.description} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        <SectorHero sectorData={sectorData} />
        <SectorFeatures sectorData={sectorData} />
        <SectorPortfolio sectorData={sectorData} />
        <SectorTestimonial sectorData={sectorData} />
        
        {/* Formulaire avec secteur pré-rempli */}
        <div data-aos="fade-up">
          <WebsiteForm defaultProfession="artisan" />
        </div>
        
        <div data-aos="fade-up">
          <ProcessSection />
        </div>
        
        <div data-aos="fade-up">
          <Pricing />
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default PlombierLanding;
