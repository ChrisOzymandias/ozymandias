
import React from 'react';

const FaqSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center" data-aos="fade-up">Questions <span className="text-gradient">Fréquentes</span></h2>
        
        <div className="mt-12 max-w-3xl mx-auto space-y-6">
          <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-lg font-bold mb-2">Combien de temps faut-il pour créer mon site web ?</h3>
            <p className="text-gray-600">Nous nous engageons à livrer votre site en 7 jours maximum. Si nous dépassons ce délai, nous vous remboursons intégralement.</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay="150">
            <h3 className="text-lg font-bold mb-2">Que comprend exactement l'offre à 99€ ?</h3>
            <p className="text-gray-600">L'offre inclut la création complète de votre site web, la conception graphique, l'enregistrement du nom de domaine et la mise en place de l'hébergement. Les 49€ mensuels couvrent la maintenance, les mises à jour et l'hébergement continu.</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-lg font-bold mb-2">Puis-je modifier mon site après sa création ?</h3>
            <p className="text-gray-600">Oui, vous pouvez demander des modifications via notre service client. Les modifications mineures sont incluses dans votre forfait mensuel. Pour des changements majeurs, un devis supplémentaire pourra être établi.</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay="250">
            <h3 className="text-lg font-bold mb-2">Est-ce que je peux annuler mon abonnement mensuel ?</h3>
            <p className="text-gray-600">Oui, vous pouvez annuler votre abonnement à tout moment après les 3 premiers mois. Si vous souhaitez conserver votre site, nous vous fournirons une sauvegarde complète.</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-lg font-bold mb-2">Mon site sera-t-il optimisé pour les moteurs de recherche ?</h3>
            <p className="text-gray-600">Absolument. Tous nos sites sont créés avec une optimisation SEO de base intégrée. Nous configurons les balises meta, optimisons les images et assurons une structure technique favorable au référencement.</p>
          </div>
        </div>
        
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="350">
          <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
          <a href="#" className="btn-secondary">Contactez-nous</a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
