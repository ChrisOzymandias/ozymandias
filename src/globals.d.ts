
interface Window {
  fbq: (
    method: string,
    eventName: string,
    params?: Record<string, any>
  ) => void;
}

// Add more global types as needed
