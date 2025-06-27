
import React from 'react';
import { MapPin, Megaphone, PenTool } from 'lucide-react';
import ServiceCard from './ServiceCard';

const ServicesGrid = () => {
  const services = [
    {
      id: 'google-business',
      title: 'Fiche Google My Business',
      price: '149€',
      icon: MapPin,
      description: 'Création et optimisation de votre présence locale',
      features: [
        'Création complète de votre fiche',
        'Ajout de photos professionnelles',
        'Configuration des informations essentielles',
        'Optimisation pour le référencement local'
      ],
      why: 'Essentiel pour être trouvé localement par vos clients. 76% des recherches locales aboutissent à une visite en magasin dans les 24h.'
    },
    {
      id: 'google-ads',
      title: 'Campagnes Google Ads',
      price: '249€',
      icon: Megaphone,
      description: 'Création et lancement de vos campagnes publicitaires',
      features: [
        'Création et configuration des campagnes',
        'Ciblage précis de votre audience',
        'Suivi et optimisation pendant 7 jours',
        'Formation pour la gestion autonome'
      ],
      why: 'Générez des leads qualifiés immédiatement. Une campagne bien configurée peut transformer votre visibilité en ligne dès le premier jour.',
      note: '+ Budget publicitaire à la charge du client'
    },
    {
      id: 'blog-articles',
      title: 'Articles de Blog Sponsorisés',
      price: '249€',
      icon: PenTool,
      description: '7 articles de qualité sur des sites partenaires',
      features: [
        '7 articles rédigés par des experts',
        'Publication sur des sites de référence',
        'Liens de qualité vers votre site',
        'Amélioration de votre notoriété'
      ],
      why: 'Développez votre autorité et votre visibilité. Les backlinks de qualité améliorent significativement votre référencement naturel.'
    }
  ];

  return (
    <section className="pb-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
