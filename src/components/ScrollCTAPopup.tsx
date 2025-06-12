
import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ScrollCTAPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosedByUser, setIsClosedByUser] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      // Ne pas afficher si l'utilisateur a fermé la popup
      if (isClosedByUser) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / documentHeight) * 100;

      // Afficher la popup après 30% de scroll
      if (scrollPercent > 30 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, isClosedByUser]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosedByUser(true);
  };

  const handleCTAClick = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in border border-gray-100">
        {/* Bouton de fermeture */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Contenu de la popup */}
        <div className="text-center">
          {/* Badge d'urgence */}
          <div className="inline-flex items-center px-3 py-1 bg-ozy/10 text-ozy rounded-full text-sm font-medium mb-4">
            🔥 Offre limitée
          </div>

          {/* Titre principal */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Votre Site Web
            <span className="block text-ozy">100% Gratuit</span>
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Création gratuite puis seulement <span className="font-bold text-green-600">49€/mois</span> tout compris.
          </p>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <button
              onClick={handleCTAClick}
              className="w-full bg-ozy hover:bg-ozy-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Créer Mon Site Gratuit
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={handleClose}
              className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
            >
              Plus tard
            </button>
          </div>

          {/* Elements de confiance */}
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="text-yellow-500 mr-1">★★★★★</span>
              98% clients satisfaits
            </span>
          </div>
        </div>

        {/* Élément décoratif */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-ozy rounded-full opacity-20"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-ozy-light rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default ScrollCTAPopup;
