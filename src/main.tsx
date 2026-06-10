import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PredictionsProvider } from './context/PredictionsContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import { t, getLocaleFromStorage } from './utils/i18n';

const locale = getLocaleFromStorage();
const confirmResetMessage = t('app.reset.confirm', locale);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <PredictionsProvider confirmResetMessage={confirmResetMessage}>
          <App />
        </PredictionsProvider>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
