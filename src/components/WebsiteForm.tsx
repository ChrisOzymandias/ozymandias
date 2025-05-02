
import React from 'react';
import { Progress } from './ui/progress';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
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

  return (
    <section id="form" className="py-20 bg-gradient-to-b from-white to-ozy-light/30 relative mt-16">
      <div className="container-custom">
        <h2 className="section-title text-center">Créez Votre <span className="text-gradient">Site Web</span></h2>
        <div className="flex justify-center items-center mb-4">
          <div className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
            PROMO: <span className="line-through text-gray-300 mr-1">499€</span> 99€
          </div>
        </div>
        <p className="section-subtitle text-center mb-10">
          <span className="font-bold text-blue-600 text-lg">Demandez la maquette de votre site gratuitement !!</span>
        </p>

        <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-xl p-6 md:p-8 relative">
          {/* Étiquette "Gratuit" */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-1 rounded-full font-semibold text-sm">
            Maquette gratuite
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

          {/* Afficher les erreurs de soumission */}
          {submissionError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer ultérieurement ou nous contacter directement.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Theme Selection */}
            {currentStep === 0 && (
              <ThemeSelection 
                currentTheme={formData.theme} 
                onThemeSelect={handleThemeSelect} 
                stepTitle={formSteps[currentStep].title} 
                stepDescription={formSteps[currentStep].description} 
              />
            )}

            {/* Step 2: Profession Selection */}
            {currentStep === 1 && (
              <ProfessionSelection 
                currentProfession={formData.profession} 
                onProfessionSelect={handleProfessionSelect} 
                stepTitle={formSteps[currentStep].title} 
                stepDescription={formSteps[currentStep].description} 
              />
            )}

            {/* Step 3: Features Selection */}
            {currentStep === 2 && (
              <FeaturesSelection 
                selectedFeatures={formData.features} 
                onFeatureToggle={handleFeatureToggle} 
                stepTitle={formSteps[currentStep].title} 
                stepDescription={formSteps[currentStep].description} 
              />
            )}

            {/* Step 4: Information Collection */}
            {currentStep === 3 && (
              <InfoForm 
                formData={formData} 
                onInputChange={handleInputChange} 
                stepTitle={formSteps[currentStep].title} 
                stepDescription={formSteps[currentStep].description} 
              />
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
                  className={`inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-medium ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Suivant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={!isStepValid() || isSubmitting} 
                  className={`inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-medium ${!isStepValid() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Obtenir ma maquette gratuite'}
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
