
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import WebsiteForm from '../components/WebsiteForm';
import Footer from '../components/Footer';
import SeoSection from '../components/SeoSection';
import PortfolioCarousel from '../components/PortfolioCarousel';
import ValueProposition from '../components/ValueProposition';
import ProcessSection from '../components/ProcessSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/FaqSection';
import CtaSection from '../components/CtaSection';
import SocialProof from '../components/SocialProof';
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
      
      {/* Social Proof - Building immediate credibility (desktop only) */}
      <SocialProof />
      
      {/* Formulaire mis en avant - Primary conversion element - Placé après le Social Proof */}
      <div data-aos="fade-up" className="section-transition">
        <WebsiteForm />
      </div>
      
      {/* Value Proposition - Core benefits */}
      <div className={isMobile ? "mt-[-40px] relative z-10 section-transition" : "section-transition"} data-aos="fade-up" data-aos-delay="100">
        <ValueProposition />
      </div>
      
      {/* Features - More details after basic value is established */}
      <div data-aos="fade-up" className="section-transition">
        <Features />
      </div>
      
      {/* Process Section - Show simplicity */}
      <div data-aos="fade-up" className="section-transition">
        <ProcessSection />
      </div>
      
      {/* Portfolio Carousel - Visual proof */}
      <div data-aos="fade-up" data-aos-delay="100" className="section-transition">
        <PortfolioCarousel />
      </div>
      
      {/* Testimonials - Social validation */}
      <div data-aos="fade-up" className="section-transition">
        <TestimonialsSection />
      </div>
      
      {/* Nouvelle section SEO pour PME et artisans */}
      <div data-aos="fade-up" data-aos-delay="100" className="section-transition">
        <SeoSection />
      </div>
      
      {/* Pricing information */}
      <div data-aos="fade-up" className="section-transition">
        <Pricing />
      </div>
      
      {/* FAQ Section - Address remaining objections */}
      <div data-aos="fade-up" className="section-transition">
        <FaqSection />
      </div>
      
      {/* CTA Section - Final conversion opportunity */}
      <div data-aos="fade-up" data-aos-delay="100" className="section-transition">
        <CtaSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
