import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { clearCalendar } from '../../domain/actions/clearCalendar';
import { useConfirmationAlert } from '../services/alerts/confirmationAlert';
import { showToast } from '../services/alerts/toastAlert';

export const useClearCalendar = () => {
  const { t } = useTranslation();
  const { showConfirmation } = useConfirmationAlert();

  const handleClear = useCallback(async () => {
    const confirmed = await showConfirmation({
      text: t('calendar.clear.confirmation'),
      icon: 'warning',
    });

    if (confirmed) {
      clearCalendar();
      showToast({
        message: t('calendar.clear.success'),
        type: 'success',
      });
    }
  }, [t, showConfirmation]);

  return { handleClear };
};