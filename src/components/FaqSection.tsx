
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';

type FaqItem = {
  question: string;
  answer: string;
};

const projects = [
  {
    id: 1,
    title: "David Plombier",
    type: "Site de plomberie",
    description: "Site web professionnel pour plombier chauffagiste",
    image: "/lovable-uploads/28afebe9-5756-443d-a922-bb4b6981d6fe.png"
  },
  {
    id: 2,
    title: "Électricité Pro",
    type: "Site d'électricien",
    description: "L'Excellence en Électricité à votre service",
    image: "/lovable-uploads/9b447a37-77e6-43ef-8bf3-6801728b44a8.png"
  },
  {
    id: 3,
    title: "OHM Tech Elec",
    type: "Site d'électricien",
    description: "Votre Expert en Solutions Électriques dans toute la France",
    image: "/lovable-uploads/b963cc47-afa4-4ad5-9dbb-7201bf0dee28.png"
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
    image: "/lovable-uploads/1d68fa9d-13e7-4907-93af-faead2526bfe.png"
  },
  {
    id: 6,
    title: "Innovations Électriques",
    type: "Site d'électricien",
    description: "L'Innovation Électrique à Votre Service",
    image: "/lovable-uploads/34369910-3449-43d9-92f1-62e3bc6946e1.png"
  },
  {
    id: 7,
    title: "Cabinet Clément Brulin",
    type: "Site de bien-être",
    description: "Retrouvez votre équilibre physique et émotionnel",
    image: "/lovable-uploads/102000b3-2025-4b41-a012-5eb0faeb4496.png"
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FaqItem[] = [
    {
      question: "Combien de temps faut-il pour créer mon site web ?",
      answer: "Nous nous engageons à livrer votre site en 7 jours maximum. Si nous dépassons ce délai, nous vous remboursons intégralement. La création est 100% gratuite."
    },
    {
      question: "Que comprend exactement l'offre gratuite ?",
      answer: "L'offre gratuite inclut la création complète de votre site web professionnel, la conception graphique personnalisée, l'enregistrement du nom de domaine et la mise en place de l'hébergement. Aucun frais de création !"
    },
    {
      question: "Que comprend l'abonnement à 49€/mois ?",
      answer: "L'abonnement mensuel couvre l'hébergement premium, la maintenance technique, les mises à jour de sécurité, le support client prioritaire, les sauvegardes automatiques et les modifications mineures de contenu."
    },
    {
      question: "Puis-je modifier mon site après sa création ?",
      answer: "Oui, vous pouvez demander des modifications via notre service client. Les modifications mineures sont incluses dans votre forfait mensuel à 49€. Pour des changements majeurs, un devis supplémentaire pourra être établi."
    },
    {
      question: "Est-ce que je peux annuler mon abonnement mensuel ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment après les 3 premiers mois. Si vous souhaitez conserver votre site, nous vous fournirons une sauvegarde complète."
    },
    {
      question: "Mon site sera-t-il optimisé pour les moteurs de recherche ?",
      answer: "Absolument. Tous nos sites sont créés avec une optimisation SEO de base intégrée. Nous configurons les balises meta, optimisons les images et assurons une structure technique favorable au référencement."
    }
  ];
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const autoplayOptions = {
    delay: 4000,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white section-transition" id="faq">
      <div className="container-custom">
        {/* Portfolio Section intégrée */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="section-title">Nos <span className="text-gradient">Réalisations</span></h2>
          <p className="section-subtitle">
            Découvrez quelques-uns des sites web professionnels que nous avons créés pour nos clients
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto mb-20">
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
                      <p className="text-gray-600 text-sm flex-grow">{project.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="section-title">Questions <span className="text-gradient">Fréquentes</span></h2>
          <p className="section-subtitle">
            Tout ce que vous devez savoir sur notre offre de création gratuite
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'shadow-lg ring-2 ring-ozy/10' 
                  : 'hover:shadow-md hover:border-gray-200'
              }`}
              data-aos="fade-up" 
              data-aos-delay={100 + index * 50}
            >
              <button 
                className="w-full text-left p-6 md:p-8 flex justify-between items-start hover-float group"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 pr-4 leading-relaxed group-hover:text-ozy transition-colors">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-ozy text-white' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-ozy/10 group-hover:text-ozy'
                }`}>
                  {openIndex === index ? 
                    <ChevronUp className="w-5 h-5" /> : 
                    <ChevronDown className="w-5 h-5" />
                  }
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'opacity-100 max-h-96 pb-6 md:pb-8' 
                    : 'opacity-0 max-h-0 overflow-hidden'
                }`}
              >
                <div className="px-6 md:px-8">
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour vous accompagner
            </p>
            <a 
              href="#form" 
              className="btn-primary hover-float inline-flex items-center"
            >
              Contactez-nous gratuitement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
