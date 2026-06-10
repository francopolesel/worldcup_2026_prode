import React, { useState } from 'react';
import { usePredictions } from '../context/PredictionsContext';
import { useI18n } from '../context/I18nContext';

export default function UsernameModal() {
  const { username, setUsername } = usePredictions();
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (username) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Por favor ingresá tu nombre / Please enter your name');
      return;
    }
    setUsername(trimmed);
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('app.title')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {t('username.prompt')}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setError(''); }}
            placeholder={t('username.placeholder')}
            autoFocus
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                       placeholder:text-gray-400 dark:placeholder:text-gray-500
                       transition-colors"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                       text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200
                       active:scale-[0.98]"
          >
            {t('username.start')}
          </button>
        </form>
      </div>
    </div>
  );
}
