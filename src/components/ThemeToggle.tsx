import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      title={t('theme.' + theme)}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
