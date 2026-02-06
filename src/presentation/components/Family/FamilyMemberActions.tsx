import React from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FamilyMemberActionsProps {
  onAdd: () => void;
  type: 'parent' | 'child';
}

export const FamilyMemberActions: React.FC<FamilyMemberActionsProps> = ({ onAdd, type }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end mb-2">
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
      >
        <Plus size={16} />
        <span>{t(`family.actions.add.${type}Title`)}</span>
      </button>
    </div>
  );
};