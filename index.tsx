import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Corrected the import path for App.tsx to be a relative path.
import App from './App';
import { ToastProvider } from './hooks/useToast';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
