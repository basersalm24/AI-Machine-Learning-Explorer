import React from 'react';
import { useI18n } from '../lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useI18n();

  return (
    <header className="relative text-center py-12 md:py-20">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
        {t('header.title')}
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
        {t('header.subtitle')}
      </p>
    </header>
  );
};

export default Header;