
import { Check, Info } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const monthlyPrice = 49;
  const yearlyPrice = monthlyPrice * 10; // 2 months free
  
  const features = [
    "Création de site web professionnel",
    "Charte graphique personnalisée",
    "Nom de domaine inclus",
    "Hébergement premium",
    "Optimisation SEO",
    "Compatibilité mobile",
    "Certificat SSL (HTTPS)",
    "Mise en ligne en 7 jours maximum",
    "Mises à jour et maintenance"
  ];

  return (
    <section id="pricing" className="py-20 bg-ozy-light">
      <div className="container-custom">
        <h2 className="section-title text-center">Tarification <span className="text-gradient">Simple</span> et Transparente</h2>
        <p className="section-subtitle text-center">
          Un prix unique pour tous vos besoins web, sans frais cachés ni mauvaises surprises
        </p>

        {/* Pricing Toggle */}
        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className={`text-lg ${!isYearly ? 'font-bold text-ozy' : 'text-gray-600'}`}>Mensuel</span>
          <button 
            className="relative w-16 h-8 bg-gray-200 rounded-full p-1 transition duration-300 focus:outline-none"
            onClick={() => setIsYearly(!isYearly)}
          >
            <div
              className={`absolute w-6 h-6 bg-ozy rounded-full shadow-md transform transition-transform duration-300 ${
                isYearly ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-lg ${isYearly ? 'font-bold text-ozy' : 'text-gray-600'}`}>Annuel <span className="text-green-600 text-sm ml-1">-17%</span></span>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-ozy to-ozy-dark text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Forfait Tout Compris</h3>
              <p className="text-ozy-light opacity-90">La solution complète pour votre présence en ligne</p>
            </div>
            
            <div className="p-8">
              {/* Pricing Information */}
              <div className="text-center mb-8">
                <div className="flex justify-center items-start">
                  <span className="text-4xl font-bold text-gray-800">99€</span>
                  <span className="text-gray-500 ml-2 mt-2">frais uniques</span>
                </div>
                <div className="text-center mt-3">
                  <div className="flex justify-center items-start">
                    <span className="text-4xl font-bold text-gray-800">{isYearly ? yearlyPrice : monthlyPrice}€</span>
                    <span className="text-gray-500 ml-2 mt-2">/ {isYearly ? 'an' : 'mois'}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    {isYearly ? 'Facturation annuelle' : 'Facturation mensuelle'}
                  </p>
                </div>
              </div>
              
              {/* Feature List */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="mt-10">
                <a 
                  href="#form" 
                  className="block w-full btn-primary text-center py-4"
                >
                  Commencer Maintenant
                </a>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Satisfait ou remboursé pendant 14 jours
                </p>
              </div>
              
              {/* Footnote */}
              <div className="mt-8 text-sm text-gray-500 flex items-start">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 mr-2 text-gray-400 cursor-help flex-shrink-0 mt-0.5" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        Paiement unique de 99€ pour la création du site, puis mensualité de {monthlyPrice}€ pour la maintenance et l'hébergement. 
                        Sans engagement, annulable à tout moment.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p>
                  Engagement minimum de 3 mois. Sans renouvellement automatique. Modification ou ajout de pages 
                  en supplément selon vos besoins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
