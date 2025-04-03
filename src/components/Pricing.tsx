
import { Check, Info, Star, Shield, Award, Clock } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
        <h2 className="section-title text-center">Une offre <span className="text-gradient">tout inclus</span></h2>
        <p className="section-subtitle text-center">
          Un prix transparent sans frais cachés pour une solution web complète et professionnelle
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
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            {/* Card Header */}
            <div className="relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-ozy rounded-full opacity-10"></div>
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-ozy rounded-full opacity-10"></div>
              
              <div className="relative p-8 bg-gradient-to-r from-ozy to-ozy-dark text-white text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-ozy to-purple-500"></div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Pack Site Web Professionnel</h3>
                <p className="text-ozy-light opacity-90">La solution complète pour votre présence en ligne</p>
              </div>
            </div>
            
            <div className="p-8">
              {/* Pricing Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-center bg-ozy-light/30 p-6 rounded-xl">
                  <span className="text-sm text-gray-500 uppercase font-semibold">Frais uniques de création</span>
                  <div className="flex justify-center items-start mt-2">
                    <span className="text-5xl font-bold text-ozy">99€</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center">
                      <Clock className="h-5 w-5 text-ozy mr-2" />
                      <span className="text-gray-700">Livraison en 7 jours</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Shield className="h-5 w-5 text-ozy mr-2" />
                      <span className="text-gray-700">Satisfait ou remboursé</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center bg-gradient-to-br from-ozy-light/40 to-ozy-light/10 p-6 rounded-xl">
                  <div className="flex justify-center">
                    <span className="text-sm text-gray-500 uppercase font-semibold">Abonnement {isYearly ? 'annuel' : 'mensuel'}</span>
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
                    <div className="w-8 h-8 rounded-full bg-ozy flex items-center justify-center text-white mr-2">1</div>
                    Création du site
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
                    Maintenance et support
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
                  className="block w-full btn-primary text-center py-4 text-lg"
                >
                  Commencer Maintenant
                </a>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Satisfait ou remboursé pendant 14 jours
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
                        Paiement unique de 99€ pour la création du site, puis mensualité de {monthlyPrice}€ pour la maintenance et l'hébergement. 
                        Sans engagement, annulable à tout moment après les 3 premiers mois.
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
