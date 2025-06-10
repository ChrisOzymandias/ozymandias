
import React from 'react';
import { SectorData } from '@/data/sectorsData';

interface SectorFeaturesProps {
  sectorData: SectorData;
}

const SectorFeatures: React.FC<SectorFeaturesProps> = ({ sectorData }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center">
          Fonctionnalités spécialisées pour <span className="text-gradient">{sectorData.displayName}s</span>
        </h2>
        <p className="section-subtitle text-center">
          Votre site web adapté aux besoins spécifiques de votre métier
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {sectorData.features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl card-shadow text-center"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Fonctionnalités incluses */}
        <div className="mt-16 bg-gradient-to-r from-ozy to-ozy-dark rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Tout ce qui est inclus pour votre métier de {sectorData.displayName}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="text-green-300 mr-3">✓</span>
              <span>Design professionnel adapté à votre secteur</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-300 mr-3">✓</span>
              <span>Référencement local optimisé</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-300 mr-3">✓</span>
              <span>Formulaire de contact spécialisé</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-300 mr-3">✓</span>
              <span>Optimisation mobile parfaite</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorFeatures;
