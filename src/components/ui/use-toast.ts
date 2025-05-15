
import { useToast as useToastOriginal, toast as toastOriginal } from "@/hooks/use-toast";

// Version optimisée qui met en file d'attente les toasts pour éviter trop de rendus simultanés
const queuedToasts: any[] = [];
let isProcessingToasts = false;

const processToastQueue = () => {
  if (queuedToasts.length === 0) {
    isProcessingToasts = false;
    return;
  }
  
  isProcessingToasts = true;
  const { message, options } = queuedToasts.shift()!;
  
  toastOriginal({
    ...options,
    message,
    onOpenChange: (open) => {
      options?.onOpenChange?.(open);
      if (!open) {
        // Traiter le prochain toast après un délai
        setTimeout(processToastQueue, 300);
      }
    },
  });
};

// Version optimisée du toast
const toast = (options: any) => {
  queuedToasts.push({ message: options.message || options.title, options });
  
  if (!isProcessingToasts) {
    processToastQueue();
  }
  
  return {
    id: Date.now().toString(),
    dismiss: () => {
      // Implémentation si nécessaire
    },
  };
};

// Réexporter les fonctions originales avec nos versions optimisées
export { useToastOriginal as useToast, toast };
