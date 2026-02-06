import React from 'react';
import { format, isValid } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
}) => {
  // Validate the date to prevent formatting errors
  if (!isValid(currentDate)) {
    console.error('Invalid date provided to CalendarHeader');
    return null;
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onPreviousMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <h2 className="text-xl font-semibold">
        {format(currentDate, 'MMMM yyyy')}
      </h2>
      
      <button
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Next month"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};