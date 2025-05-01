
import React from 'react';

const CtaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-ozy to-ozy-dark text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à lancer votre site web professionnel ?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Rejoignez nos clients satisfaits et obtenez un site web optimisé en moins de 7 jours
        </p>
        <a href="#form" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors px-8 py-4 rounded-full font-medium text-lg">
          Créer Mon Site Maintenant
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
