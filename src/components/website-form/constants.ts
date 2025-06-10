
// Define the form steps
export const formSteps = [
  {
    id: 'theme',
    title: 'Thématique du site',
    description: 'Quel type de site souhaitez-vous créer gratuitement ?',
  },
  {
    id: 'profession',
    title: 'Votre Profession',
    description: 'Quel est votre secteur d\'activité ?',
  },
  {
    id: 'features',
    title: 'Fonctionnalités',
    description: 'Quelles fonctionnalités souhaitez-vous inclure ?',
  },
  {
    id: 'info',
    title: 'Vos informations',
    description: 'Vos coordonnées pour recevoir votre site gratuit',
  },
];

// Website themes
export const websiteThemes = [
  { id: 'business', name: 'Site vitrine entreprise', icon: '🏢' },
  { id: 'portfolio', name: 'Portfolio/CV', icon: '📁' },
  { id: 'blog', name: 'Blog/Magazine', icon: '📝' },
  { id: 'landing', name: 'Landing page', icon: '🚀' },
  { id: 'event', name: 'Événement', icon: '📅' },
];

// Profession options for artisans and SMBs
export const professionOptions = [
  { id: 'artisan', name: 'Artisan', icon: '🔨', examples: 'Menuisier, Plombier, Électricien...' },
  { id: 'commerce', name: 'Commerçant', icon: '🏪', examples: 'Boutique, Restaurant, Épicerie...' },
  { id: 'construction', name: 'Bâtiment & Construction', icon: '🏗️', examples: 'Maçon, Charpentier, Peintre...' },
  { id: 'services', name: 'Services', icon: '💼', examples: 'Consultant, Coach, Formateur...' },
  { id: 'beaute', name: 'Beauté & Bien-être', icon: '💇', examples: 'Coiffeur, Esthéticienne, Massage...' },
  { id: 'sante', name: 'Santé', icon: '⚕️', examples: 'Médecin, Kiné, Ostéopathe...' },
  { id: 'tech', name: 'Tech & Digital', icon: '💻', examples: 'Développeur, Designer, Marketing...' },
  { id: 'autre', name: 'Autre secteur', icon: '🔍', examples: 'Précisez votre activité...' },
];

// Website features
export const websiteFeatures = [
  { id: 'contact', name: 'Formulaire de contact', included: true },
  { id: 'seo', name: 'Optimisation SEO', included: true },
  { id: 'analytics', name: 'Google Analytics', included: true },
  { id: 'social', name: 'Intégration réseaux sociaux', included: true },
  { id: 'blog', name: 'Section blog/actualités', included: false },
  { id: 'gallery', name: 'Galerie photos/portfolio', included: false },
  { id: 'booking', name: 'Système de réservation', included: false },
  { id: 'newsletter', name: 'Inscription newsletter', included: false },
  { id: 'multilang', name: 'Multi-langues', included: false },
  { id: 'chat', name: 'Chat/Messagerie en direct', included: false },
];

export interface FormData {
  theme: string;
  profession: string;
  features: string[];
  name: string;
  email: string;
  phone: string;
  companyName: string;
  hasExistingWebsite: string;
  websiteExpectation: string;
  launchTimeline: string;
  projectDetails: string; // Gardé pour compatibilité
}

export const initialFormData: FormData = {
  theme: '',
  profession: '',
  features: [],
  name: '',
  email: '',
  phone: '',
  companyName: '',
  hasExistingWebsite: '',
  websiteExpectation: '',
  launchTimeline: '',
  projectDetails: '', // Gardé pour compatibilité
};
