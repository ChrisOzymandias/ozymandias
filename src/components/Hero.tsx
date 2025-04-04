
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative pt-20 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-gradient-to-b from-white to-ozy-light">
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
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-ozy/10 mix-blend-overlay"></div>
                <img 
                  src="/public/lovable-uploads/82fc4126-96fc-4266-89bc-dc4e681dacd8.png" 
                  alt="Homme sur tablette créant son site web" 
                  className="w-full h-auto max-w-md object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-ozy-light rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-ozy-light rounded-tr-full opacity-30"></div>
    </div>
  );
};

export default Hero;
