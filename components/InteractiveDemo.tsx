import React, { useState, useCallback } from 'react';
import { classifySentiment } from '../services/geminiService';
import { Sentiment } from '../types';
import { useI18n } from '../lib/i18n';

const SentimentResult: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
  const { t } = useI18n();
  if (sentiment === Sentiment.Unknown) {
    return null;
  }

  const sentimentStyles: { [key in Sentiment]: string } = {
    [Sentiment.Positive]: 'bg-green-500/20 text-green-300 border-green-500',
    [Sentiment.Negative]: 'bg-red-500/20 text-red-300 border-red-500',
    [Sentiment.Neutral]: 'bg-gray-500/20 text-gray-300 border-gray-500',
    [Sentiment.Unknown]: 'hidden',
  };

  return (
    <div className={`mt-6 p-4 border rounded-lg text-center ${sentimentStyles[sentiment]}`}>
      <span className="font-bold text-lg">{t('demo.sentiment_label')} {t(`demo.sentiments.${sentiment.toLowerCase()}`)}</span>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-lg">
    <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

const InteractiveDemo: React.FC = () => {
  const { t } = useI18n();
  const [inputText, setInputText] = useState<string>('');
  const [sentiment, setSentiment] = useState<Sentiment>(Sentiment.Unknown);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleClassify = useCallback(async () => {
    if (!inputText || isLoading) return;

    setIsLoading(true);
    setError(null);
    setSentiment(Sentiment.Unknown);

    try {
      const result = await classifySentiment(inputText);
      setSentiment(result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(t('demo.error_message', { message: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading, t]);

  return (
    <section id="demo" className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-300">{t('demo.title')}</h2>
      <p className="text-center text-gray-400 mb-8">
        {t('demo.description')}
      </p>

      <div className="relative">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('demo.placeholder')}
            className="w-full h-32 p-3 bg-slate-800 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-gray-200 resize-none"
            disabled={isLoading}
          />
          <button
            onClick={handleClassify}
            disabled={isLoading || !inputText.trim()}
            className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? t('demo.button_analyzing') : t('demo.button_classify')}
          </button>

          {error && <p className="mt-4 text-center text-red-400">{error}</p>}
          <SentimentResult sentiment={sentiment} />
        </div>
        {isLoading && <LoadingSpinner />}
      </div>
    </section>
  );
};

export default InteractiveDemo;