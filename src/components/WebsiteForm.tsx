
import { useState } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from '../components/ui/use-toast';

// Define the form steps
const formSteps = [
  {
    id: 'theme',
    title: 'Thématique du site',
    description: 'Quel type de site souhaitez-vous créer ?',
  },
  {
    id: 'style',
    title: 'Style du site',
    description: 'Quel design correspond le mieux à votre image ?',
  },
  {
    id: 'features',
    title: 'Fonctionnalités',
    description: 'Quelles fonctionnalités souhaitez-vous inclure ?',
  },
  {
    id: 'info',
    title: 'Vos informations',
    description: 'Parlez-nous un peu de vous et de votre projet',
  },
];

// Website themes
const websiteThemes = [
  { id: 'business', name: 'Site vitrine entreprise', icon: '🏢' },
  { id: 'ecommerce', name: 'Boutique en ligne', icon: '🛒' },
  { id: 'portfolio', name: 'Portfolio/CV', icon: '📁' },
  { id: 'blog', name: 'Blog/Magazine', icon: '📝' },
  { id: 'landing', name: 'Landing page', icon: '🚀' },
  { id: 'event', name: 'Événement', icon: '📅' },
];

// Website styles
const websiteStyles = [
  { id: 'modern', name: 'Moderne & Épuré', icon: '⚪' },
  { id: 'creative', name: 'Créatif & Audacieux', icon: '🎨' },
  { id: 'luxury', name: 'Premium & Élégant', icon: '✨' },
  { id: 'tech', name: 'High-Tech & Innovant', icon: '💻' },
  { id: 'fun', name: 'Fun & Décontracté', icon: '😊' },
  { id: 'classic', name: 'Classique & Traditionnel', icon: '📜' },
];

// Website features
const websiteFeatures = [
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

const WebsiteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    theme: '',
    style: '',
    features: [] as string[],
    name: '',
    email: '',
    phone: '',
    companyName: '',
    projectDetails: '',
  });
  const [progress, setProgress] = useState(25);

  const handleThemeSelect = (themeId: string) => {
    setFormData({ ...formData, theme: themeId });
  };

  const handleStyleSelect = (styleId: string) => {
    setFormData({ ...formData, style: styleId });
  };

  const handleFeatureToggle = (featureId: string) => {
    if (formData.features.includes(featureId)) {
      setFormData({
        ...formData,
        features: formData.features.filter((id) => id !== featureId),
      });
    } else {
      setFormData({
        ...formData,
        features: [...formData.features, featureId],
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress((currentStep + 2) * (100 / formSteps.length));
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress((currentStep) * (100 / formSteps.length));
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return !!formData.theme;
      case 1:
        return !!formData.style;
      case 2:
        return true; // Features step is always valid
      case 3:
        return !!formData.name && !!formData.email && !!formData.projectDetails;
      default:
        return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Formulaire envoyé !",
      description: "Nous vous contacterons dans les plus brefs délais pour discuter de votre projet.",
    });
    
    console.log('Form submitted:', formData);
    
    // Reset form after submission
    setFormData({
      theme: '',
      style: '',
      features: [],
      name: '',
      email: '',
      phone: '',
      companyName: '',
      projectDetails: '',
    });
    setCurrentStep(0);
    setProgress(25);
  };

  return (
    <section id="form" className="py-20 bg-gradient-to-b from-white to-ozy-light/30">
      <div className="container-custom">
        <h2 className="section-title text-center">Créez Votre <span className="text-gradient">Site Web</span></h2>
        <p className="section-subtitle text-center">
          Répondez à quelques questions pour nous aider à comprendre vos besoins et commencer la création de votre site
        </p>

        <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-xl p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {formSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`text-sm ${currentStep >= index ? 'text-ozy font-medium' : 'text-gray-400'}`}
                >
                  {step.title}
                </div>
              ))}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-ozy rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Theme Selection */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{formSteps[currentStep].title}</h3>
                <p className="text-gray-600">{formSteps[currentStep].description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {websiteThemes.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      className={`p-4 border-2 rounded-xl flex items-center hover:border-ozy hover:bg-ozy-light/30 transition-all ${
                        formData.theme === theme.id ? 'border-ozy bg-ozy-light/50' : 'border-gray-200'
                      }`}
                      onClick={() => handleThemeSelect(theme.id)}
                    >
                      <span className="text-2xl mr-3">{theme.icon}</span>
                      <span className="font-medium">{theme.name}</span>
                      {formData.theme === theme.id && (
                        <Check className="ml-auto h-5 w-5 text-ozy" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Style Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{formSteps[currentStep].title}</h3>
                <p className="text-gray-600">{formSteps[currentStep].description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {websiteStyles.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      className={`p-4 border-2 rounded-xl flex items-center hover:border-ozy hover:bg-ozy-light/30 transition-all ${
                        formData.style === style.id ? 'border-ozy bg-ozy-light/50' : 'border-gray-200'
                      }`}
                      onClick={() => handleStyleSelect(style.id)}
                    >
                      <span className="text-2xl mr-3">{style.icon}</span>
                      <span className="font-medium">{style.name}</span>
                      {formData.style === style.id && (
                        <Check className="ml-auto h-5 w-5 text-ozy" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Features Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{formSteps[currentStep].title}</h3>
                <p className="text-gray-600">{formSteps[currentStep].description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {websiteFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className={`p-4 border-2 rounded-xl flex items-center ${
                        feature.included 
                          ? 'border-green-200 bg-green-50 cursor-default'
                          : formData.features.includes(feature.id)
                            ? 'border-ozy bg-ozy-light/50'
                            : 'border-gray-200 hover:border-ozy hover:bg-ozy-light/30 cursor-pointer'
                      }`}
                      onClick={() => !feature.included && handleFeatureToggle(feature.id)}
                    >
                      <span className="font-medium">{feature.name}</span>
                      {feature.included && (
                        <div className="ml-auto flex items-center text-green-600">
                          <Check className="h-5 w-5" />
                          <span className="ml-1 text-sm">Inclus</span>
                        </div>
                      )}
                      {!feature.included && formData.features.includes(feature.id) && (
                        <Check className="ml-auto h-5 w-5 text-ozy" />
                      )}
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                  Les fonctionnalités marquées comme "Inclus" font partie du package de base.
                  Les autres fonctionnalités peuvent entraîner des frais supplémentaires selon la complexité.
                </p>
              </div>
            )}

            {/* Step 4: Information Collection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{formSteps[currentStep].title}</h3>
                <p className="text-gray-600">{formSteps[currentStep].description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozy focus:border-ozy"
                      placeholder="Votre nom et prénom"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozy focus:border-ozy"
                      placeholder="votreemail@exemple.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozy focus:border-ozy"
                      placeholder="Votre numéro de téléphone"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozy focus:border-ozy"
                      placeholder="Nom de votre entreprise (si applicable)"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Détails du projet *</label>
                    <textarea
                      name="projectDetails"
                      required
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-ozy focus:border-ozy"
                      placeholder="Décrivez brièvement votre projet et vos attentes..."
                    ></textarea>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">
                  * Champs obligatoires
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center text-gray-600 hover:text-ozy transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < formSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`btn-primary ${
                    !isStepValid() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Suivant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid()}
                  className={`btn-primary ${
                    !isStepValid() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Envoyer ma demande
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WebsiteForm;
