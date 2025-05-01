
import React from 'react';

const CtaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-ozy to-ozy-dark text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à lancer votre site web professionnel ?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Rejoignez nos clients satisfaits et obtenez une maquette gratuite de votre futur site web en moins de 48h
        </p>
        <a href="#form" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors px-8 py-4 rounded-full font-medium text-lg">
          Obtenir Ma Maquette Gratuite
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
