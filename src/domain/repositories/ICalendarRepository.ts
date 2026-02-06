import { CalendarDay, ParentType } from '../entities/CalendarDay';

export interface ICalendarRepository {
  setParentForDay(date: Date, parent: ParentType): void;
  getParentForDay(date: Date): ParentType;
  getAllDays(): CalendarDay[];
}