
import React from 'react';
import { Users, Star, Award, Clock } from 'lucide-react';

const SocialProof = () => {
  return (
    <section className="py-8 bg-blue-600 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 mr-2" />
              <span className="font-bold text-2xl">700+</span>
            </div>
            <p className="text-sm">Artisans et PME accompagnés</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 mr-2" />
              <span className="font-bold text-2xl">98%</span>
            </div>
            <p className="text-sm">Taux de satisfaction client</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-6 w-6 mr-2" />
              <span className="font-bold text-2xl">5 ans</span>
            </div>
            <p className="text-sm">D'expertise web</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 mr-2" />
              <span className="font-bold text-2xl">7 jours</span>
            </div>
            <p className="text-sm">Délai de livraison moyen</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
