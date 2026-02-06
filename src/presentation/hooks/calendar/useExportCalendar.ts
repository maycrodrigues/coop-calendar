import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { exportCalendar } from '../../../domain/actions/exportCalendar';
import { SwalConfig, defaultCustomClass } from '../../services/alerts/sweetAlertConfig';
import { JsonDisplay } from '../../components/Export/JsonDisplay';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { useLogger } from '../useLogger';

export const useExportCalendar = () => {
  const { t } = useTranslation();
  const { logAction } = useLogger();

  const handleExport = useCallback(async () => {
    const jsonData = exportCalendar();
    logAction('EXPORT_CALENDAR', 'Exported calendar data');
    
    await SwalConfig.fire({
      title: t('calendar.export.title'),
      html: '<div id="json-display-container"></div>',
      confirmButtonText: t('calendar.export.close'),
      customClass: {
        ...defaultCustomClass,
        htmlContainer: 'break-words',
      },
      didOpen: (modal) => {
        const container = modal.querySelector('#json-display-container');
        if (container) {
          const root = createRoot(container);
          root.render(createElement(JsonDisplay, { jsonData }));
        }
      },
    });
  }, [t, logAction]);

  return { handleExport };
};