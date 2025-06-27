
import React from 'react';
import { Star } from 'lucide-react';

const MarketingHero = () => {
  return (
    <section className="pt-24 pb-16">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Boostez votre <span className="text-gradient">présence en ligne</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Services marketing avancés pour maximiser la visibilité et l'impact de votre site web
          </p>
          <div className="flex items-center justify-center space-x-2 text-ozy">
            <Star className="fill-current" size={20} />
            <span className="font-medium">Pour les clients ayant déjà leur site Ozymandias</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingHero;
