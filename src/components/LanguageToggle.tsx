import { useI18n } from '../context/I18nContext';

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
      className="px-2 py-1 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 
                 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
