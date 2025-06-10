
export interface SectorData {
  id: string;
  name: string;
  displayName: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  heroImage: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  testimonial: {
    name: string;
    profession: string;
    content: string;
    image: string;
  };
  portfolioExample: {
    title: string;
    description: string;
    image: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const sectorsData: Record<string, SectorData> = {
  plombier: {
    id: 'plombier',
    name: 'plombier',
    displayName: 'Plombier',
    title: 'Site Web pour Plombier',
    subtitle: 'Attirez plus de clients avec un site professionnel',
    description: 'Créez votre site de plomberie gratuit et démarquez-vous de la concurrence locale. Plus de visibilité = plus d\'interventions.',
    icon: '🔧',
    heroImage: '/lovable-uploads/28afebe9-5756-443d-a922-bb4b6981d6fe.png',
    features: [
      {
        title: 'Urgences 24h/7j',
        description: 'Mettez en avant votre disponibilité pour les urgences',
        icon: '🚨'
      },
      {
        title: 'Zone d\'intervention',
        description: 'Affichez clairement vos zones de déplacement',
        icon: '📍'
      },
      {
        title: 'Devis en ligne',
        description: 'Formulaire de demande de devis intégré',
        icon: '💰'
      }
    ],
    testimonial: {
      name: 'David Martin',
      profession: 'Plombier à Évreux',
      content: 'Grâce à mon nouveau site, j\'ai doublé mes appels clients en 3 mois. Le référencement local fonctionne parfaitement !',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=50&h=50'
    },
    portfolioExample: {
      title: 'David Plombier',
      description: 'Site web professionnel pour plombier chauffagiste',
      image: '/lovable-uploads/28afebe9-5756-443d-a922-bb4b6981d6fe.png'
    },
    seo: {
      title: 'Site Web Plombier Gratuit | Ozymandias Agency',
      description: 'Créez votre site de plomberie gratuit. Attirez plus de clients avec un site professionnel optimisé pour le référencement local.',
      keywords: ['site web plombier', 'plomberie', 'site plombier gratuit', 'référencement plombier']
    }
  },
  electricien: {
    id: 'electricien',
    name: 'electricien',
    displayName: 'Électricien',
    title: 'Site Web pour Électricien',
    subtitle: 'Illuminez votre présence en ligne',
    description: 'Un site web professionnel pour votre entreprise d\'électricité. Attirez plus de clients et développez votre activité locale.',
    icon: '⚡',
    heroImage: '/lovable-uploads/9b447a37-77e6-43ef-8bf3-6801728b44a8.png',
    features: [
      {
        title: 'Dépannage électrique',
        description: 'Mettez en avant vos services de dépannage',
        icon: '🔌'
      },
      {
        title: 'Installation & Rénovation',
        description: 'Présentez vos services d\'installation',
        icon: '🏠'
      },
      {
        title: 'Certification RGE',
        description: 'Affichez vos certifications et qualifications',
        icon: '🏆'
      }
    ],
    testimonial: {
      name: 'Thomas Dubois',
      profession: 'Électricien à Rouen',
      content: 'Mon site me permet de me démarquer de la concurrence. Les clients me trouvent facilement et font confiance à mon professionnalisme.',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=50&h=50'
    },
    portfolioExample: {
      title: 'Électricité Pro',
      description: 'L\'Excellence en Électricité à votre service',
      image: '/lovable-uploads/9b447a37-77e6-43ef-8bf3-6801728b44a8.png'
    },
    seo: {
      title: 'Site Web Électricien Gratuit | Ozymandias Agency',
      description: 'Créez votre site d\'électricien gratuit. Développez votre activité avec un site professionnel optimisé pour les recherches locales.',
      keywords: ['site web électricien', 'électricité', 'site électricien gratuit', 'référencement électricien']
    }
  },
  therapeute: {
    id: 'therapeute',
    name: 'therapeute',
    displayName: 'Thérapeute',
    title: 'Site Web pour Thérapeute',
    subtitle: 'Développez votre pratique thérapeutique',
    description: 'Un site web professionnel pour votre cabinet de thérapie. Rassurez vos futurs patients et développez votre patientèle.',
    icon: '🌿',
    heroImage: '/lovable-uploads/102000b3-2025-4b41-a012-5eb0faeb4496.png',
    features: [
      {
        title: 'Prise de rendez-vous',
        description: 'Système de réservation en ligne intégré',
        icon: '📅'
      },
      {
        title: 'Présentation thérapies',
        description: 'Expliquez vos méthodes et spécialités',
        icon: '🧘'
      },
      {
        title: 'Blog bien-être',
        description: 'Partagez vos conseils et expertise',
        icon: '✍️'
      }
    ],
    testimonial: {
      name: 'Marie Legrand',
      profession: 'Thérapeute à Paris',
      content: 'Mon site inspire confiance à mes patients. Ils peuvent découvrir mes méthodes avant de prendre rendez-vous.',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=50&h=50'
    },
    portfolioExample: {
      title: 'Cabinet Clément Brulin',
      description: 'Retrouvez votre équilibre physique et émotionnel',
      image: '/lovable-uploads/102000b3-2025-4b41-a012-5eb0faeb4496.png'
    },
    seo: {
      title: 'Site Web Thérapeute Gratuit | Ozymandias Agency',
      description: 'Créez votre site de thérapeute gratuit. Développez votre cabinet avec un site professionnel qui inspire confiance.',
      keywords: ['site web thérapeute', 'thérapie', 'site thérapeute gratuit', 'cabinet thérapie']
    }
  }
};
