export interface SaveRecord {
  data: string;
  responsibility: string;
}

export interface ExportData {
  [key: string]: string | null;
}

export interface CalendarActionHook<T> {
  handle: () => Promise<T>;
}

export interface SaveCalendarHook extends CalendarActionHook<void> {
  isSaving: boolean;
}