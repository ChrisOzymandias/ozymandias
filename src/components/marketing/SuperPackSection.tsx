
import React from 'react';
import { ArrowRight, TrendingUp, Users, Star, Megaphone, MapPin, PenTool } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SuperPackSection = () => {
  const totalPrice = 149 + 249 + 249;
  const packPrice = 499;
  const savings = totalPrice - packPrice;

  return (
    <section className="pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-4 border-ozy/20 bg-gradient-to-br from-white to-ozy-light/10">
            {/* Badge */}
            <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12">
              -{savings}€ !
            </div>
            
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-ozy to-ozy-dark flex items-center justify-center">
                <TrendingUp size={40} className="text-white" />
              </div>
              <CardTitle className="text-3xl mb-4">
                <span className="text-gradient">SUPER PACK</span> Présence Digitale
              </CardTitle>
              <CardDescription className="text-lg">
                La solution complète pour dominer votre marché local
              </CardDescription>
            </CardHeader>
            
            <CardContent className="text-center">
              <div className="mb-8">
                <div className="flex justify-center items-center space-x-4 mb-4">
                  <span className="text-2xl text-gray-400 line-through">{totalPrice}€</span>
                  <ArrowRight className="text-ozy" size={24} />
                  <span className="text-4xl font-bold text-ozy">{packPrice}€</span>
                </div>
                <p className="text-green-600 font-semibold text-lg">
                  Économisez {savings}€ avec le pack complet !
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center space-x-2 text-gray-700">
                  <MapPin size={20} className="text-ozy" />
                  <span>Google My Business</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-700">
                  <Megaphone size={20} className="text-ozy" />
                  <span>Campagnes Google Ads</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-700">
                  <PenTool size={20} className="text-ozy" />
                  <span>7 Articles Sponsorisés</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-ozy-light/40 to-transparent p-6 rounded-lg mb-8">
                <h4 className="font-bold text-lg mb-3 text-ozy">Résultats attendus :</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-ozy" />
                    <span>+150% de visibilité locale</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={16} className="text-ozy" />
                    <span>+300% de trafic qualifié</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star size={16} className="text-ozy" />
                    <span>Amélioration du référencement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Megaphone size={16} className="text-ozy" />
                    <span>Leads qualifiés garantis</span>
                  </div>
                </div>
              </div>
              
              <Button size="lg" className="bg-gradient-to-r from-ozy to-ozy-dark hover:from-ozy-dark hover:to-ozy text-white px-8 py-4 text-lg">
                Commander le Super Pack à {packPrice}€
                <ArrowRight size={20} className="ml-2" />
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                Idéal pour les entreprises qui veulent maximiser leur retour sur investissement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SuperPackSection;
