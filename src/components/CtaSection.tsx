
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-ozy to-ozy-dark text-white relative overflow-hidden">
      {/* Élément décoratif */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white"></div>
      </div>

      <div className="container-custom text-center relative z-10">
        {/* Badge promotion */}
        <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full font-bold mb-6 animate-pulse">
          Offre limitée !
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à lancer votre site web professionnel ?</h2>
        
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Rejoignez nos <span className="font-bold underline">700+ clients satisfaits</span> et obtenez une 
          <span className="bg-blue-500 text-white px-2 py-1 mx-1 rounded font-bold">maquette gratuite</span> 
          de votre futur site web en moins de 48h
        </p>
        
        <button 
          onClick={scrollToForm} 
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all 
                     px-8 py-4 rounded-full font-medium text-lg inline-flex items-center shadow-lg hover:shadow-xl 
                     transform hover:-translate-y-1"
        >
          Obtenir Ma Maquette Gratuite 
          <ArrowRight className="ml-2 h-5 w-5 animate-bounce-horizontal" />
        </button>
        
        <p className="mt-6 text-sm opacity-80">Sans engagement - Aucune carte de crédit requise</p>
      </div>
    </section>
  );
};

export default CtaSection;
