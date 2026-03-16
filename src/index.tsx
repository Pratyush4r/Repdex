/** Module: index.tsx */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { FavoritesProvider } from './context/FavoritesContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root was not found in index.html');
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AccessibilityProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
