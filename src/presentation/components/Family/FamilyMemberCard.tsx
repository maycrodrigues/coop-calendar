import React from 'react';
import { Pencil, Upload, Trash, ImageOff } from 'lucide-react';
import { FamilyMember } from '../../../domain/entities/FamilyMember';

interface FamilyMemberCardProps {
  member: FamilyMember;
  role?: string;
  onEdit: () => void;
  onRemove: () => void;
  onPhotoUpload: (file: File) => void;
  onPhotoRemove: () => void;
}

export const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({
  member,
  role,
  onEdit,
  onRemove,
  onPhotoUpload,
  onPhotoRemove,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-[1.02]">
      <div className="relative group">
        <div className="aspect-square w-full mb-3 rounded-lg overflow-hidden bg-gray-100">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <span className="text-4xl text-gray-300">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <label className="p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
              <Upload className="text-white w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {member.photoUrl && (
              <button
                onClick={onPhotoRemove}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ImageOff className="text-white w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{member.name}</h3>
          {role && (
            <span className="text-sm text-gray-500">{role}</span>
          )}
        </div>
        <div className="flex gap-1">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onRemove}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};