import React, { useState, useEffect } from 'react';
import { usePredictions } from './context/PredictionsContext';
import { useI18n } from './context/I18nContext';
import UsernameModal from './components/UsernameModal';
import GroupStage from './components/GroupStage';
import ShareButton from './components/ShareButton';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';

export default function App() {
  const { username, resetAll } = usePredictions();
  const { t } = useI18n();
  const [tab, setTab] = useState<'groups' | 'knockout'>('groups');

  if (!username) {
    return <UsernameModal />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('app.title')}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                {username}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <ShareButton />
              <button
                onClick={resetAll}
                className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2 py-1"
                title="Reset"
              >
                ✕
              </button>
            </div>
          </div>
          {/* Tab navigation */}
          <nav className="flex gap-4 mt-2">
            <button
              onClick={() => setTab('groups')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                tab === 'groups'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {t('group.title')}
            </button>
            <button
              onClick={() => setTab('knockout')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                tab === 'knockout'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {t('knockout.title')}
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {tab === 'groups' ? <GroupStage /> : <KnockoutStage />}
      </main>
      
      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 dark:text-gray-600">
        {t('app.subtitle')}
      </footer>
    </div>
  );
}

// Lazy placeholder — will be replaced by the actual KnockoutStage component
function KnockoutStage() {
  const [comp, setComp] = React.useState<React.ReactNode>(null);
  useEffect(() => {
    import('./components/KnockoutStage').then(m => setComp(React.createElement(m.default)));
  }, []);
  return comp || <div className="text-center py-12 text-gray-400">Loading...</div>;
}
