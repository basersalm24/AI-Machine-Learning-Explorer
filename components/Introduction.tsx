import React from 'react';
import { useI18n } from '../lib/i18n';

const Introduction: React.FC = () => {
  const { t } = useI18n();
  return (
    <section id="introduction" className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-300">{t('introduction.title')}</h2>
      <div className="text-lg text-gray-300 leading-relaxed space-y-6">
        <p>
          <strong>{t('introduction.ai_term')}</strong> {t('introduction.ai_definition')}
        </p>
        <p>
          <strong>{t('introduction.ml_term')}</strong> {t('introduction.ml_definition')}
        </p>
      </div>
    </section>
  );
};

export default Introduction;