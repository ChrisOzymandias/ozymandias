
import { Clock, Award, ShieldCheck } from 'lucide-react';

const ValueProposition = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-ozy-light">
      <div className="container-custom">
        <h2 className="section-title text-center mb-6">Pourquoi <span className="text-gradient">Nous Choisir</span> ?</h2>
        <p className="section-subtitle text-center">
          Nos clients nous choisissent pour notre expertise, notre rapidité et notre transparence
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
            <div className="p-4 bg-blue-50 rounded-full mb-4 border-2 border-blue-100">
              <Clock className="h-10 w-10 text-ozy" />
            </div>
            <h3 className="text-xl font-bold mb-3">Livraison en 7 jours</h3>
            <p className="text-gray-600">Votre site web prêt en moins d'une semaine ou remboursé ! Nous respectons nos délais.</p>
            <div className="mt-4 bg-blue-50 w-full py-2 px-3 rounded-lg">
              <span className="font-medium text-blue-700 text-sm">✓ Délai garanti par contrat</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
            <div className="p-4 bg-blue-50 rounded-full mb-4 border-2 border-blue-100">
              <Award className="h-10 w-10 text-ozy" />
            </div>
            <h3 className="text-xl font-bold mb-3">Qualité Premium</h3>
            <p className="text-gray-600">Des sites professionnels optimisés pour tous les appareils, qui convertissent vos visiteurs en clients.</p>
            <div className="mt-4 bg-blue-50 w-full py-2 px-3 rounded-lg">
              <span className="font-medium text-blue-700 text-sm">✓ Satisfait ou remboursé</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
            <div className="p-4 bg-blue-50 rounded-full mb-4 border-2 border-blue-100">
              <ShieldCheck className="h-10 w-10 text-ozy" />
            </div>
            <h3 className="text-xl font-bold mb-3">Tout Compris</h3>
            <p className="text-gray-600">Création, hébergement, domaine et maintenance sans frais cachés. Un prix transparent et fixe.</p>
            <div className="mt-4 bg-blue-50 w-full py-2 px-3 rounded-lg">
              <span className="font-medium text-blue-700 text-sm">✓ Sans frais supplémentaires</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a href="#form" className="btn-primary inline-flex items-center">
            Obtenir Ma Maquette Gratuite
          </a>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
