import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale } from '../types';
import { t as translate, getLocaleFromStorage } from '../utils/i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getLocaleFromStorage);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('prode-locale', newLocale);
    // Update URL param for sharing
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLocale);
    window.history.replaceState(null, '', url.toString());
  }, []);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    return translate(key, locale, params);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
