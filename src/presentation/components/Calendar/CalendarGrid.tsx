import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
} from 'date-fns';
import { useTranslation } from 'react-i18next';
import { CalendarDay } from './CalendarDay';

interface CalendarGridProps {
  currentDate: Date;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate }) => {
  const { t } = useTranslation();
  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  
  // Get the first day of the month
  const monthStart = startOfMonth(currentDate);
  // Get the last day of the month
  const monthEnd = endOfMonth(currentDate);
  // Get the start of the first week (including days from previous month if necessary)
  const calendarStart = startOfWeek(monthStart);
  // Get the end of the last week (including days from next month if necessary)
  const calendarEnd = endOfWeek(monthEnd);

  // Get all days that should be displayed in the calendar
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="grid grid-cols-7 gap-1">
      {weekDays.map((day) => (
        <div
          key={day}
          className="h-10 flex items-center justify-center font-semibold text-gray-600"
        >
          {t(`calendar.weekDays.${day}`)}
        </div>
      ))}
      
      {calendarDays.map((day) => (
        <CalendarDay
          key={day.toISOString()}
          date={day}
          isCurrentMonth={isSameMonth(day, currentDate)}
        />
      ))}
    </div>
  );
};