
import { useState } from 'react';
import { FormData, initialFormData, formSteps } from '../constants';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// URL du webhook Make
const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/siguy1hwro8e64oo0v8r4wv89vkv3npu';

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
      // Préparer les données pour l'envoi au webhook Make
      const requestData = {
        theme: formData.theme,
        profession: formData.profession,
        features: formData.features,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company_name: formData.companyName || null,
        project_details: formData.projectDetails,
        status: 'new',
        submission_date: new Date().toISOString(),
        source: window.location.href
      };
      
      console.log("Données formatées pour l'envoi au webhook:", requestData);
      
      // Envoi des données au webhook Make
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        mode: 'no-cors' // Utilisation du mode no-cors pour éviter les problèmes CORS
      });
      
      console.log("Réponse du webhook:", response);
      
      // Afficher un message de succès
      toast({
        title: "Demande envoyée !",
        description: "Nous avons bien reçu votre demande et vous contacterons dans les plus brefs délais.",
      });
      
      // Réinitialiser le formulaire après la soumission
      setFormData(initialFormData);
      setCurrentStep(0);
      setProgress(25);
      
      // Rediriger vers la page de remerciement
      navigate('/merci');
      
    } catch (error: any) {
      console.error("Erreur technique lors de la soumission:", error);
      setSubmissionError("Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.");
      
      toast({
        title: "Erreur",
        description: "Problème lors de l'envoi du formulaire. Veuillez réessayer ultérieurement.",
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
