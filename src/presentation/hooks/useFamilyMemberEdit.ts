import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SwalConfig } from '../services/alerts/sweetAlertConfig';
import { showToast } from '../services/alerts/toastAlert';

export const useFamilyMemberEdit = () => {
  const { t } = useTranslation();

  const editMember = useCallback(async (
    currentName: string,
    type: 'child' | 'parent'
  ): Promise<string | null> => {
    const result = await SwalConfig.fire({
      title: t(`family.edit.${type}Name`),
      input: 'text',
      inputValue: currentName,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: t('alerts.confirmation.confirm'),
      cancelButtonText: t('alerts.confirmation.cancel'),
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name || name.trim() === '') {
          SwalConfig.showValidationMessage(t('family.edit.nameRequired'));
          return false;
        }
        return name.trim();
      },
    });

    if (result.isConfirmed && result.value !== currentName) {
      showToast({
        message: t('family.edit.success'),
        type: 'success',
      });
      return result.value;
    }

    return null;
  }, [t]);

  return { editMember };
};