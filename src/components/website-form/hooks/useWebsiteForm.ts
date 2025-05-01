
import { useState } from 'react';
import { FormData, initialFormData, formSteps } from '../constants';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const useWebsiteForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [progress, setProgress] = useState(25);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

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
    setSubmissionError(null);
    
    console.log("Soumission du formulaire avec les données:", formData);
    
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
        project_details: formData.projectDetails,
        status: 'new'
      };
      
      console.log("Données formatées pour l'insertion:", requestData);
      
      // Insertion directe dans la table website_requests
      const { data, error } = await supabase
        .from('website_requests')
        .insert(requestData)
        .select();
      
      if (error) {
        console.error("Erreur détaillée lors de la soumission:", error);
        setSubmissionError(error.message);
        
        toast({
          title: "Erreur",
          description: `Problème lors de l'envoi du formulaire: ${error.message}`,
          variant: "destructive"
        });
        
        throw error;
      }
      
      console.log("Formulaire soumis avec succès, réponse:", data);
      
      // Show success message
      toast({
        title: "Demande envoyée !",
        description: "Nous avons bien reçu votre demande et vous contacterons dans les plus brefs délais.",
      });
      
      // Reset form after submission
      setFormData(initialFormData);
      setCurrentStep(0);
      setProgress(25);
      
      // Rediriger vers la page de remerciement
      navigate('/merci');
      
    } catch (error: any) {
      console.error("Erreur technique lors de la soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    handleSubmit,
  };
};
