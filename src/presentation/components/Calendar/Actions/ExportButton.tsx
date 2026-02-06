import React from 'react';
import { FileJson } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useExportCalendar } from '../../../hooks/calendar/useExportCalendar';

export const ExportButton: React.FC = () => {
  const { t } = useTranslation();
  const { handleExport } = useExportCalendar();

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
    >
      <FileJson size={16} />
      <span>{t('calendar.export.button')}</span>
    </button>
  );
};