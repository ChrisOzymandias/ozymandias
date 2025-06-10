
import { useState } from 'react';
import { sendSecureWebhook } from '@/utils/secureWebhook';

export const useOutgoingWebhook = (webhookUrl: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendToWebhook = async (data: any, signature?: string, secret?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await sendSecureWebhook({
        url: webhookUrl,
        data,
        signature,
        secret,
        identifier: `webhook_${Date.now()}`
      });
      
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Webhook error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendToWebhook, isLoading, error };
};
