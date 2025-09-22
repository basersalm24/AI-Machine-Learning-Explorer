
import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import KeyConcepts from './components/KeyConcepts';
import InteractiveDemo from './components/InteractiveDemo';
import Footer from './components/Footer';
import { useI18n } from './lib/i18n';

const App: React.FC = () => {
  const { isLoaded } = useI18n();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-cyan-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-300 mt-4 text-lg">Loading Translations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans antialiased">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <div className="space-y-16 md:space-y-24">
          <Introduction />
          <KeyConcepts />
          <InteractiveDemo />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;