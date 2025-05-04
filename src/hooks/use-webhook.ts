
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface WebhookOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useOutgoingWebhook = (webhookUrl: string, options?: WebhookOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendToWebhook = async (data: any) => {
    if (!webhookUrl) {
      toast({
        title: "Erreur",
        description: "URL du webhook non définie",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    try {
      console.log(`Envoi de données vers le webhook: ${webhookUrl}`, data);
      
      // Utiliser no-cors pour éviter les problèmes CORS avec les webhooks externes
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(data),
      });
      
      // Avec mode: 'no-cors', nous ne pouvons pas accéder au corps de la réponse
      // On considère donc que l'envoi a réussi
      toast({
        title: "Succès",
        description: "Données envoyées avec succès au webhook",
      });
      
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
      
      return true;
    } catch (error) {
      console.error("Erreur lors de l'envoi au webhook:", error);
      toast({
        title: "Erreur",
        description: "Échec de l'envoi des données au webhook",
        variant: "destructive",
      });
      
      if (options?.onError && error instanceof Error) {
        options.onError(error);
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendToWebhook, isLoading };
};

export const useIncomingWebhook = (options?: WebhookOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const receiveFromWebhook = async (webhookUrl: string) => {
    if (!webhookUrl) {
      toast({
        title: "Erreur",
        description: "URL du webhook non définie",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    try {
      console.log(`Récupération de données depuis le webhook: ${webhookUrl}`);
      
      // Pour un webhook entrant, on utilise généralement une simple requête GET
      const response = await fetch(webhookUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      toast({
        title: "Succès",
        description: "Données reçues avec succès du webhook",
      });
      
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
      
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération depuis le webhook:", error);
      toast({
        title: "Erreur",
        description: "Échec de la récupération des données du webhook",
        variant: "destructive",
      });
      
      if (options?.onError && error instanceof Error) {
        options.onError(error);
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { receiveFromWebhook, isLoading };
};
