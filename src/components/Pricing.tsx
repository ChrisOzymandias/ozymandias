
import { Check, Info, Star, Shield, Award, Clock, Gift } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const monthlyPrice = 49;
  const yearlyPrice = monthlyPrice * 10; // 2 mois gratuits
  
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
    <section id="pricing" className="py-20 bg-gradient-to-br from-white to-ozy-light/30">
      <div className="container-custom">
        <h2 className="section-title text-center">Une offre <span className="text-gradient">révolutionnaire</span></h2>
        <p className="section-subtitle text-center">
          Création gratuite + maintenance tout inclus pour un prix imbattable
        </p>

        {/* Pricing Toggle */}
        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className={`text-lg ${!isYearly ? 'font-bold text-blue-600' : 'text-gray-600'}`}>Mensuel</span>
          <div className="relative">
            <button 
              className="relative w-16 h-8 bg-gray-200 rounded-full p-1 transition duration-300 focus:outline-none"
              onClick={() => setIsYearly(!isYearly)}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-blue-600 rounded-full shadow-md transform transition-transform duration-300 ${
                  isYearly ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <span className={`text-lg ${isYearly ? 'font-bold text-blue-600' : 'text-gray-600'}`}>Annuel <span className="text-green-600 text-sm ml-1">-17%</span></span>
        </div>

        {/* Pricing Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            {/* Card Header */}
            <div className="relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-ozy rounded-full opacity-10"></div>
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-ozy rounded-full opacity-10"></div>
              
              <div className="relative p-8 bg-gradient-to-r from-green-500 to-green-600 text-white text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-green-400 to-green-500"></div>
                <div className="flex items-center justify-center mb-2">
                  <Gift className="h-8 w-8 mr-2" />
                  <h3 className="text-2xl md:text-3xl font-bold">Site Web GRATUIT</h3>
                </div>
                <p className="text-green-100 opacity-90">Création offerte + maintenance tout inclus</p>
              </div>
            </div>
            
            <div className="p-8">
              {/* Pricing Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-center bg-green-50 p-6 rounded-xl flex flex-col h-full justify-between border-2 border-green-200">
                  <div>
                    <span className="text-sm text-gray-500 uppercase font-semibold block">Création du site</span>
                    <div className="flex justify-center items-center mt-2">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <span className="text-6xl font-bold text-green-600">0€</span>
                        </div>
                        <span className="text-lg text-green-600 font-semibold mt-1">100% GRATUIT</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center">
                      <Clock className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-gray-700">Livraison en 7 jours</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-gray-700">Sans engagement</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center bg-gradient-to-br from-ozy-light/40 to-ozy-light/10 p-6 rounded-xl flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-center">
                      <span className="text-sm text-gray-500 uppercase font-semibold">Maintenance {isYearly ? 'annuelle' : 'mensuelle'}</span>
                      {isYearly && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Économisez 17%
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center items-start mt-2">
                      <span className="text-5xl font-bold text-ozy">{isYearly ? yearlyPrice : monthlyPrice}€</span>
                      <span className="text-gray-500 ml-2 mt-2">/ {isYearly ? 'an' : 'mois'}</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center">
                      <Award className="h-5 w-5 text-ozy mr-2" />
                      <span className="text-gray-700">Support prioritaire</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Star className="h-5 w-5 text-ozy mr-2" />
                      <span className="text-gray-700">Mises à jour illimitées</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature Lists */}
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
              
              {/* CTA Button */}
              <div className="mt-10">
                <a 
                  href="#form" 
                  className="block w-full bg-green-600 text-white hover:bg-green-700 transition-colors rounded-full font-medium text-center py-4 text-lg"
                >
                  Créer Mon Site Gratuit
                </a>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Création gratuite • Sans engagement • Maintenance à partir de {monthlyPrice}€/mois
                </p>
              </div>
              
              {/* Footnote */}
              <div className="mt-8 text-sm text-gray-500 flex items-start border-t pt-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 mr-2 text-gray-400 cursor-help flex-shrink-0 mt-0.5" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        Création du site 100% gratuite, puis maintenance à {monthlyPrice}€/mois incluant hébergement, domaine, 
                        mises à jour et support. Sans engagement après les 3 premiers mois.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p>
                  Maintenance démarre après validation du site. Engagement minimum de 3 mois pour la maintenance. 
                  Résiliation possible à tout moment après cette période.
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
