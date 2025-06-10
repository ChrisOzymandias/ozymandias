
import React from 'react';
import { Progress } from './ui/progress';
import { ArrowRight, ArrowLeft, AlertCircle, Check } from 'lucide-react';
import ThemeSelection from './website-form/ThemeSelection';
import ProfessionSelection from './website-form/ProfessionSelection';
import FeaturesSelection from './website-form/FeaturesSelection';
import InfoForm from './website-form/InfoForm';
import { useWebsiteForm } from './website-form/hooks/useWebsiteForm';
import { Alert, AlertDescription } from './ui/alert';

const WebsiteForm = () => {
  const {
    currentStep,
    formData,
    progress,
    isSubmitting,
    submissionError,
    formSteps,
    handleThemeSelect,
    handleProfessionSelect,
    handleFeatureToggle,
    handleInputChange,
    nextStep,
    prevStep,
    isStepValid,
    handleSubmit
  } = useWebsiteForm();
  
  return <section id="form" className="py-20 bg-gradient-to-b from-white to-ozy-light/30 relative">
      <div className="container-custom">
        <h2 className="section-title text-center">Créez Votre <span className="text-gradient">Site Gratuit</span></h2>
        
        {/* Masquer ces éléments sur mobile uniquement */}
        <div className="hidden md:flex justify-center mb-6">
          <div className="flex flex-col md:flex-row items-center bg-green-50 p-4 rounded-lg border border-green-200 text-green-700 max-w-2xl">
            <div className="flex-shrink-0 bg-green-600 text-white p-3 rounded-full mr-4 mb-3 md:mb-0">
              <Check className="h-6 w-6" />
            </div>
            <p className="text-center md:text-left">
              <span className="font-bold">Plus de 700 artisans et PME</span> ont déjà créé leur site gratuitement avec nous. 
              Découvrez pourquoi ils nous font confiance !
            </p>
          </div>
        </div>
        
        {/* Masquer le texte "Demandez..." sur mobile uniquement */}
        <p className="section-subtitle text-center mb-6 hidden md:block">
          <span className="font-bold text-green-600 text-lg">Obtenez votre site web professionnel GRATUITEMENT !</span>
        </p>
        
        {/* Masquer les badges de confiance sur mobile uniquement */}
        <div className="hidden md:flex items-center justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
              <img src="/lovable-uploads/a24f34e6-5866-4fb8-bda3-f4e10c503450.png" alt="Ozymandias Logo" className="h-6 mr-2" />
              <span className="text-sm font-medium">Certifié Ozymandias</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
              <span className="text-yellow-500 mr-1">★★★★★</span>
              <span className="text-sm font-medium">4.9/5 (125 avis)</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
              <span className="text-sm font-medium">Création 100% gratuite</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-4 bg-white rounded-2xl shadow-xl p-6 md:p-8 relative">
          {/* Masquer l'étiquette sur mobile uniquement */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-1 rounded-full font-semibold text-sm hidden md:block">
            100% Gratuit
          </div>
          
          {/* Progress bar with animation */}
          <div className="mb-8">
            {/* Masquer les titres des étapes sur mobile uniquement */}
            <div className="hidden md:flex justify-between mb-2 flex-wrap gap-2 md:gap-0">
              {formSteps.map((step, index) => <div key={index} className={`text-xs md:text-sm px-1.5 ${currentStep >= index ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                  {step.title}
                </div>)}
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-end mt-2">
              <span className="text-sm text-blue-600 font-medium">{progress}% complété</span>
            </div>
          </div>

          {/* Afficher les erreurs de soumission */}
          {submissionError && <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer ultérieurement ou nous contacter directement.
              </AlertDescription>
            </Alert>}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Theme Selection */}
            {currentStep === 0 && <ThemeSelection currentTheme={formData.theme} onThemeSelect={handleThemeSelect} stepTitle={formSteps[currentStep].title} stepDescription={formSteps[currentStep].description} />}

            {/* Step 2: Profession Selection */}
            {currentStep === 1 && <ProfessionSelection currentProfession={formData.profession} onProfessionSelect={handleProfessionSelect} stepTitle={formSteps[currentStep].title} stepDescription={formSteps[currentStep].description} />}

            {/* Step 3: Features Selection */}
            {currentStep === 2 && <FeaturesSelection selectedFeatures={formData.features} onFeatureToggle={handleFeatureToggle} stepTitle={formSteps[currentStep].title} stepDescription={formSteps[currentStep].description} />}

            {/* Step 4: Information Collection */}
            {currentStep === 3 && <InfoForm formData={formData} onInputChange={handleInputChange} stepTitle={formSteps[currentStep].title} stepDescription={formSteps[currentStep].description} />}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 ? <button type="button" onClick={prevStep} className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </button> : <div></div>}
              
              {currentStep < formSteps.length - 1 ? <button type="button" onClick={nextStep} disabled={!isStepValid()} className={`inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-medium ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Suivant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button> : <button type="submit" disabled={!isStepValid() || isSubmitting} className={`inline-flex items-center bg-green-600 text-white hover:bg-green-700 transition-colors px-6 py-3 rounded-full font-medium ${!isStepValid() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Envoi en cours...' : 'Créer mon site gratuit'}
                </button>}
            </div>
          </form>
          
          {/* Trust indicators below the form */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-gray-600">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-green-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Création 100% gratuite
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-green-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sans engagement
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-green-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Livraison en 7 jours
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default WebsiteForm;
