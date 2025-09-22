import React from 'react';
import { CONCEPT_KEYS, CONCEPT_ICONS } from '../constants';
import { useI18n } from '../lib/i18n';

interface ConceptCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 flex flex-col items-start gap-4 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const KeyConcepts: React.FC = () => {
  const { t } = useI18n();

  return (
    <section id="concepts">
      <h2 className="text-3xl font-bold text-center mb-12 text-cyan-300">{t('concepts.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CONCEPT_KEYS.map((key) => {
          const IconComponent = CONCEPT_ICONS[key];
          return (
            <ConceptCard 
              key={key} 
              title={t(`concepts.${key}.title`)} 
              description={t(`concepts.${key}.description`)}
              icon={<IconComponent />}
            />
          )
        })}
      </div>
    </section>
  );
};

export default KeyConcepts;