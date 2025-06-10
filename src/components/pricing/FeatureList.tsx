
import { Check } from 'lucide-react';

interface FeatureListProps {
  monthlyPrice: number;
}

const FeatureList = ({ monthlyPrice }: FeatureListProps) => {
  const basicFeatures = [
    "Création de site web professionnel",
    "Charte graphique personnalisée",
    "Nom de domaine inclus",
    "Hébergement premium",
    "Optimisation SEO de base",
    "Compatibilité mobile",
    "Certificat SSL (HTTPS)",
    "Mise en ligne en 7 jours maximum"
  ];
  
  const advancedFeatures = [
    "Mises à jour illimitées",
    "Support technique prioritaire",
    "Surveillance de sécurité 24/7",
    "Sauvegardes automatiques",
    "Google Analytics configuré",
    "Maintenance mensuelle"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h4 className="text-xl font-bold mb-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">1</div>
          Création gratuite
        </h4>
        <div className="space-y-3">
          {basicFeatures.map((feature, index) => (
            <div key={index} className="flex">
              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-xl font-bold mb-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-ozy flex items-center justify-center text-white mr-2">2</div>
          Maintenance {monthlyPrice}€/mois
        </h4>
        <div className="space-y-3">
          {advancedFeatures.map((feature, index) => (
            <div key={index} className="flex">
              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureList;
