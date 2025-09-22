import React from 'react';
import { useI18n } from '../lib/i18n';

const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="text-center py-8 mt-16 border-t border-slate-800">
      <p className="text-gray-500">
        {t('footer.built_with')}
      </p>
    </footer>
  );
};

export default Footer;