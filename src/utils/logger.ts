
// Production-safe logging utility
export const logger = {
  info: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.log(`[INFO] ${message}`, data || '');
    }
  },
  
  warn: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  },
  
  error: (message: string, error?: any) => {
    // Always log errors, but sanitize in production
    if (import.meta.env.DEV) {
      console.error(`[ERROR] ${message}`, error);
    } else {
      console.error(`[ERROR] ${message}`);
      // In production, you might want to send to an error reporting service
    }
  },
  
  debug: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }
};
