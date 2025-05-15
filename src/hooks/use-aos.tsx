
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useAOS = () => {
  useEffect(() => {
    // Configuration optimisée d'AOS
    AOS.init({
      duration: 800,
      once: true, // les animations ne se joueront qu'une seule fois (économie de ressources)
      easing: 'ease-out-cubic',
      offset: 50,
      disable: window.innerWidth < 768 ? true : false // désactiver sur mobile pour meilleure performance
    });
    
    // Utilisation de requestAnimationFrame pour optimiser le refresh
    const handleResize = () => {
      window.requestAnimationFrame(() => {
        AOS.refresh();
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
