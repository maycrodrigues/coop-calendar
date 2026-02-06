import { useState, useCallback } from 'react';
import {
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfMonth,
} from 'date-fns';
import { CalendarViewType } from '../../domain/entities/CalendarView';

export const useCalendarNavigation = (view: CalendarViewType) => {
  const [currentDate, setCurrentDate] = useState(() => startOfMonth(new Date()));

  const navigateForward = useCallback(() => {
    setCurrentDate((date) => {
      switch (view) {
        case 'month':
          return addMonths(date, 1);
        case 'year':
          return addYears(date, 1);
        default:
          return date;
      }
    });
  }, [view]);

  const navigateBackward = useCallback(() => {
    setCurrentDate((date) => {
      switch (view) {
        case 'month':
          return subMonths(date, 1);
        case 'year':
          return subYears(date, 1);
        default:
          return date;
      }
    });
  }, [view]);

  return {
    currentDate,
    navigateForward,
    navigateBackward,
  };
};