
import React, { useEffect, useRef } from 'react';
import { Users, Star, Award, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SocialProof = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Animation de défilement horizontal pour desktop seulement
  useEffect(() => {
    if (isMobile || !containerRef.current || !contentRef.current) return;

    const scrollContainer = containerRef.current;
    const contentWidth = contentRef.current.scrollWidth;
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when fully scrolled
      if (scrollPosition >= contentWidth / 2) {
        scrollPosition = 0;
      }
      
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPosition;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Stop animation on mouse hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  const metrics = [
    {
      icon: <Users className="h-6 w-6 mr-2" />,
      value: "700+",
      label: "Artisans et PME accompagnés"
    },
    {
      icon: <Star className="h-6 w-6 mr-2" />,
      value: "98%",
      label: "Taux de satisfaction client"
    },
    {
      icon: <Award className="h-6 w-6 mr-2" />,
      value: "5 ans",
      label: "D'expertise web"
    },
    {
      icon: <Clock className="h-6 w-6 mr-2" />,
      value: "7 jours",
      label: "Délai de livraison moyen"
    }
  ];

  // Si on est sur mobile, on ne rend pas ce composant
  if (isMobile) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-blue-600 text-white overflow-hidden mt-[-1px] mb-[-1px]">
      <div className="relative">
        <div 
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div 
            ref={contentRef}
            className="flex whitespace-nowrap"
          >
            {/* Afficher les métriques */}
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className="transform rotate-3 hover:rotate-0 transition-transform duration-300 bg-blue-700/30 rounded-lg p-6 mx-4 inline-flex min-w-[250px] whitespace-normal shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col items-center text-center w-full">
                  <div className="flex items-center justify-center mb-2">
                    {metric.icon}
                    <span className="font-bold text-2xl">{metric.value}</span>
                  </div>
                  <p className="text-sm">{metric.label}</p>
                </div>
              </div>
            ))}
            
            {/* Dupliquer les métriques pour l'effet de défilement infini */}
            {metrics.map((metric, index) => (
              <div 
                key={`desktop-${index}`} 
                className="transform rotate-3 hover:rotate-0 transition-transform duration-300 bg-blue-700/30 rounded-lg p-6 mx-4 inline-flex min-w-[250px] whitespace-normal shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col items-center text-center w-full">
                  <div className="flex items-center justify-center mb-2">
                    {metric.icon}
                    <span className="font-bold text-2xl">{metric.value}</span>
                  </div>
                  <p className="text-sm">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Effet de dégradé sur les côtés pour indiquer le défilement */}
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-blue-600 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default SocialProof;
