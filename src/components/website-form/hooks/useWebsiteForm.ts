import { useState, useCallback } from 'react';
import { FormData, initialFormData, formSteps } from '../constants';

export const useWebsiteForm = (defaultProfession?: string) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    profession: defaultProfession || initialFormData.profession
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleThemeSelect = useCallback((themeId: string) => {
    setFormData(prev => ({ ...prev, theme: themeId }));
  }, []);

  const handleProfessionSelect = useCallback((professionId: string) => {
    setFormData(prev => ({ ...prev, profession: professionId }));
  }, []);

  const handleFeatureToggle = useCallback((featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  }, []);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const isStepValid = useCallback(() => {
    switch (currentStep) {
      case 0: // Theme selection
        return formData.theme !== '';
      case 1: // Profession selection
        return formData.profession !== '';
      case 2: // Features selection
        return true; // Features are optional
      case 3: // Information form
        return formData.name !== '' && formData.email !== '' && formData.phone !== '';
      default:
        return false;
    }
  }, [currentStep, formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isStepValid()) return;
    
    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      console.log('Form data submitted:', formData);
      
      const response = await fetch('/api/submit-website-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }
      
      // Redirect to thank you page or show success message
      window.location.href = '/merci';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionError('Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isStepValid]);

  const progress = ((currentStep + 1) / formSteps.length) * 100;

  return {
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
  };
};
