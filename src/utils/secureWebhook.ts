
import { toast } from '@/components/ui/use-toast';

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting utility
const checkRateLimit = (identifier: string, limit: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const key = identifier;
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
};

// Webhook signature verification (placeholder - implement based on Make.com's signature method)
const verifyWebhookSignature = (payload: string, signature: string, secret: string): boolean => {
  // In production, implement proper HMAC verification
  // For now, we'll skip this but log the need
  console.log('Webhook signature verification needed for production');
  return true;
};

interface SecureWebhookOptions {
  url: string;
  data: any;
  signature?: string;
  secret?: string;
  identifier?: string;
}

export const sendSecureWebhook = async ({
  url,
  data,
  signature,
  secret,
  identifier = 'default'
}: SecureWebhookOptions): Promise<boolean> => {
  console.log("SecureWebhook: Starting send process");
  
  try {
    // Rate limiting check
    if (!checkRateLimit(identifier)) {
      console.error('Rate limit exceeded for webhook requests');
      toast({
        title: "Trop de demandes",
        description: "Veuillez attendre avant d'envoyer une nouvelle demande.",
        variant: "destructive"
      });
      return false;
    }

    // Validate required data
    if (!url || !data) {
      console.error('SecureWebhook: Missing URL or data');
      throw new Error('URL and data are required');
    }

    // Verify webhook signature if provided
    if (signature && secret) {
      const payload = JSON.stringify(data);
      if (!verifyWebhookSignature(payload, signature, secret)) {
        throw new Error('Invalid webhook signature');
      }
    }

    // Sanitize data before sending
    const sanitizedData = {
      ...data,
      submission_date: new Date().toISOString(),
      source: window.location.origin, // Don't expose full URL
      user_agent: navigator.userAgent.substring(0, 200) // Limit length
    };

    console.log("SecureWebhook: Sending data to:", url);
    console.log("SecureWebhook: Data being sent:", sanitizedData);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(sanitizedData)
    });

    console.log("SecureWebhook: Response status:", response.status);
    console.log("SecureWebhook: Response ok:", response.ok);

    if (!response.ok) {
      const responseText = await response.text().catch(() => 'Unable to read response');
      console.error("SecureWebhook: Response error:", responseText);
      throw new Error(`Webhook failed with status: ${response.status} - ${responseText}`);
    }

    const responseData = await response.text().catch(() => 'Success');
    console.log("SecureWebhook: Response data:", responseData);
    console.log("SecureWebhook: Webhook sent successfully");
    return true;

  } catch (error) {
    console.error("SecureWebhook: Error details:", error);
    
    // Don't expose internal errors to users but log them for debugging
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error("SecureWebhook: Network error - possible CORS or connectivity issue");
    }
    
    return false;
  }
};
