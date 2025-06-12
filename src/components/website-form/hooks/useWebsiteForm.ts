
import { useState } from 'react';
import { FormData, initialFormData, formSteps } from '../constants';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// URL du webhook Make
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
    console.log("Démarrage de l'envoi du formulaire vers Make.com");
    
    try {
      // Préparer les données exactement comme attendu par votre module JSON Make.com
      const payloadForMake = {
        theme: formData.theme,
        profession: formData.profession,
        features: formData.features.join(', '), // String comme défini dans Make
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName || '',
        has_existing_website: formData.hasExistingWebsite || '',
        website_expectation: formData.websiteExpectation || '',
        launch_timeline: formData.launchTimeline || '',
        status: 'new', // Ajout du champ status
        submission_date: new Date().toISOString(),
        source: 'ozymandias-website'
      };
      
      console.log("Données à envoyer:", payloadForMake);
      
      // Envoi direct sans wrapper 'json' puisque Make.com gère déjà la structure
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadForMake)
      });
      
      console.log("Statut de la réponse Make.com:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Erreur inconnue');
        console.error("Erreur de la réponse:", errorText);
        throw new Error(`Erreur webhook: ${response.status}`);
      }
      
      console.log("Formulaire envoyé avec succès vers Make.com");
      
      // Message de succès
      toast({
        title: "Demande envoyée !",
        description: "Nous avons bien reçu votre demande et vous contacterons dans les plus brefs délais.",
      });
      
      // Réinitialiser le formulaire
      setFormData(initialFormData);
      setCurrentStep(0);
      setProgress(25);
      
      // Redirection vers la page de remerciement
      console.log("Redirection vers la page de remerciement");
      navigate('/merci', { state: { fromForm: true } });
      
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      
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
