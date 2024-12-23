import posthog from 'posthog-js'
import { POSTHOG_CONFIG } from '../config/analytics'

class Analytics {
  constructor() {
    this.provider = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized || !POSTHOG_CONFIG.apiKey) return;

    try {
      posthog.init(POSTHOG_CONFIG.apiKey, {
        api_host: POSTHOG_CONFIG.apiHost,
        loaded: (posthog) => {
          if (import.meta.env.DEV) {
            console.log('PostHog Analytics Initialized')
          }
        },
        autocapture: POSTHOG_CONFIG.autocapture,
        persistence: POSTHOG_CONFIG.persistence,
        debug: POSTHOG_CONFIG.debug,
      });

      this.provider = posthog;
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }

  track(eventName, properties = {}) {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      this.provider.capture(eventName, {
        ...properties,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  pageView(properties = {}) {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      this.provider.capture('$pageview', {
        ...properties,
        path: window.location.pathname,
        url: window.location.href,
        title: document.title
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }
}

const analytics = new Analytics();
export default analytics; 