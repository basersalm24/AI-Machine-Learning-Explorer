import React from 'react';
import { useI18n } from '../lib/i18n';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale, t } = useI18n();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as 'en' | 'ar' | 'es');
  };

  const languages = [
    { code: 'en', name: t('languages.en') },
    { code: 'ar', name: t('languages.ar') },
    { code: 'es', name: t('languages.es') },
  ];

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={handleLanguageChange}
        className="appearance-none bg-slate-800 border border-slate-700 text-gray-300 text-sm rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        aria-label="Select language"
      >
        {languages.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;