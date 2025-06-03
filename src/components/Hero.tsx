
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useParallax } from '@/hooks/use-parallax';

const Hero = () => {
  const isMobile = useIsMobile();
  useParallax(); // Initialiser l'effet de parallaxe
  
  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-white to-ozy-light parallax-container">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            {/* Attention-grabbing offer badge */}
            <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full font-bold mb-4 animate-pulse" data-aos="fade-right" data-aos-delay="100">
              OFFRE LIMITÉE - Maquette Gratuite
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200">
              Votre Site Web<br />
              <span className="text-gradient">Professionnel</span><br />
              en 7 jours
            </h1>
            
            <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0" data-aos="fade-up" data-aos-delay="300">
              Forfait tout compris pour seulement 99€ : <span className="font-bold">hébergement, domaine, maintenance et email professionnel</span>.
              <br className="hidden sm:block" /> 
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-6 text-blue-700 max-w-lg mx-auto md:mx-0" data-aos="fade-up" data-aos-delay="400">
              <p className="font-medium">Obtenez une <span className="font-bold">maquette gratuite</span> de votre site en 48h, sans engagement</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start" data-aos="fade-up" data-aos-delay="500">
              <a href="#form" className="btn-primary flex items-center justify-center micro-bounce">
                Obtenir Ma Maquette Gratuite <ArrowRight size={16} className="ml-2" />
              </a>
              <a href="#process" className="btn-secondary flex items-center justify-center hover-float">
                Comment ça marche ?
              </a>
            </div>
          </div>
          
          {!isMobile && (
            <div className="md:w-1/2 flex justify-center" data-aos="fade-left" data-aos-delay="300">
              <div className="relative">
                <img 
                  src="/lovable-uploads/533761ab-ccad-46b7-abc3-6f4e5519206b.png" 
                  alt="Homme sur tablette créant son site web" 
                  className="w-full h-auto max-w-md object-contain relative z-10 parallax" 
                  loading="lazy"
                  data-speed="-0.1"
                />
                {/* Trust badge overlay */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg py-2 px-4 text-sm font-medium text-gray-800 flex items-center hover-float" data-aos="zoom-in" data-aos-delay="600">
                  <span className="text-yellow-500 mr-1">★★★★★</span> 98% clients satisfaits
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Éléments décoratifs avec effet de parallaxe */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-40 parallax" data-speed="0.2"></div>
      <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-ozy-light opacity-50 parallax" data-speed="0.15"></div>
    </div>
  );
};

export default Hero;
