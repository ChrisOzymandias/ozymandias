
import { useEffect } from 'react';

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const distance = window.scrollY;
        const dataSpeed = parseFloat(element.getAttribute('data-speed') || '0.15');
        
        // Apply transform based on scroll position and speed
        if (element instanceof HTMLElement) {
          element.style.transform = `translateY(${distance * dataSpeed}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
