
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const projects = [
  {
    id: 1,
    title: "David Plombier",
    type: "Site de plomberie",
    description: "Site web professionnel pour plombier chauffagiste",
    image: "/lovable-uploads/28afebe9-5756-443d-a922-bb4b6981d6fe.png",
    sectorLink: "/plombier"
  },
  {
    id: 2,
    title: "Électricité Pro",
    type: "Site d'électricien",
    description: "L'Excellence en Électricité à votre service",
    image: "/lovable-uploads/9b447a37-77e6-43ef-8bf3-6801728b44a8.png",
    sectorLink: "/electricien"
  },
  {
    id: 3,
    title: "OHM Tech Elec",
    type: "Site d'électricien",
    description: "Votre Expert en Solutions Électriques dans toute la France",
    image: "/lovable-uploads/b963cc47-afa4-4ad5-9dbb-7201bf0dee28.png",
    sectorLink: "/electricien"
  },
  {
    id: 4,
    title: "LC Sport Santé",
    type: "Site de coach sportif",
    description: "Sport, Santé & Bien-être personnalisé",
    image: "/lovable-uploads/6cf823c5-2749-4e3f-a059-8991ec8ccf4c.png"
  },
  {
    id: 5,
    title: "Julien Frery",
    type: "Site de plombier",
    description: "Votre plombier chauffagiste qualifié",
    image: "/lovable-uploads/1d68fa9d-13e7-4907-93af-faead2526bfe.png",
    sectorLink: "/plombier"
  },
  {
    id: 6,
    title: "Innovations Électriques",
    type: "Site d'électricien",
    description: "L'Innovation Électrique à Votre Service",
    image: "/lovable-uploads/34369910-3449-43d9-92f1-62e3bc6946e1.png",
    sectorLink: "/electricien"
  },
  {
    id: 7,
    title: "Cabinet Clément Brulin",
    type: "Site de bien-être",
    description: "Retrouvez votre équilibre physique et émotionnel",
    image: "/lovable-uploads/102000b3-2025-4b41-a012-5eb0faeb4496.png",
    sectorLink: "/therapeute"
  }
];

const PortfolioCarousel = () => {
  const autoplayOptions = {
    delay: 4000,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  };

  return (
    <section className="py-20 bg-white" id="portfolio">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Nos <span className="text-gradient">Réalisations</span>
          </h2>
          <p className="section-subtitle">
            Découvrez quelques-uns des sites web professionnels que nous avons créés pour nos clients
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[Autoplay(autoplayOptions)]}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="card-shadow rounded-xl overflow-hidden h-full flex flex-col bg-white border border-gray-200">
                    <div className="relative pt-[56.25%] overflow-hidden bg-gray-100">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-sm text-blue-600 font-semibold mb-1">{project.type}</span>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm flex-grow mb-4">{project.description}</p>
                      
                      {project.sectorLink && (
                        <Link 
                          to={project.sectorLink}
                          className="btn-secondary text-xs py-2 px-4 text-center"
                        >
                          Voir site similaire
                        </Link>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        {/* Liens vers les secteurs */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-6">Sites spécialisés par métier</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/plombier" className="btn-secondary">
              🔧 Sites Plombier
            </Link>
            <Link to="/electricien" className="btn-secondary">
              ⚡ Sites Électricien
            </Link>
            <Link to="/therapeute" className="btn-secondary">
              🌿 Sites Thérapeute
            </Link>
          </div>
          
          <a href="#form" className="btn-blue inline-flex items-center">
            Créer mon site maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;
