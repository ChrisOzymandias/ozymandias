
import { Check, Layout, Palette, Globe, Zap, Clock } from 'lucide-react';

const Features = () => {
  const services = [
    {
      icon: <Layout className="w-12 h-12 text-ozy" />,
      title: "Création de Site Web",
      description: "Sites vitrines, e-commerce ou landing pages optimisés et professionnels avec des designs modernes."
    },
    {
      icon: <Palette className="w-12 h-12 text-ozy" />,
      title: "Charte Graphique",
      description: "Création d'une identité visuelle cohérente et professionnelle qui reflète votre marque."
    },
    {
      icon: <Globe className="w-12 h-12 text-ozy" />,
      title: "Nom de Domaine",
      description: "Enregistrement et configuration de votre nom de domaine personnalisé inclus dans notre offre."
    },
    {
      icon: <Zap className="w-12 h-12 text-ozy" />,
      title: "Hébergement",
      description: "Hébergement rapide, sécurisé et fiable pour garantir la disponibilité de votre site 24/7."
    },
    {
      icon: <Clock className="w-12 h-12 text-ozy" />,
      title: "Livraison Rapide",
      description: "Votre site web prêt en 7 jours ou moins, sans compromis sur la qualité."
    }
  ];

  const benefits = [
    "Sites 100% responsive sur tous les appareils",
    "Optimisation SEO pour un meilleur référencement",
    "Maintenance et mises à jour incluses",
    "Formation à l'utilisation de votre site",
    "Support client réactif et dédié",
    "Satisfaction garantie ou remboursé"
  ];

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      <div className="container-custom">
        <h2 className="section-title text-center">Nos Services <span className="text-gradient">Tout Compris</span></h2>
        <p className="section-subtitle text-center">Tout ce dont vous avez besoin pour réussir en ligne, dans une seule offre simple et transparente</p>
        
        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl card-shadow flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        
        {/* Benefits */}
        <div className="mt-20 bg-gradient-to-r from-ozy to-ozy-dark rounded-2xl p-10 text-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Pourquoi choisir Ozymandias ?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start animate-fade-in-right"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="mt-1 mr-3 bg-white rounded-full p-1 text-ozy flex-shrink-0">
                  <Check size={16} />
                </div>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-40 left-0 w-32 h-32 bg-ozy rounded-full opacity-5"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-ozy-light rounded-full opacity-20"></div>
    </section>
  );
};

export default Features;
