
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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Social Proof */}
      <SocialProof />
      
      {/* Formulaire mis en avant */}
      <WebsiteForm />
      
      {/* Value Proposition */}
      <ValueProposition />
      
      <Features />
      
      {/* Process Section */}
      <ProcessSection />
      
      {/* Portfolio Carousel */}
      <PortfolioCarousel />
      
      {/* Nouvelle section SEO pour PME et artisans */}
      <SeoSection />
      
      {/* Testimonial Section */}
      <TestimonialsSection />
      
      <Pricing />
      
      {/* FAQ Section */}
      <FaqSection />
      
      {/* CTA Section */}
      <CtaSection />
      
      <Footer />
    </div>
  );
};

export default Index;
