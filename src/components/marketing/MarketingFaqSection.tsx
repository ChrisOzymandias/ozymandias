
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const MarketingFaqSection = () => {
  const faqs = [
    {
      question: "Combien de temps faut-il pour voir les premiers résultats ?",
      answer: "Les premiers résultats sont visibles dès la mise en ligne. Pour Google My Business, vous apparaîtrez dans les recherches locales immédiatement. Pour Google Ads, les premiers clics arrivent dans les 24-48h. Les articles sponsorisés améliorent votre référencement sur 2-3 mois."
    },
    {
      question: "Quel budget publicitaire dois-je prévoir pour Google Ads ?",
      answer: "Le budget publicitaire dépend de votre secteur et de vos objectifs. En général, nous recommandons 300-800€/mois pour débuter. Nous vous aidons à définir le budget optimal selon votre marché local et vos concurrents."
    },
    {
      question: "Est-ce que je peux gérer mes campagnes tout seul après ?",
      answer: "Absolument ! Nous incluons une formation complète de 2h pour vous rendre autonome. Vous recevez aussi un guide détaillé et 30 jours de support gratuit pour toutes vos questions."
    },
    {
      question: "Sur quels sites sont publiés les articles sponsorisés ?",
      answer: "Nous travaillons avec un réseau de sites partenaires de qualité dans votre secteur d'activité. Tous ont une bonne autorité de domaine (DA 40+) et un trafic qualifié. La liste des sites vous est communiquée avant publication."
    },
    {
      question: "Que se passe-t-il si je ne suis pas satisfait des résultats ?",
      answer: "Nous nous engageons sur des résultats mesurables. Si après 30 jours vous n'observez aucune amélioration de votre visibilité, nous reprenons gratuitement la configuration ou vous remboursons la prestation."
    },
    {
      question: "Puis-je commander un seul service ou dois-je prendre le pack ?",
      answer: "Vous pouvez commander chaque service individuellement selon vos besoins. Cependant, le Super Pack offre une approche complète et une économie de 148€ pour un impact marketing maximal."
    },
    {
      question: "Combien de temps prend la mise en place complète ?",
      answer: "La mise en place prend 5-7 jours ouvrés. Google My Business : 2-3 jours, Google Ads : 3-4 jours, Articles sponsorisés : 7-10 jours. Nous vous tenons informé à chaque étape."
    },
    {
      question: "Mes concurrents utilisent-ils déjà ces services ?",
      answer: "Probablement ! C'est pourquoi il est crucial de ne pas prendre de retard. Nos services vous permettent de rattraper voire dépasser vos concurrents grâce à une stratégie optimisée et un suivi personnalisé."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ozy-light flex items-center justify-center">
            <HelpCircle size={32} className="text-ozy" />
          </div>
          <h2 className="section-title">
            Questions <span className="text-gradient">Fréquentes</span>
          </h2>
          <p className="section-subtitle">
            Toutes les réponses à vos questions sur nos services marketing
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-800 hover:text-ozy">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Une autre question ?</p>
          <a 
            href="mailto:contact@ozymandias.agency" 
            className="btn-primary inline-block"
          >
            Contactez-nous directement
          </a>
        </div>
      </div>
    </section>
  );
};

export default MarketingFaqSection;
