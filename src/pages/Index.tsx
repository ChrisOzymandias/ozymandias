
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import WebsiteForm from '../components/WebsiteForm';
import ValueProposition from '../components/ValueProposition';
import ProcessSection from '../components/ProcessSection';
import Pricing from '../components/Pricing';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import ScrollCTAPopup from '../components/ScrollCTAPopup';
import FloatingCTA from '../components/FloatingCTA';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAOS } from '@/hooks/use-aos';
import { useParallax } from '@/hooks/use-parallax';
import { preloadCriticalImages } from '@/lib/utils';

const Index = () => {
  const isMobile = useIsMobile();
  
  // Utiliser les hooks à l'intérieur du composant
  useAOS();
  useParallax();
  
  // Préchargement des images critiques pour améliorer le CLS
  useEffect(() => {
    // Précharger les images les plus importantes (logo, hero, etc.)
    preloadCriticalImages([
      '/lovable-uploads/a24f34e6-5866-4fb8-bda3-f4e10c503450.png', // Logo
      '/lovable-uploads/533761ab-ccad-46b7-abc3-6f4e5519206b.png'  // Image hero principale
    ]);
    
    // Prefetching des sections importantes
    const prefetchLinks = ['#form', '#process', '#pricing'];
    prefetchLinks.forEach(link => {
      const linkEl = document.querySelector(`a[href="${link}"]`);
      if (linkEl) {
        linkEl.setAttribute('rel', 'prefetch');
      }
    });
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Social Proof - Bandeau défilant */}
      <SocialProof />
      
      {/* Formulaire - Action principale */}
      <div data-aos="fade-up" className="section-transition">
        <WebsiteForm />
      </div>
      
      {/* Value Proposition - Pourquoi nous choisir */}
      <div className={isMobile ? "mt-[-40px] relative z-10 section-transition" : "section-transition"} data-aos="fade-up" data-aos-delay="100">
        <ValueProposition />
      </div>
      
      {/* Process Section - Comment ça marche */}
      <div data-aos="fade-up" className="section-transition">
        <ProcessSection />
      </div>
      
      {/* Pricing - Tarifs */}
      <div data-aos="fade-up" className="section-transition">
        <Pricing />
      </div>
      
      {/* FAQ Section avec Portfolio intégré - Objections */}
      <div data-aos="fade-up" className="section-transition">
        <FaqSection />
      </div>
      
      <Footer />
      
      {/* Popup CTA basée sur le scroll */}
      <ScrollCTAPopup />
      
      {/* Bulle CTA flottante */}
      <FloatingCTA />
    </div>
  );
};

export default Index;
