
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-white to-ozy-light">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            {/* Attention-grabbing offer badge */}
            <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full font-bold mb-4 animate-pulse">
              OFFRE LIMITÉE - Maquette Gratuite
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Votre Site Web<br />
              <span className="text-gradient">Professionnel</span><br />
              en 7 jours
            </h1>
            
            <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Forfait tout compris avec <span className="font-bold">adresse email professionnelle</span>.
              <br className="hidden sm:block" /> 
              <span className="font-bold text-ozy">Satisfaction garantie ou remboursé !</span>
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-6 text-blue-700 max-w-lg mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="font-medium">Obtenez une <span className="font-bold">maquette gratuite</span> de votre site en 48h, sans engagement</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <a href="#form" className="btn-primary flex items-center justify-center">
                Obtenir Ma Maquette Gratuite <ArrowRight size={16} className="ml-2" />
              </a>
              <a href="#process" className="btn-secondary flex items-center justify-center">
                Comment ça marche ?
              </a>
            </div>
          </div>
          
          {!isMobile && (
            <div className="md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <div className="relative">
                <img 
                  src="/lovable-uploads/533761ab-ccad-46b7-abc3-6f4e5519206b.png" 
                  alt="Homme sur tablette créant son site web" 
                  className="w-full h-auto max-w-md object-contain relative z-10"
                  loading="lazy"
                />
                {/* Trust badge overlay */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg py-2 px-4 text-sm font-medium text-gray-800 flex items-center">
                  <span className="text-yellow-500 mr-1">★★★★★</span> 98% clients satisfaits
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-ozy-light rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-ozy-light rounded-tr-full opacity-30"></div>
      
      {/* Straight divider for smoother transition */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-white rounded-t-3xl transform translate-y-6"></div>
    </div>
  );
};

export default Hero;
