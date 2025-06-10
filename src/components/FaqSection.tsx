
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
    },
    {
      question: "Que se passe-t-il si je ne prends pas l'abonnement maintenance ?",
      answer: "Votre site reste en ligne pendant 30 jours après sa création. Passé ce délai, sans abonnement maintenance, l'hébergement s'arrête. Vous gardez cependant tous les fichiers de votre site."
    }
  ];
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white section-transition" id="faq">
      <div className="container-custom">
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
