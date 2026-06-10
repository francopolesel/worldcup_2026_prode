import { useI18n } from '../context/I18nContext';

export default function ShareButton() {
  const { t } = useI18n();
  
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert(t('share.copied'));
    } catch {
      alert(t('share.error'));
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
    >
      {t('share.button')}
    </button>
  );
}
