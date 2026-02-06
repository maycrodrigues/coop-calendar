import React from 'react';
import { useTranslation } from 'react-i18next';
import { Save } from 'lucide-react';
import { useSaveCalendar } from '../../../hooks/calendar/useSaveCalendar';

export const SaveButton: React.FC = () => {
  const { t } = useTranslation();
  const { handleSave, isSaving } = useSaveCalendar();

  return (
    <button
      onClick={handleSave}
      disabled={isSaving}
      className={`
        flex items-center gap-2 px-4 py-2 text-sm font-medium
        ${isSaving
          ? 'bg-green-100 text-green-400 cursor-not-allowed'
          : 'text-green-600 hover:text-green-700 hover:bg-green-50'
        }
        rounded-lg transition-colors duration-200
      `}
    >
      <Save size={16} className={isSaving ? 'animate-spin' : ''} />
      <span>{isSaving ? t('calendar.save.saving') : t('calendar.save.button')}</span>
    </button>
  );
};