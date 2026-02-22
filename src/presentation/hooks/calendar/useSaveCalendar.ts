import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCalendarStore } from '../../../infrastructure/stores/useCalendarStore';
import { showToast } from '../../services/alerts/toastAlert';
import { SwalConfig } from '../../services/alerts/sweetAlertConfig';
import { SaveConfirmationModal } from '../../components/Calendar/Modals/SaveConfirmationModal';
import { filterValidRecords } from './utils/recordTransforms';
import { createModalContainer } from './utils/modalHelpers';
import { saveCalendar } from '../../../domain/actions/saveCalendar';
import { useLogger } from '../useLogger';

export const useSaveCalendar = () => {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const { days } = useCalendarStore();
  const { logAction } = useLogger();

  const handleSave = useCallback(async () => {
    const records = filterValidRecords(days);

    if (records.length === 0) {
      showToast({
        message: t('calendar.save.noData'),
        type: 'warning',
      });
      return;
    }

    const result = await SwalConfig.fire({
      title: t('calendar.save.preview.title'),
      html: '<div id="save-confirmation-container"></div>',
      showConfirmButton: false,
      showCancelButton: false,
      customClass: {
        popup: 'swal2-modal-lg',
      },
      didOpen: (modal) => {
        createModalContainer(
          modal,
          'save-confirmation-container',
          SaveConfirmationModal,
          {
            records,
            onConfirm: () => SwalConfig.clickConfirm(),
            onCancel: () => SwalConfig.clickCancel(),
          }
        );
      },
    });

    if (result.isConfirmed) {
      try {
        setIsSaving(true);
        await saveCalendar(records);
        logAction('SAVE_CALENDAR', {
          details: `Saved ${records.length} records`,
          entityType: 'calendar',
          level: 'info',
          payload: {
            recordsCount: records.length,
          },
        });
        showToast({
          message: t('calendar.save.success'),
          type: 'success',
        });
      } catch (error) {
        console.error('Error saving calendar:', error);
        logAction('SAVE_CALENDAR_ERROR', {
          details: String(error),
          entityType: 'calendar',
          level: 'error',
        });
        showToast({
          message: t('calendar.save.error'),
          type: 'error',
        });
      } finally {
        setIsSaving(false);
      }
    }
  }, [t, days, logAction]);

  return { handleSave, isSaving };
};
