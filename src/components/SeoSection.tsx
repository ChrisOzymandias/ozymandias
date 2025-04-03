import React from 'react';
import { Search, Users, TrendingUp, Building, Hammer, Store, Star, ArrowRight } from 'lucide-react';

const SeoSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-ozy-light/40 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-gradient">Optimisé</span> pour votre activité
          </h2>
          <p className="section-subtitle">
            Des sites web parfaitement adaptés pour les PME, artisans et indépendants
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image et texte principal */}
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-white to-ozy-light/20 p-8 rounded-2xl shadow-xl">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-ozy text-white mr-4">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-bold">Référencement naturel optimisé</h3>
              </div>
              
              <p className="text-gray-700 mb-8">
                Chaque site que nous créons est conçu avec les meilleures pratiques SEO pour vous assurer
                une visibilité maximale sur Google et les autres moteurs de recherche.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-ozy-light text-ozy mr-3">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Analyse de mots-clés</h4>
                    <p className="text-gray-600 text-sm">Identification des termes recherchés par vos clients</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-ozy-light text-ozy mr-3">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">SEO local</h4>
                    <p className="text-gray-600 text-sm">Optimisation pour les recherches locales de vos clients</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Parfait pour :</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                  <Building size={24} className="text-ozy mr-3" />
                  <span className="font-medium">PME</span>
                </div>
                <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                  <Hammer size={24} className="text-ozy mr-3" />
                  <span className="font-medium">Artisans</span>
                </div>
                <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                  <Store size={24} className="text-ozy mr-3" />
                  <span className="font-medium">Commerces</span>
                </div>
                <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                  <Star size={24} className="text-ozy mr-3" />
                  <span className="font-medium">Indépendants</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Côté droit avec les avantages */}
          <div className="order-1 md:order-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6">Déléguez votre présence en ligne à des experts</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-ozy-light text-ozy mr-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Gagnez du temps</h4>
                    <p className="text-gray-600">
                      Concentrez-vous sur votre cœur de métier pendant que nous créons votre site web professionnel.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-ozy-light text-ozy mr-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Augmentez votre visibilité</h4>
                    <p className="text-gray-600">
                      Attirez de nouveaux clients grâce à un site optimisé pour le référencement naturel.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-ozy-light text-ozy mr-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Zéro souci technique</h4>
                    <p className="text-gray-600">
                      Hébergement, maintenance et sécurité gérés par nos équipes. Vous n'avez à vous soucier de rien.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <a href="#form" className="btn-primary inline-flex items-center">
                  Démarrer mon projet <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoSection;
