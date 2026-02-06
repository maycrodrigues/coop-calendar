import React from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, CalendarRange, Calendar as CalendarIcon } from 'lucide-react';
import { CalendarViewType } from '../../../../domain/entities/CalendarView';

interface CalendarViewSelectorProps {
  currentView: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
}

interface ViewOption {
  value: CalendarViewType;
  icon: React.ReactNode;
  label: string;
}

export const CalendarViewSelector: React.FC<CalendarViewSelectorProps> = ({
  currentView,
  onViewChange,
}) => {
  const { t } = useTranslation();

  const viewOptions: ViewOption[] = [
    { value: 'month', icon: <CalendarDays size={18} />, label: t('calendar.views.month') },
    { value: 'year', icon: <CalendarIcon size={18} />, label: t('calendar.views.year') },
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {viewOptions.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => onViewChange(value)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
            transition-colors duration-200
            ${currentView === value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }
          `}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};