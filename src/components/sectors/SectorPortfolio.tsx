
import React from 'react';
import { SectorData } from '@/data/sectorsData';

interface SectorPortfolioProps {
  sectorData: SectorData;
}

const SectorPortfolio: React.FC<SectorPortfolioProps> = ({ sectorData }) => {
  const { portfolioExample } = sectorData;
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center">
          Exemple de site pour <span className="text-gradient">{sectorData.displayName}</span>
        </h2>
        <p className="section-subtitle text-center">
          Découvrez le type de site que nous créons pour votre métier
        </p>
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src={portfolioExample.image}
                alt={portfolioExample.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 left-4 bg-white rounded-lg px-4 py-2 shadow-md">
                <span className="text-sm font-medium text-gray-800">Site {sectorData.displayName}</span>
              </div>
            </div>
            
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{portfolioExample.title}</h3>
              <p className="text-gray-600 mb-6">{portfolioExample.description}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Responsive
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  SEO optimisé
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Formulaire contact
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Professionnel
                </span>
              </div>
              
              <a href="#form" className="btn-primary">
                Créer un site similaire gratuitement
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorPortfolio;
