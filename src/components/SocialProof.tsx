
import React, { useEffect, useRef } from 'react';
import { Users, Star, Award, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SocialProof = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Animation de défilement horizontal pour desktop
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const scrollContainer = containerRef.current;
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    const containerWidth = scrollContainer.scrollWidth;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when fully scrolled
      if (scrollPosition >= containerWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
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

  return (
    <section className="py-6 md:py-8 bg-blue-600 text-white overflow-hidden">
      <div className={`${isMobile ? "" : "container-custom"}`}>
        <div 
          ref={containerRef}
          className={`
            ${isMobile 
              ? "flex flex-col space-y-4 px-4" 
              : "flex overflow-hidden whitespace-nowrap"
            }
          `}
        >
          {/* Dupliquer les éléments pour un défilement sans fin */}
          {[...metrics, ...metrics].map((metric, index) => (
            <div 
              key={index} 
              className={`
                flex items-center justify-center
                ${isMobile 
                  ? "bg-blue-700/30 rounded-lg p-4" 
                  : "transform rotate-1 bg-blue-700/30 rounded-lg p-6 mx-4 inline-flex min-w-[250px] whitespace-normal"
                }
              `}
            >
              <div className="flex flex-col items-center text-center">
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
    </section>
  );
};

export default SocialProof;
