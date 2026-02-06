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
import { CalendarDay } from '../CalendarDay';
import { getCurrentDayStyle } from '../../../styles/currentDayStyles';

interface MonthViewProps {
  currentDate: Date;
}

import { MonthEventsList } from '../Events/MonthEventsList';

export const MonthView: React.FC<MonthViewProps> = ({ currentDate }) => {
  const { t } = useTranslation();
  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-px sm:gap-1 bg-gray-200 sm:bg-transparent border sm:border-0 border-gray-200 rounded-lg overflow-hidden sm:overflow-visible">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-8 sm:h-10 flex items-center justify-center font-semibold text-xs sm:text-sm text-gray-600 bg-gray-50 sm:bg-transparent"
          >
            <span className="sm:hidden">{t(`calendar.weekDays.${day}`).charAt(0)}</span>
            <span className="hidden sm:inline">{t(`calendar.weekDays.${day}`)}</span>
          </div>
        ))}
        
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={`${getCurrentDayStyle(day)} bg-white`}
          >
            <CalendarDay
              date={day}
              isCurrentMonth={isSameMonth(day, currentDate)}
            />
          </div>
        ))}
      </div>
      <MonthEventsList currentDate={currentDate} />
    </div>
  );
};