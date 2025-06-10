
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectorData } from '@/data/sectorsData';

interface SectorHeroProps {
  sectorData: SectorData;
}

const SectorHero: React.FC<SectorHeroProps> = ({ sectorData }) => {
  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-white to-ozy-light">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            {/* Badge sectoriel */}
            <div className="inline-block bg-ozy text-white px-4 py-1 rounded-full font-bold mb-4" data-aos="fade-right" data-aos-delay="100">
              {sectorData.icon} {sectorData.displayName}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200">
              {sectorData.title}<br />
              <span className="text-gradient">100% Gratuit</span>
            </h1>
            
            <p className="text-lg text-gray-700 mb-6 max-w-lg mx-auto md:mx-0" data-aos="fade-up" data-aos-delay="300">
              {sectorData.description}
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 text-green-700 max-w-lg mx-auto md:mx-0" data-aos="fade-up" data-aos-delay="400">
              <p className="font-medium">
                <span className="font-bold">Création 100% gratuite</span> puis seulement 49€/mois tout compris
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start" data-aos="fade-up" data-aos-delay="500">
              <a href="#form" className="btn-primary flex items-center justify-center">
                Créer Mon Site {sectorData.displayName} <ArrowRight size={16} className="ml-2" />
              </a>
              <a href="#process" className="btn-secondary flex items-center justify-center">
                Voir un exemple
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center" data-aos="fade-left" data-aos-delay="300">
            <div className="relative">
              <img 
                src={sectorData.heroImage}
                alt={`Site web ${sectorData.displayName}`}
                className="w-full h-auto max-w-md object-contain relative z-10"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg py-2 px-4 text-sm font-medium text-gray-800 flex items-center" data-aos="zoom-in" data-aos-delay="600">
                <span className="text-yellow-500 mr-1">★★★★★</span> Spécialisé {sectorData.displayName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorHero;
