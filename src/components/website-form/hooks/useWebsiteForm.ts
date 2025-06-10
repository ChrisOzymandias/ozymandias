import { useState } from 'react';
import { FormData, initialFormData, formSteps } from '../constants';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useOutgoingWebhook } from '@/hooks/use-webhook';
import { validateAndSanitizeFormData } from '@/utils/validation';

// URL du webhook Make - maintenant sécurisé
const WEBHOOK_URL = 'https://hook.eu2.make.com/siguy1hwro8e64oo0v8r4wv89vkv3npu';

export const useWebsiteForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [progress, setProgress] = useState(25);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  // Utiliser notre hook sécurisé pour le webhook
  const { sendToWebhook, isLoading: isSendingToWebhook, error: webhookError } = useOutgoingWebhook(WEBHOOK_URL);

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
    setSubmissionError(null);
    
    console.log("Starting form submission with validation");
    
    try {
      // Validate and sanitize form data
      const validatedData = validateAndSanitizeFormData(formData);
      console.log("Form data validated successfully:", validatedData);
      
      // Préparer les données sécurisées pour l'envoi
      const requestData = {
        theme: validatedData.theme,
        profession: validatedData.profession,
        features: validatedData.features,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company_name: validatedData.companyName || null,
        has_existing_website: validatedData.hasExistingWebsite || null,
        website_expectation: validatedData.websiteExpectation || null,
        launch_timeline: validatedData.launchTimeline || null,
        status: 'new',
        submission_date: new Date().toISOString()
      };
      
      console.log("Sending validated data to secure webhook");
      
      // Envoyer les données via le webhook sécurisé
      const webhookResult = await sendToWebhook(requestData);
      
      if (!webhookResult) {
        console.error("Webhook failed, error from hook:", webhookError);
        throw new Error("Failed to submit form data");
      }
      
      console.log("Form submitted successfully");
      
      // Afficher un message de succès
      toast({
        title: "Demande envoyée !",
        description: "Nous avons bien reçu votre demande et vous contacterons dans les plus brefs délais.",
      });
      
      // Réinitialiser le formulaire
      setFormData(initialFormData);
      setCurrentStep(0);
      setProgress(25);
      
      // Redirection sécurisée vers la page de remerciement
      setTimeout(() => {
        console.log("Redirecting to thank you page");
        navigate('/merci', { state: { fromForm: true } });
      }, 500);
      
    } catch (error) {
      console.error("Form submission error:", error);
      
      // Message d'erreur plus spécifique
      let errorMessage = "Une erreur s'est produite lors de l'envoi du formulaire.";
      
      if (error instanceof Error) {
        if (error.message.includes('validation')) {
          errorMessage = "Veuillez vérifier vos informations et réessayer.";
        } else if (error.message.includes('Failed to submit')) {
          errorMessage = "Problème de connexion. Veuillez réessayer dans quelques instants.";
        }
      }
        
      setSubmissionError(errorMessage);
      
      toast({
        title: "Erreur d'envoi",
        description: errorMessage,
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
    isSubmitting: isSubmitting || isSendingToWebhook,
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
