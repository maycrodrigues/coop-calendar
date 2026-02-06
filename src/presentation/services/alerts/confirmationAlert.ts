import { SwalConfig } from './sweetAlertConfig';
import { useTranslation } from 'react-i18next';

interface ConfirmationAlertOptions {
  title?: string;
  text: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
}

export const useConfirmationAlert = () => {
  const { t } = useTranslation();

  const showConfirmation = async ({
    title = t('alerts.confirmation.defaultTitle'),
    text,
    confirmButtonText = t('alerts.confirmation.confirm'),
    cancelButtonText = t('alerts.confirmation.cancel'),
    icon = 'warning'
  }: ConfirmationAlertOptions) => {
    const result = await SwalConfig.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
    });

    return result.isConfirmed;
  };

  return { showConfirmation };
};