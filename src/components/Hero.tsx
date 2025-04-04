
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-white to-ozy-light">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Votre Site Web<br />
              <span className="text-gradient">Professionnel</span><br />
              en 7 jours
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Création de site web tout compris à partir de <span className="font-bold text-ozy">99€</span>. 
              Satisfaction garantie ou remboursé !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <a href="#form" className="btn-primary flex items-center justify-center">
                Créer Mon Site <ArrowRight size={16} className="ml-2" />
              </a>
              <a href="#process" className="btn-secondary flex items-center justify-center">
                Comment ça marche ?
              </a>
            </div>
          </div>
          
          {!isMobile && (
            <div className="md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <img 
                src="/public/lovable-uploads/533761ab-ccad-46b7-abc3-6f4e5519206b.png" 
                alt="Homme sur tablette créant son site web" 
                className="w-full h-auto max-w-md object-contain"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-ozy-light rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-ozy-light rounded-tr-full opacity-30"></div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-16 md:h-24" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V100.08C79.91,107.9,160.83,81.66,221,59.9a605.21,605.21,0,0,0,100.41-3.46Z" 
            className="fill-white"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
