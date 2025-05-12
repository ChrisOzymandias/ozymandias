
// Utility functions for Facebook Meta Pixel events
export const trackPixelEvent = (eventName: string, params?: Record<string, any>) => {
  // Check if fbq is loaded and available
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
    console.log(`FB Pixel: Tracked event "${eventName}"`, params || '');
  } else {
    console.warn('FB Pixel: fbq is not available');
  }
};

// Common events
export const trackLeadEvent = () => {
  trackPixelEvent('Lead');
};

export const trackCompleteRegistration = () => {
  trackPixelEvent('CompleteRegistration');
};

export const trackFormSubmit = (formType: string) => {
  trackPixelEvent('SubmitApplication', { form_type: formType });
};

export const trackButtonClick = (buttonName: string) => {
  trackPixelEvent('Contact', { button_name: buttonName });
};
