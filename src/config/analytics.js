export const POSTHOG_CONFIG = {
  apiKey: import.meta.env.VITE_POSTHOG_API_KEY,
  apiHost: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,  // or your self-hosted instance URL
  debug: import.meta.env.DEV, // Enable debug mode in development
  persistence: 'localStorage',
  autocapture: false // Disable automatic event capture
} 