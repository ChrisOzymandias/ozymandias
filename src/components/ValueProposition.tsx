
import { Clock, Award, ShieldCheck, Gift } from 'lucide-react';

const ValueProposition = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-ozy-light">
      <div className="container-custom">
        <h2 className="section-title text-center mb-6">Pourquoi <span className="text-gradient">Nous Choisir</span> ?</h2>
        <p className="section-subtitle text-center">
          Une offre révolutionnaire : création gratuite et maintenance tout inclus pour seulement 49€/mois
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="p-4 bg-green-50 rounded-full mb-4 border-2 border-green-100 hover-float hover-glow">
              <Gift className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Création 100% Gratuite</h3>
            <p className="text-gray-600">Votre site web professionnel créé sans aucun frais initial. Nous prenons le risque pour vous !</p>
            <div className="mt-4 bg-green-50 w-full py-2 px-3 rounded-lg transition-all duration-300 hover:bg-green-100">
              <span className="font-medium text-green-700 text-sm">✓ Aucun frais de création</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg" data-aos="fade-up" data-aos-delay="100">
            <div className="p-4 bg-blue-50 rounded-full mb-4 border-2 border-blue-100 hover-float hover-glow">
              <Clock className="h-10 w-10 text-ozy" />
            </div>
            <h3 className="text-xl font-bold mb-3">Livraison en 7 jours</h3>
            <p className="text-gray-600">Votre site web prêt en moins d'une semaine. Délai garanti ou entièrement remboursé !</p>
            <div className="mt-4 bg-blue-50 w-full py-2 px-3 rounded-lg transition-all duration-300 hover:bg-blue-100">
              <span className="font-medium text-blue-700 text-sm">✓ Délai garanti par contrat</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <div className="p-4 bg-blue-50 rounded-full mb-4 border-2 border-blue-100 hover-float hover-glow">
              <Award className="h-10 w-10 text-ozy" />
            </div>
            <h3 className="text-xl font-bold mb-3">Tout Inclus 49€/mois</h3>
            <p className="text-gray-600">Hébergement, domaine, maintenance, <span className="font-bold">email professionnel</span> et mises à jour illimitées.</p>
            <div className="mt-4 bg-blue-50 w-full py-2 px-3 rounded-lg transition-all duration-300 hover:bg-blue-100">
              <span className="font-medium text-blue-700 text-sm">✓ Sans frais supplémentaires</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a href="#form" className="btn-primary inline-flex items-center micro-bounce">
            Créer Mon Site Gratuit
          </a>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
