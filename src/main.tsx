import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.component';
import { worker } from '~/mocks/browser';
import { AuthProvider } from '../src/context/authProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './i18n/i18n';

import './index.css';
// const query = new QueryClient();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// Don't use MSW when docker running, only during local development.
// if (import.meta.env.VITE_USE_MSW) {
//   const { worker } = await import('~/mocks/browser');
//   worker.start();
// }

worker.start();
