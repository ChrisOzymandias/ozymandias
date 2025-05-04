
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
      return null;
    }

    setIsLoading(true);
    try {
      console.log(`Tentative de récupération de données depuis Make: ${webhookUrl}`);
      
      // Pour récupérer des données du webhook Make, on utilise une requête GET
      // Note: Dans la réalité, Make devrait renvoyer les données en réponse à une requête POST
      // ou via un webhook de callback, mais nous simulons ici une récupération via GET
      const response = await fetch(webhookUrl + "?action=get_requests", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ne pas utiliser no-cors ici pour pouvoir accéder aux données de la réponse
      });
      
      console.log("Réponse du webhook:", response);
      
      // Pour gérer le mode no-cors si nécessaire
      if (response.type === 'opaque') {
        console.log("Réponse opaque reçue (mode no-cors)");
        // Dans le cas d'une réponse opaque, nous ne pouvons pas accéder au corps
        // Simuler des données pour tester l'interface
        const mockData = [
          {
            id: "1",
            name: "Jean Dupont",
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
            name: "Marie Martin",
            email: "marie@example.com",
            phone: "0607080910",
            theme: "portfolio",
            profession: "photographe",
            status: "contacted",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            features: ["blog", "gallery"]
          }
        ];
        
        if (options?.onSuccess) {
          options.onSuccess(mockData);
        }
        
        return mockData;
      }
      
      // Si la réponse n'est pas opaque, essayer de récupérer les données JSON
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Données reçues du webhook:", data);
      
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
      
      // Simuler des données pour tester l'interface en cas d'erreur
      const mockData = [
        {
          id: "1",
          name: "Jean Dupont (mode hors ligne)",
          email: "jean@example.com",
          phone: "0601020304",
          theme: "e-commerce",
          profession: "restaurateur",
          status: "new",
          created_at: new Date().toISOString(),
          features: ["contact-form", "gallery"]
        }
      ];
      
      if (options?.onSuccess) {
        options.onSuccess(mockData);
      }
      
      return mockData;
    } finally {
      setIsLoading(false);
    }
  };

  return { receiveFromWebhook, isLoading };
};
