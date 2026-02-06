import { format } from 'date-fns';
import { SaveRecord } from '../types';

export const formatRecordDate = (date: string): string => {
  return format(new Date(date), 'PP');
};

export const filterValidRecords = (days: Record<string, string | null>): SaveRecord[] => {
  return Object.entries(days)
    .filter(([_, responsibility]) => responsibility !== null)
    .map(([date, responsibility]) => ({
      data: date,
      responsibility: responsibility || 'none',
    }))
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
};