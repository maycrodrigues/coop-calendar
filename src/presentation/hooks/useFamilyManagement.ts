import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SwalConfig } from '../services/alerts/sweetAlertConfig';
import { showToast } from '../services/alerts/toastAlert';
import { addFamilyMember, removeFamilyMember, removePhoto } from '../../domain/actions/familyManagement';

export const useFamilyManagement = () => {
  const { t } = useTranslation();

  const handleAdd = useCallback(async (type: 'parent' | 'child') => {
    const result = await SwalConfig.fire({
      title: t(`family.actions.add.${type}Title`),
      input: 'text',
      inputPlaceholder: t(`family.actions.add.${type}Placeholder`),
      showCancelButton: true,
      confirmButtonText: t('alerts.confirmation.confirm'),
      cancelButtonText: t('alerts.confirmation.cancel'),
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return t('family.actions.nameRequired');
        }
        return null;
      },
    });

    if (result.isConfirmed && result.value) {
      const id = addFamilyMember(type, result.value.trim());
      showToast({
        message: t(`family.actions.add.success.${type}`),
        type: 'success',
      });
      return id;
    }
  }, [t]);

  const handleRemove = useCallback(async (type: 'parent' | 'child', id: string, name: string) => {
    const result = await SwalConfig.fire({
      title: t(`family.actions.remove.${type}Title`),
      text: t(`family.actions.remove.${type}Confirmation`, { name }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('alerts.confirmation.confirm'),
      cancelButtonText: t('alerts.confirmation.cancel'),
    });

    if (result.isConfirmed) {
      removeFamilyMember(type, id);
      showToast({
        message: t(`family.actions.remove.success.${type}`),
        type: 'success',
      });
    }
  }, [t]);

  const handlePhotoRemove = useCallback(async (type: 'parent' | 'child', id: string) => {
    const result = await SwalConfig.fire({
      title: t('family.actions.removePhoto.title'),
      text: t('family.actions.removePhoto.confirmation'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('alerts.confirmation.confirm'),
      cancelButtonText: t('alerts.confirmation.cancel'),
    });

    if (result.isConfirmed) {
      removePhoto(type, id);
      showToast({
        message: t('family.actions.removePhoto.success'),
        type: 'success',
      });
    }
  }, [t]);

  return {
    handleAdd,
    handleRemove,
    handlePhotoRemove,
  };
};