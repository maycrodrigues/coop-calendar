import React from 'react';
import { format, isValid } from 'date-fns';
import { ChevronLeft, ChevronRight, Cloud, RefreshCw, CheckCircle } from 'lucide-react';
import { CalendarViewType } from '../../../../domain/entities/CalendarView';
import { useSyncStore } from '../../../../infrastructure/stores/useSyncStore';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarViewType;
  onPrevious: () => void;
  onNext: () => void;
}

const formatDate = (date: Date, view: CalendarViewType): string => {
  switch (view) {
    case 'month':
      return format(date, 'MMMM yyyy');
    case 'year':
      return format(date, 'yyyy');
    default:
      return format(date, 'MMMM yyyy');
  }
};

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onPrevious,
  onNext,
}) => {
  const { isSaving, lastSyncedAt } = useSyncStore();

  if (!isValid(currentDate)) {
    console.error('Invalid date provided to CalendarHeader');
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrevious}
          className="p-3 sm:p-2 hover:bg-gray-100 rounded-full transition-colors active:bg-gray-200"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        <h2 className="text-lg sm:text-xl font-semibold min-w-[140px] sm:min-w-[200px] text-center truncate">
          {formatDate(currentDate, view)}
        </h2>
        
        <button
          onClick={onNext}
          className="p-3 sm:p-2 hover:bg-gray-100 rounded-full transition-colors active:bg-gray-200"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Sync Status Indicator */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
        {isSaving ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Salvando...</span>
          </>
        ) : lastSyncedAt ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Salvo {format(lastSyncedAt, 'HH:mm')}</span>
          </>
        ) : (
          <>
            <Cloud className="w-4 h-4 text-gray-400" />
            <span>Sincronizado</span>
          </>
        )}
      </div>
    </div>
  );
};