
import React from 'react';
import { ArrowRight, Check, Gift, Zap, Shield } from 'lucide-react';

const CtaSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-ozy via-ozy-dark to-ozy relative overflow-hidden">
      {/* Éléments décoratifs améliorés */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom text-center relative z-10">
        {/* Badge promotion amélioré */}
        <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 rounded-full font-bold mb-8 shadow-lg animate-pulse border-2 border-white/20">
          <Gift className="w-5 h-5 mr-2" />
          Création 100% GRATUITE - Places limitées !
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
          Prêt à lancer votre site web 
          <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
            professionnel ?
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white/90 leading-relaxed">
          Rejoignez nos <span className="font-bold text-yellow-300">700+ clients satisfaits</span> et obtenez 
          <span className="inline-flex items-center bg-blue-500 text-white px-3 py-2 mx-2 rounded-lg font-bold shadow-lg">
            <Zap className="w-4 h-4 mr-1" />
            votre site GRATUIT
          </span> 
          en moins de 7 jours
        </p>
        
        {/* Grille d'avantages améliorée */}
        <div className="max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Gift, text: "Création 100% gratuite", highlight: true },
            { icon: Zap, text: "Livré en 7 jours max", highlight: false },
            { icon: Shield, text: "Maintenance 49€/mois", highlight: false },
            { icon: Check, text: "Support inclus", highlight: false }
          ].map((item, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                item.highlight 
                  ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border-yellow-300/30' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
            >
              <item.icon className={`h-6 w-6 mx-auto mb-2 ${
                item.highlight ? 'text-yellow-300' : 'text-white'
              }`} />
              <span className={`text-sm font-medium ${
                item.highlight ? 'text-yellow-100' : 'text-white'
              }`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* CTA principal amélioré */}
        <div className="mb-8">
          <button 
            onClick={scrollToForm} 
            className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300
                       px-10 py-5 rounded-full font-bold text-xl inline-flex items-center shadow-2xl hover:shadow-blue-500/25 
                       transform hover:-translate-y-2 hover:scale-105 border-2 border-white/20"
          >
            <Gift className="mr-3 h-6 w-6 group-hover:animate-bounce" />
            Créer Mon Site GRATUIT Maintenant
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Garanties améliorées */}
        <div className="flex flex-col sm:flex-row items-center justify-center text-sm gap-6 opacity-90">
          {[
            { icon: Gift, text: "Création 100% gratuite" },
            { icon: Shield, text: "Aucun engagement initial" },
            { icon: Zap, text: "Réponse en 24h maximum" }
          ].map((item, index) => (
            <div key={index} className="flex items-center text-white/90 hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                <item.icon className="w-4 h-4" />
              </div>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
