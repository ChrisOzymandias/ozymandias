
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
      console.log("Données envoyées avec succès au webhook Make");
      
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
      return [];
    }

    setIsLoading(true);
    try {
      console.log(`Tentative de récupération de données depuis Make: ${webhookUrl}`);
      
      // Pour récupérer des données du webhook Make, on utilise une requête GET
      // avec un paramètre action pour indiquer ce qu'on veut
      let url = webhookUrl;
      if (!url.includes('?')) {
        url += '?action=get_requests';
      } else if (!url.includes('action=')) {
        url += '&action=get_requests';
      }
      
      // Ajout d'un cache-buster pour éviter la mise en cache
      url += `&_t=${Date.now()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store',
          'Pragma': 'no-cache'
        }
      });
      
      console.log("Réponse du webhook:", response);
      
      // Gérer les erreurs HTTP
      if (!response.ok) {
        console.log("Erreur HTTP détectée, statut:", response.status);
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      
      // Essayer de récupérer les données JSON
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          console.log("Données reçues du webhook:", data);
          
          if (options?.onSuccess) {
            options.onSuccess(data);
          }
          
          return data;
        } else {
          console.log("La réponse n'est pas au format JSON");
          throw new Error("Format de réponse non supporté");
        }
      } catch (jsonError) {
        console.log("Erreur lors de l'analyse du JSON:", jsonError);
        throw new Error("Impossible de traiter la réponse du webhook");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération depuis le webhook:", error);
      
      // Générer des données de démonstration pour permettre l'affichage du dashboard
      // même en cas d'échec de la récupération des données
      const mockData = [
        {
          id: "1",
          name: "Jean Dupont (mode démo)",
          email: "jean@example.com",
          phone: "0601020304",
          theme: "e-commerce",
          profession: "restaurateur",
          status: "new",
          created_at: new Date().toISOString(),
          features: ["contact-form", "gallery"]
        },
        {
          id: "2",
          name: "Marie Martin (mode démo)",
          email: "marie@example.com",
          phone: "0612345678",
          theme: "portfolio",
          profession: "photographe",
          status: "quote_sent",
          quote_amount: 450,
          created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
          features: ["gallery", "contact-form"]
        },
        {
          id: "3",
          name: "Paul Durand (mode démo)",
          email: "paul@example.com",
          phone: "0687654321",
          theme: "business",
          profession: "consultant",
          status: "completed",
          quote_amount: 990,
          created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
          features: ["blog", "contact-form", "newsletter"]
        }
      ];
      
      toast({
        title: "Mode démonstration",
        description: "Impossible de récupérer les données du webhook. Affichage des données de démonstration.",
        variant: "default", // Changed from "warning" to "default" to fix the type error
      });
      
      if (options?.onSuccess) {
        options.onSuccess(mockData);
      }
      
      if (options?.onError && error instanceof Error) {
        options.onError(error);
      }
      
      return mockData;
    } finally {
      setIsLoading(false);
    }
  };

  return { receiveFromWebhook, isLoading };
};
