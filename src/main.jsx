import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css'
import analytics from './utils/analytics'

// Initialize analytics only if API key is available
if (import.meta.env.VITE_POSTHOG_API_KEY) {
  analytics.init();
} else {
  console.warn('PostHog API key not found. Analytics will be disabled.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)