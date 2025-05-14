
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useAOS = () => {
  useEffect(() => {
    // Initialisation d'AOS avec des paramètres par défaut
    AOS.init({
      duration: 800, // durée des animations
      once: true, // les animations ne se joueront qu'une seule fois
      easing: 'ease-out-cubic', // type d'easing
      offset: 50 // offset (en px) depuis le point de déclenchement original
    });
    
    // Rafraîchir AOS lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
      AOS.refresh();
    });
    
    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);
};
