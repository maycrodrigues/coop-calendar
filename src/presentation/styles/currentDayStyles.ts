import { isToday } from 'date-fns';

export const getCurrentDayStyle = (date: Date): string => {
  return isToday(date) ? 'ring-1 ring-green-500 ring-offset-1' : '';
};