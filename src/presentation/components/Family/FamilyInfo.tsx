import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';
import { useFamilyStore } from '../../../infrastructure/stores/useFamilyStore';
import { FamilySection } from './FamilySection';
import { useFamilyMemberEdit } from '../../hooks/useFamilyMemberEdit';
import { usePhotoUpload } from '../../hooks/usePhotoUpload';
import { useFamilyManagement } from '../../hooks/useFamilyManagement';

export const FamilyInfo: React.FC = () => {
  const { t } = useTranslation();
  const { children, parents, updateChild, updateParent, updatePhoto } = useFamilyStore();
  const { editMember } = useFamilyMemberEdit();
  const { uploadPhoto } = usePhotoUpload();
  const { handleAdd, handleRemove, handlePhotoRemove } = useFamilyManagement();

  const handleEdit = async (id: string, currentName: string, type: 'child' | 'parent') => {
    const newName = await editMember(currentName, type);
    if (newName) {
      if (type === 'child') {
        updateChild(id, newName);
      } else {
        updateParent(id, newName);
      }
    }
  };

  const handlePhotoUpload = async (id: string, file: File, type: 'child' | 'parent') => {
    try {
      const photoUrl = await uploadPhoto(file);
      updatePhoto(id, photoUrl, type);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-800">{t('family.title')}</h2>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <FamilySection
          title={t('family.children')}
          icon="baby"
          type="child"
          members={children}
          onAdd={() => handleAdd('child')}
          onEdit={(id, name) => handleEdit(id, name, 'child')}
          onRemove={(id) => handleRemove('child', id, children.find(c => c.id === id)?.name || '')}
          onPhotoUpload={(id, file) => handlePhotoUpload(id, file, 'child')}
          onPhotoRemove={(id) => handlePhotoRemove('child', id)}
        />

        <FamilySection
          title={t('family.parents')}
          icon="users"
          type="parent"
          members={parents.map(parent => ({
            ...parent,
            role: t(`calendar.parents.${parent.role}`),
          }))}
          onAdd={() => handleAdd('parent')}
          onEdit={(id, name) => handleEdit(id, name, 'parent')}
          onRemove={(id) => handleRemove('parent', id, parents.find(p => p.id === id)?.name || '')}
          onPhotoUpload={(id, file) => handlePhotoUpload(id, file, 'parent')}
          onPhotoRemove={(id) => handlePhotoRemove('parent', id)}
        />
      </div>
    </div>
  );
};