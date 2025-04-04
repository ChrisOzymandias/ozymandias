
import { useState, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft, Tag, Star, Trophy } from 'lucide-react';
import { toast } from '../components/ui/use-toast';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

// Define the form steps
const formSteps = [
  {
    id: 'theme',
    title: 'Thématique du site',
    description: 'Quel type de site souhaitez-vous créer ?',
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

// Profession options for artisans and SMBs
const professionOptions = [
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
    profession: '',
    features: [] as string[],
    name: '',
    email: '',
    phone: '',
    companyName: '',
    projectDetails: '',
  });
  const [progress, setProgress] = useState(25);
  const [completionPoints, setCompletionPoints] = useState(0);
  const [showCompletionToast, setShowCompletionToast] = useState(false);

  useEffect(() => {
    // Calculate completion points based on filled fields
    let points = 0;
    if (formData.theme) points += 25;
    if (formData.profession) points += 25;
    if (formData.features.length > 0) points += Math.min(formData.features.length * 5, 25);
    if (formData.name && formData.email && formData.projectDetails) points += 25;
    
    setCompletionPoints(points);
    
    // Show completion toast when reaching milestones
    if (points >= 75 && !showCompletionToast) {
      toast({
        title: "Presque terminé !",
        description: "Vous êtes à 75% du chemin. Continuez pour finaliser votre demande !",
      });
      setShowCompletionToast(true);
    }
  }, [formData]);

  const handleThemeSelect = (themeId: string) => {
    setFormData({ ...formData, theme: themeId });
    
    // Show encouraging toast when selecting a theme
    toast({
      title: "Bon choix !",
      description: "Ce type de site est parfait pour développer votre activité en ligne.",
    });
  };

  const handleProfessionSelect = (professionId: string) => {
    setFormData({ ...formData, profession: professionId });
    
    // Show encouraging toast when selecting a profession
    toast({
      title: "Excellent !",
      description: "Nous avons de l'expérience dans votre secteur d'activité.",
    });
  };

  const handleFeatureToggle = (featureId: string) => {
    if (formData.features.includes(featureId)) {
      setFormData({
        ...formData,
        features: formData.features.filter((id) => id !== featureId),
      });
    } else {
      const newFeatures = [...formData.features, featureId];
      setFormData({
        ...formData,
        features: newFeatures,
      });
      
      // Show encouraging toast after selecting several features
      if (newFeatures.length === 3) {
        toast({
          title: "Super choix !",
          description: "Ces fonctionnalités rendront votre site vraiment attractif !",
        });
      }
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
      
      // Show motivational toast when advancing steps
      const stepMessages = [
        "Vous avancez bien ! Continuons avec votre profession.",
        "C'est parfait ! Personnalisons maintenant votre site.",
        "Dernière étape ! Plus que quelques détails et c'est fini.",
      ];
      
      toast({
        title: "Étape complétée !",
        description: stepMessages[currentStep],
      });
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
        return !!formData.profession;
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
    
    // Simulate form submission with celebratory toast
    toast({
      title: "Félicitations ! 🎉",
      description: "Votre demande a été envoyée avec succès. Nous vous contacterons très rapidement !",
      variant: "default",
    });
    
    console.log('Form submitted:', formData);
    
    // Reset form after submission
    setFormData({
      theme: '',
      profession: '',
      features: [],
      name: '',
      email: '',
      phone: '',
      companyName: '',
      projectDetails: '',
    });
    setCurrentStep(0);
    setProgress(25);
    setShowCompletionToast(false);
  };

  return (
    <section id="form" className="py-20 bg-gradient-to-b from-white to-ozy-light/30">
      <div className="container-custom">
        <h2 className="section-title text-center">Créez Votre <span className="text-gradient">Site Web</span></h2>
        <div className="flex justify-center items-center mb-4">
          <Badge variant="outline" className="text-sm bg-blue-500 text-white px-4 py-2 flex items-center gap-2">
            <Tag size={16} /> PROMO: <span className="line-through text-gray-300 mr-1">499€</span> 99€
          </Badge>
        </div>
        <p className="section-subtitle text-center">
          Répondez à quelques questions pour nous aider à comprendre vos besoins et commencer la création de votre site
        </p>

        <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Gamification elements */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Votre avancement</h3>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-bold text-blue-600">{completionPoints}/100 points</span>
            </div>
          </div>
          
          {/* Progress bar with animation */}
          <div className="mb-8">
            <div className="flex justify-between mb-2 flex-wrap gap-2 md:gap-0">
              {formSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`text-xs md:text-sm px-1.5 ${currentStep >= index ? 'text-blue-600 font-medium' : 'text-gray-400'}`}
                >
                  {step.title}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-end mt-2">
              <span className="text-sm text-blue-600 font-medium">{progress}% complété</span>
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
                      className={`p-4 border-2 rounded-xl flex items-center hover:border-blue-500 hover:bg-blue-50 transition-all ${
                        formData.theme === theme.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleThemeSelect(theme.id)}
                    >
                      <span className="text-2xl mr-3">{theme.icon}</span>
                      <span className="font-medium">{theme.name}</span>
                      {formData.theme === theme.id && (
                        <Check className="ml-auto h-5 w-5 text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
                
                {formData.theme && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center">
                    <Star className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm text-blue-700">
                      <span className="font-medium">+25 points</span> - Excellent choix !
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Profession Selection (replaced Style) */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{formSteps[currentStep].title}</h3>
                <p className="text-gray-600">{formSteps[currentStep].description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {professionOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`p-4 border-2 rounded-xl flex flex-col items-start hover:border-blue-500 hover:bg-blue-50 transition-all ${
                        formData.profession === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleProfessionSelect(option.id)}
                    >
                      <div className="flex items-center w-full">
                        <span className="text-2xl mr-3">{option.icon}</span>
                        <span className="font-medium">{option.name}</span>
                        {formData.profession === option.id && (
                          <Check className="ml-auto h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{option.examples}</span>
                    </button>
                  ))}
                </div>
                
                {formData.profession && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center">
                    <Star className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm text-blue-700">
                      <span className="font-medium">+25 points</span> - Votre site sera optimisé pour votre secteur !
                    </span>
                  </div>
                )}
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
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
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
                        <Check className="ml-auto h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
                
                {formData.features.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center">
                    <Star className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm text-blue-700">
                      <span className="font-medium">+{Math.min(formData.features.length * 5, 25)} points</span> - 
                      {formData.features.length >= 3 ? " Superbe choix de fonctionnalités !" : " Chaque fonctionnalité améliore votre site !"}
                    </span>
                  </div>
                )}
                
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Décrivez brièvement votre projet et vos attentes..."
                    ></textarea>
                  </div>
                </div>
                
                {formData.name && formData.email && formData.projectDetails && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center">
                    <Star className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm text-blue-700">
                      <span className="font-medium">+25 points</span> - Parfait ! Nous avons tout ce qu'il nous faut.
                    </span>
                  </div>
                )}
                
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
                  className="flex items-center text-gray-600 hover:text-blue-500 transition-colors"
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
                  className={`inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-medium ${
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
                  className={`inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-medium ${
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
