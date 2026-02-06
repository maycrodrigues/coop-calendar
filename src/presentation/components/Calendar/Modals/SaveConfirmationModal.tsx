import React from 'react';
import { useTranslation } from 'react-i18next';
import { SaveRecord } from '../../../hooks/calendar/types';
import { formatRecordDate } from '../../../hooks/calendar/utils/recordTransforms';

interface SaveConfirmationModalProps {
  records: SaveRecord[];
  onConfirm: () => void;
  onCancel: () => void;
}

export const SaveConfirmationModal: React.FC<SaveConfirmationModalProps> = ({
  records,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  const getResponsibilityColor = (responsibility: string) => {
    switch (responsibility) {
      case 'father':
        return 'text-blue-600';
      case 'mother':
        return 'text-pink-600';
      case 'shared':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTranslationKey = (responsibility: string) => {
    if (responsibility === 'shared') return 'calendar.parents.shared.default';
    if (responsibility.startsWith('shared-father-mother')) return 'calendar.parents.shared.fatherToMother';
    if (responsibility.startsWith('shared-mother-father')) return 'calendar.parents.shared.motherToFather';
    return `calendar.parents.${responsibility}`;
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 mb-4">
        {t('calendar.save.preview.subtitle')}
      </p>
      <div className="max-h-[400px] overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('calendar.save.preview.date')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('calendar.save.preview.responsibility')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.data}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatRecordDate(record.data)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`font-medium ${getResponsibilityColor(record.responsibility)}`}>
                    {t(getTranslationKey(record.responsibility))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-sm text-gray-500 mt-4">
        {t('calendar.save.preview.total')}: {records.length}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {t('calendar.save.preview.cancel')}
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          {t('calendar.save.preview.confirm')}
        </button>
      </div>
    </div>
  );
};