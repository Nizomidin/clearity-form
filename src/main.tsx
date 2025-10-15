import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PostHogProvider } from "posthog-js/react";

// PostHog configuration with fallback
const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY || 'phc_DsC0xJMYsFNFpBOJYmo3A1RFET5uAVXQFp8yg3DrW9y';
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

// Debug PostHog configuration
console.log('PostHog Config:', {
  key: posthogKey ? 'Set' : 'Missing',
  host: posthogHost,
  mode: import.meta.env.MODE,
  debug: import.meta.env.MODE === "development"
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={posthogKey}
      options={{
        api_host: posthogHost,
        defaults: '2025-05-24',
        capture_exceptions: true,
        debug: import.meta.env.MODE === "development",
      }}
    >
      <App />
    </PostHogProvider>
  </React.StrictMode>
);