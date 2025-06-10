
import { useState } from 'react';
import { FormData, initialFormData, formSteps } from '../constants';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// URL du webhook Make - envoi direct simple
const WEBHOOK_URL = 'https://hook.eu2.make.com/siguy1hwro8e64oo0v8r4wv89vkv3npu';

export const useWebsiteForm = () => {
  const navigate = useNavigate();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        return !!formData.name && !!formData.email && !!formData.phone;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    console.log("Starting simple form submission to Make.com");
    
    try {
      // Préparer les données pour Make.com
      const requestData = {
        theme: formData.theme,
        profession: formData.profession,
        features: formData.features,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName || '',
        has_existing_website: formData.hasExistingWebsite || '',
        website_expectation: formData.websiteExpectation || '',
        launch_timeline: formData.launchTimeline || '',
        submission_date: new Date().toISOString(),
        source: 'ozymandias-website'
      };
      
      console.log("Sending data to Make.com:", requestData);
      
      // Envoi direct vers Make.com
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
      
      console.log("Make.com response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }
      
      console.log("Form submitted successfully to Make.com");
      
      // Afficher un message de succès
      toast({
        title: "Demande envoyée !",
        description: "Nous avons bien reçu votre demande et vous contacterons dans les plus brefs délais.",
      });
      
      // Réinitialiser le formulaire
      setFormData(initialFormData);
      setCurrentStep(0);
      setProgress(25);
      
      // Redirection vers la page de remerciement
      setTimeout(() => {
        console.log("Redirecting to thank you page");
        navigate('/merci', { state: { fromForm: true } });
      }, 500);
      
    } catch (error) {
      console.error("Form submission error:", error);
      
      toast({
        title: "Erreur d'envoi",
        description: "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.",
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
