import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eraser } from 'lucide-react';
import { useClearCalendar } from '../../hooks/useClearCalendar';

export const ClearCalendarButton: React.FC = () => {
  const { t } = useTranslation();
  const { handleClear } = useClearCalendar();

  return (
    <button
      onClick={handleClear}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
    >
      <Eraser size={16} />
      <span>{t('calendar.clear.button')}</span>
    </button>
  );
};