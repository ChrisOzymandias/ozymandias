
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

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Social Proof - Building immediate credibility (desktop only) */}
      <SocialProof />
      
      {/* Value Proposition - Core benefits */}
      <div className={isMobile ? "mt-[-40px] relative z-10" : ""}>
        <ValueProposition />
      </div>
      
      {/* Formulaire mis en avant - Primary conversion element */}
      <WebsiteForm />
      
      {/* Features - More details after basic value is established */}
      <Features />
      
      {/* Process Section - Show simplicity */}
      <ProcessSection />
      
      {/* Portfolio Carousel - Visual proof */}
      <PortfolioCarousel />
      
      {/* Testimonials - Social validation */}
      <TestimonialsSection />
      
      {/* Nouvelle section SEO pour PME et artisans */}
      <SeoSection />
      
      {/* Pricing information */}
      <Pricing />
      
      {/* FAQ Section - Address remaining objections */}
      <FaqSection />
      
      {/* CTA Section - Final conversion opportunity */}
      <CtaSection />
      
      <Footer />
    </div>
  );
};

export default Index;
