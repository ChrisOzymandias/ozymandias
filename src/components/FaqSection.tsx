
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FaqItem[] = [
    {
      question: "Combien de temps faut-il pour créer mon site web ?",
      answer: "Nous nous engageons à livrer votre site en 7 jours maximum. Si nous dépassons ce délai, nous vous remboursons intégralement."
    },
    {
      question: "Que comprend exactement l'offre à 99€ ?",
      answer: "L'offre inclut la création complète de votre site web, la conception graphique, l'enregistrement du nom de domaine et la mise en place de l'hébergement. Les 49€ mensuels couvrent la maintenance, les mises à jour et l'hébergement continu."
    },
    {
      question: "Puis-je modifier mon site après sa création ?",
      answer: "Oui, vous pouvez demander des modifications via notre service client. Les modifications mineures sont incluses dans votre forfait mensuel. Pour des changements majeurs, un devis supplémentaire pourra être établi."
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

  return (
    <section className="py-20 bg-white section-transition" id="faq">
      <div className="container-custom">
        <h2 className="section-title text-center" data-aos="fade-up">Questions <span className="text-gradient">Fréquentes</span></h2>
        
        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'shadow-md' : 'hover:shadow-sm'
              }`}
              data-aos="fade-up" 
              data-aos-delay={100 + index * 50}
            >
              <button 
                className="w-full text-left p-6 flex justify-between items-center hover-float"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-bold">{faq.question}</h3>
                {openIndex === index ? 
                  <ChevronUp className="text-ozy flex-shrink-0 ml-4" /> : 
                  <ChevronDown className="text-ozy flex-shrink-0 ml-4" />
                }
              </button>
              
              <div 
                className={`px-6 pb-6 transition-all duration-300 ${
                  openIndex === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="350">
          <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
          <a href="#" className="btn-secondary hover-float">Contactez-nous</a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
