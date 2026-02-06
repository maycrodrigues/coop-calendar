export type EventType = 'vacation' | 'school_holiday' | 'holiday' | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string; // ISO Date YYYY-MM-DD
  endDate: string;   // ISO Date YYYY-MM-DD
  type: EventType;
  color?: string;
  description?: string;
}
