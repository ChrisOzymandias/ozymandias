
import { useState } from 'react';
import { FormData, initialFormData, formSteps } from '../constants';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useWebsiteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [progress, setProgress] = useState(25);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleThemeSelect = (themeId: string) => {
    setFormData({ ...formData, theme: themeId });
  };

  const handleProfessionSelect = (professionId: string) => {
    setFormData({ ...formData, profession: professionId });
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
        return !!formData.profession;
      case 2:
        return true; // Features step is always valid
      case 3:
        return !!formData.name && !!formData.email && !!formData.projectDetails;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare the data for submission
      const requestData = {
        theme: formData.theme,
        profession: formData.profession,
        features: formData.features,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company_name: formData.companyName || null,
        project_details: formData.projectDetails
      };
      
      const { error } = await supabase
        .from('website_requests')
        .insert([requestData]);
      
      if (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
          variant: "destructive"
        });
        return;
      }
      
      // Show success message
      toast({
        title: "Demande envoyée !",
        description: "Nous avons bien reçu votre demande et vous contacterons dans les plus brefs délais.",
      });
      
      // Reset form after submission
      setFormData(initialFormData);
      setCurrentStep(0);
      setProgress(25);
      
    } catch (error) {
      console.error("Error in form submission:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    formData,
    progress,
    isSubmitting,
    formSteps,
    handleThemeSelect,
    handleProfessionSelect,
    handleFeatureToggle,
    handleInputChange,
    nextStep,
    prevStep,
    isStepValid,
    handleSubmit,
  };
};
