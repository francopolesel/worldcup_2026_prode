import { useI18n } from '../context/I18nContext';

export default function KnockoutStage() {
  const { t } = useI18n();
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 dark:text-gray-400">{t('knockout.title')}</p>
    </div>
  );
}
