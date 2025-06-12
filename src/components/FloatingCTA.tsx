
import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingCTA = () => {
  const isMobile = useIsMobile();

  const handleClick = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleClick}
        className={`
          group relative bg-ozy hover:bg-ozy-dark text-white 
          ${isMobile ? 'w-14 h-14' : 'px-6 py-4'} 
          rounded-full shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:-translate-y-1
        `}
        aria-label="Créer mon site gratuit"
      >
        {/* Contenu mobile */}
        {isMobile && (
          <div className="flex items-center justify-center">
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
          </div>
        )}
        
        {/* Contenu desktop */}
        {!isMobile && (
          <div className="flex items-center space-x-2">
            <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm whitespace-nowrap">Site Gratuit !</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        )}

        {/* Badge de notification simple */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </button>

      {/* Tooltip amélioré pour mobile - toujours visible avec animation */}
      {isMobile && (
        <div className="absolute bottom-full right-0 mb-2 animate-fade-in">
          <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            Site Gratuit !
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCTA;
