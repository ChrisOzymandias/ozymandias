
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const CtaSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-ozy to-ozy-dark text-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white"></div>
      </div>

      <div className="container-custom text-center relative z-10">
        {/* Badge promotion */}
        <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full font-bold mb-6 animate-pulse">
          Offre limitée - Dernières places !
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à lancer votre site web professionnel ?</h2>
        
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Rejoignez nos <span className="font-bold underline">700+ clients satisfaits</span> et obtenez une 
          <span className="bg-blue-500 text-white px-2 py-1 mx-1 rounded font-bold">maquette gratuite</span> 
          de votre futur site web en moins de 48h
        </p>
        
        <div className="max-w-xl mx-auto mb-10 grid grid-cols-2 md:grid-cols-2 gap-3 text-left">
          <div className="flex items-start">
            <Check className="h-5 w-5 mr-2 text-green-300 flex-shrink-0 mt-0.5" />
            <span>Site livré en 7 jours</span>
          </div>
          <div className="flex items-start">
            <Check className="h-5 w-5 mr-2 text-green-300 flex-shrink-0 mt-0.5" />
            <span>Optimisé pour convertir</span>
          </div>
          <div className="flex items-start">
            <Check className="h-5 w-5 mr-2 text-green-300 flex-shrink-0 mt-0.5" />
            <span>Hébergement inclus</span>
          </div>
          <div className="flex items-start">
            <Check className="h-5 w-5 mr-2 text-green-300 flex-shrink-0 mt-0.5" />
            <span>Support technique gratuit</span>
          </div>
        </div>
        
        <button 
          onClick={scrollToForm} 
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all 
                     px-8 py-4 rounded-full font-medium text-lg inline-flex items-center shadow-lg hover:shadow-xl 
                     transform hover:-translate-y-1"
        >
          Obtenir Ma Maquette Gratuite Maintenant
          <ArrowRight className="ml-2 h-5 w-5 animate-bounce-horizontal" />
        </button>
        
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center text-sm gap-4 opacity-80">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sans engagement
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Aucune carte de crédit requise
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Réponse en 48h maximum
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
