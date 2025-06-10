
import { Gift, Clock, Shield, Award, Star } from 'lucide-react';

interface PricingCardProps {
  isYearly: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
}

const PricingCard = ({ isYearly, monthlyPrice, yearlyPrice }: PricingCardProps) => {
  return (
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
      </div>
    </div>
  );
};

export default PricingCard;
