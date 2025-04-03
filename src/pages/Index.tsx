
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import WebsiteForm from '../components/WebsiteForm';
import Footer from '../components/Footer';
import SeoSection from '../components/SeoSection';
import { Clock, Award, ShieldCheck } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Value Proposition */}
      <section className="py-16 bg-gradient-to-b from-white to-ozy-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 bg-ozy-light rounded-full mb-4">
                <Clock className="h-8 w-8 text-ozy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Livraison en 7 jours</h3>
              <p className="text-gray-600">Votre site web prêt en moins d'une semaine ou remboursé !</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 bg-ozy-light rounded-full mb-4">
                <Award className="h-8 w-8 text-ozy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Qualité Premium</h3>
              <p className="text-gray-600">Des sites professionnels optimisés pour tous les appareils.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 bg-ozy-light rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-ozy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tout Compris</h3>
              <p className="text-gray-600">Création, hébergement, domaine et maintenance sans frais cachés.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire mis en avant */}
      <WebsiteForm />
      
      <Features />
      
      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center">Notre <span className="text-gradient">Approche</span></h2>
          <p className="section-subtitle text-center">
            Un processus simple et efficace pour vous offrir un site web professionnel en un temps record
          </p>
          
          <div className="relative mt-16">
            {/* Desktop process steps with connector line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-ozy text-white flex items-center justify-center text-xl font-bold mb-4 z-10">1</div>
                <h3 className="text-xl font-bold mb-2 text-center">Remplissez le formulaire</h3>
                <p className="text-center text-gray-600">Répondez à quelques questions simples sur vos besoins</p>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-ozy text-white flex items-center justify-center text-xl font-bold mb-4 z-10">2</div>
                <h3 className="text-xl font-bold mb-2 text-center">Validation & Paiement</h3>
                <p className="text-center text-gray-600">Nous discutons et validons votre projet ensemble</p>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-ozy text-white flex items-center justify-center text-xl font-bold mb-4 z-10">3</div>
                <h3 className="text-xl font-bold mb-2 text-center">Création du site</h3>
                <p className="text-center text-gray-600">Notre équipe développe votre site selon vos besoins</p>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-ozy text-white flex items-center justify-center text-xl font-bold mb-4 z-10">4</div>
                <h3 className="text-xl font-bold mb-2 text-center">Mise en ligne</h3>
                <p className="text-center text-gray-600">Votre site est prêt et en ligne en moins de 7 jours</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#form" className="btn-primary">Commencer Maintenant</a>
          </div>
        </div>
      </section>
      
      {/* Nouvelle section SEO pour PME et artisans */}
      <SeoSection />
      
      {/* Testimonial Section */}
      <section className="py-20 bg-ozy-light">
        <div className="container-custom">
          <h2 className="section-title text-center">Ce que disent <span className="text-gradient">nos clients</span></h2>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Sophie Martin</h4>
                  <p className="text-sm text-gray-600">Fleuriste</p>
                </div>
              </div>
              <p className="text-gray-600">"Rapide, efficace et professionnel ! Mon site est exactement comme je le voulais et a été livré en seulement 5 jours. Je recommande !"</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Thomas Durand</h4>
                  <p className="text-sm text-gray-600">Consultant</p>
                </div>
              </div>
              <p className="text-gray-600">"J'ai été impressionné par la qualité du service. Le site est magnifique, rapide et parfaitement optimisé pour les mobiles. Un excellent investissement."</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Émilie Legrand</h4>
                  <p className="text-sm text-gray-600">Photographe</p>
                </div>
              </div>
              <p className="text-gray-600">"En tant que photographe, j'avais besoin d'un site qui mette en valeur mon travail. Le résultat est au-delà de mes attentes et à un prix très compétitif."</p>
            </div>
          </div>
        </div>
      </section>
      
      <Pricing />
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center">Questions <span className="text-gradient">Fréquentes</span></h2>
          
          <div className="mt-12 max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Combien de temps faut-il pour créer mon site web ?</h3>
              <p className="text-gray-600">Nous nous engageons à livrer votre site en 7 jours maximum. Si nous dépassons ce délai, nous vous remboursons intégralement.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Que comprend exactement l'offre à 99€ ?</h3>
              <p className="text-gray-600">L'offre inclut la création complète de votre site web, la conception graphique, l'enregistrement du nom de domaine et la mise en place de l'hébergement. Les 49€ mensuels couvrent la maintenance, les mises à jour et l'hébergement continu.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Puis-je modifier mon site après sa création ?</h3>
              <p className="text-gray-600">Oui, vous pouvez demander des modifications via notre service client. Les modifications mineures sont incluses dans votre forfait mensuel. Pour des changements majeurs, un devis supplémentaire pourra être établi.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Est-ce que je peux annuler mon abonnement mensuel ?</h3>
              <p className="text-gray-600">Oui, vous pouvez annuler votre abonnement à tout moment après les 3 premiers mois. Si vous souhaitez conserver votre site, nous vous fournirons une sauvegarde complète.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Mon site sera-t-il optimisé pour les moteurs de recherche ?</h3>
              <p className="text-gray-600">Absolument. Tous nos sites sont créés avec une optimisation SEO de base intégrée. Nous configurons les balises meta, optimisons les images et assurons une structure technique favorable au référencement.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
            <a href="#" className="btn-secondary">Contactez-nous</a>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-ozy to-ozy-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à lancer votre site web professionnel ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez nos clients satisfaits et obtenez un site web optimisé en moins de 7 jours
          </p>
          <a href="#form" className="bg-white text-ozy hover:bg-ozy-light transition-colors px-8 py-4 rounded-full font-medium text-lg">
            Créer Mon Site Maintenant
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
