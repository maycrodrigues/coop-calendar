import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Baby } from 'lucide-react';
import { FamilyMemberCard } from './FamilyMemberCard';
import { FamilyMemberActions } from './FamilyMemberActions';

interface FamilySectionProps {
  title: string;
  icon: 'users' | 'baby';
  type: 'parent' | 'child';
  members: Array<{ id: string; name: string; role?: string; photoUrl?: string }>;
  onAdd: () => void;
  onEdit: (id: string, currentName: string) => void;
  onRemove: (id: string) => void;
  onPhotoUpload: (id: string, file: File) => void;
  onPhotoRemove: (id: string) => void;
}

export const FamilySection: React.FC<FamilySectionProps> = ({
  title,
  icon,
  type,
  members,
  onAdd,
  onEdit,
  onRemove,
  onPhotoUpload,
  onPhotoRemove,
}) => {
  const Icon = icon === 'users' ? Users : Baby;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="text-gray-600" size={20} />
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        </div>
        <FamilyMemberActions onAdd={onAdd} type={type} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {members.map((member) => (
          <FamilyMemberCard
            key={member.id}
            member={member}
            role={member.role}
            onEdit={() => onEdit(member.id, member.name)}
            onRemove={() => onRemove(member.id)}
            onPhotoUpload={(file) => onPhotoUpload(member.id, file)}
            onPhotoRemove={() => onPhotoRemove(member.id)}
          />
        ))}
      </div>
    </div>
  );
};