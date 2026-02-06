import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { exportCalendar } from '../../domain/actions/exportCalendar';
import { SwalConfig } from '../services/alerts/sweetAlertConfig';
import { JsonDisplay } from '../components/Export/JsonDisplay';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

export const useExportCalendar = () => {
  const { t } = useTranslation();

  const handleExport = useCallback(async () => {
    const jsonData = exportCalendar();
    
    await SwalConfig.fire({
      title: t('calendar.export.title'),
      html: '<div id="json-display-container"></div>',
      confirmButtonText: t('calendar.export.close'),
      customClass: {
        ...SwalConfig.customClass,
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
  }, [t]);

  return { handleExport };
};