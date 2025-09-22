
import React, { createContext, useState, useContext, useMemo, FC, ReactNode, useEffect } from 'react';

type Locale = 'en' | 'ar' | 'es';
type Translations = { [key: string]: any };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
  isLoaded: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const getNestedTranslation = (obj: any, key: string): string | undefined => {
  return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
};

export const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');
  const [translations, setTranslations] = useState<{ [key in Locale]?: Translations }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const [en, ar, es] = await Promise.all([
          fetch('./locales/en.json').then(res => res.json()),
          fetch('./locales/ar.json').then(res => res.json()),
          fetch('./locales/es.json').then(res => res.json())
        ]);
        setTranslations({ en, ar, es });
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };

    fetchTranslations();
  }, []);

  const t = useMemo(
    () =>
      (key: string, params?: { [key: string]: string | number }): string => {
        if (!isLoaded || !translations[locale]) {
          return key;
        }
        
        let translation = getNestedTranslation(translations[locale], key) || key;

        if (params) {
          Object.keys(params).forEach((paramKey) => {
            translation = translation.replace(`{{${paramKey}}}`, String(params[paramKey]));
          });
        }

        return translation;
      },
    [locale, translations, isLoaded]
  );
  
  const value = { locale, setLocale, t, isLoaded };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
