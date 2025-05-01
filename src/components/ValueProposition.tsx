
import { Clock, Award, ShieldCheck } from 'lucide-react';

const ValueProposition = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-ozy-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
            <div className="p-3 bg-ozy-light rounded-full mb-4">
              <Clock className="h-8 w-8 text-ozy" />
            </div>
            <h3 className="text-xl font-bold mb-2">Livraison en 7 jours</h3>
            <p className="text-gray-600">Votre site web prêt en moins d'une semaine ou remboursé !</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
            <div className="p-3 bg-ozy-light rounded-full mb-4">
              <Award className="h-8 w-8 text-ozy" />
            </div>
            <h3 className="text-xl font-bold mb-2">Qualité Premium</h3>
            <p className="text-gray-600">Des sites professionnels optimisés pour tous les appareils.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
            <div className="p-3 bg-ozy-light rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-ozy" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tout Compris</h3>
            <p className="text-gray-600">Création, hébergement, domaine et maintenance sans frais cachés.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
