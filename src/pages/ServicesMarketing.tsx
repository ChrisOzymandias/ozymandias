
import React from 'react';
import { ArrowRight, Star, TrendingUp, Users, PenTool, MapPin, Megaphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServicesMarketing = () => {
  const services = [
    {
      id: 'google-business',
      title: 'Fiche Google My Business',
      price: '149€',
      icon: MapPin,
      description: 'Création et optimisation de votre présence locale',
      features: [
        'Création complète de votre fiche',
        'Ajout de photos professionnelles',
        'Configuration des informations essentielles',
        'Optimisation pour le référencement local'
      ],
      why: 'Essentiel pour être trouvé localement par vos clients. 76% des recherches locales aboutissent à une visite en magasin dans les 24h.'
    },
    {
      id: 'google-ads',
      title: 'Campagnes Google Ads',
      price: '249€',
      icon: Megaphone,
      description: 'Création et lancement de vos campagnes publicitaires',
      features: [
        'Création et configuration des campagnes',
        'Ciblage précis de votre audience',
        'Suivi et optimisation pendant 7 jours',
        'Formation pour la gestion autonome'
      ],
      why: 'Générez des leads qualifiés immédiatement. Une campagne bien configurée peut transformer votre visibilité en ligne dès le premier jour.',
      note: '+ Budget publicitaire à la charge du client'
    },
    {
      id: 'blog-articles',
      title: 'Articles de Blog Sponsorisés',
      price: '249€',
      icon: PenTool,
      description: '7 articles de qualité sur des sites partenaires',
      features: [
        '7 articles rédigés par des experts',
        'Publication sur des sites de référence',
        'Liens de qualité vers votre site',
        'Amélioration de votre notoriété'
      ],
      why: 'Développez votre autorité et votre visibilité. Les backlinks de qualité améliorent significativement votre référencement naturel.'
    }
  ];

  const totalPrice = 149 + 249 + 249;
  const packPrice = 499;
  const savings = totalPrice - packPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-ozy-light/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Boostez votre <span className="text-gradient">présence en ligne</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Services marketing avancés pour maximiser la visibilité et l'impact de votre site web
            </p>
            <div className="flex items-center justify-center space-x-2 text-ozy">
              <Star className="fill-current" size={20} />
              <span className="font-medium">Pour les clients ayant déjà leur site Ozymandias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="relative group hover:shadow-xl transition-all duration-300 border-2 hover:border-ozy/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ozy-light flex items-center justify-center group-hover:bg-ozy group-hover:text-white transition-colors">
                    <service.icon size={32} />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <div className="text-3xl font-bold text-ozy mb-2">{service.price}</div>
                  {service.note && (
                    <div className="text-sm text-gray-500">{service.note}</div>
                  )}
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-ozy">Inclus :</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-ozy mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-ozy-light/30 p-4 rounded-lg mb-6">
                    <h5 className="font-semibold text-ozy mb-2">Pourquoi c'est essentiel :</h5>
                    <p className="text-sm text-gray-700">{service.why}</p>
                  </div>
                  
                  <Button className="w-full bg-ozy hover:bg-ozy-dark">
                    Choisir ce service <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Super Pack Section */}
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
      
      <Footer />
    </div>
  );
};

export default ServicesMarketing;
