
import React from 'react';

const ProcessSection = () => {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center">Notre <span className="text-gradient">Approche</span></h2>
        <p className="section-subtitle text-center">
          Un processus simple et efficace pour vous offrir un site web professionnel en un temps record
        </p>
        
        <div className="relative mt-16">
          {/* Desktop process steps with connector line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-ozy text-white flex items-center justify-center text-xl font-bold mb-4 z-10">1</div>
              <h3 className="text-xl font-bold mb-2 text-center">Remplissez le formulaire</h3>
              <p className="text-center text-gray-600">Répondez à quelques questions simples sur vos besoins</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-ozy text-white flex items-center justify-center text-xl font-bold mb-4 z-10">2</div>
              <h3 className="text-xl font-bold mb-2 text-center">Validation & Paiement</h3>
              <p className="text-center text-gray-600">Nous discutons et validons votre projet ensemble</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-ozy text-white flex items-center justify-center text-xl font-bold mb-4 z-10">3</div>
              <h3 className="text-xl font-bold mb-2 text-center">Création du site</h3>
              <p className="text-center text-gray-600">Notre équipe développe votre site selon vos besoins</p>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-ozy text-white flex items-center justify-center text-xl font-bold mb-4 z-10">4</div>
              <h3 className="text-xl font-bold mb-2 text-center">Mise en ligne</h3>
              <p className="text-center text-gray-600">Votre site est prêt et en ligne en moins de 7 jours</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="#form" className="btn-blue inline-flex items-center">Commencer Maintenant</a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
