
import { useEffect } from 'react';

export function useParallax() {
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        // Utilisation de requestAnimationFrame pour optimiser les performances
        window.requestAnimationFrame(() => {
          const parallaxElements = document.querySelectorAll('.parallax');
          
          parallaxElements.forEach((element) => {
            const dataSpeed = parseFloat(element.getAttribute('data-speed') || '0.15');
            
            if (element instanceof HTMLElement) {
              element.style.transform = `translateY(${lastScrollY * dataSpeed}px)`;
            }
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
