export type ParentType = 
  | 'father' 
  | 'mother' 
  | 'shared' 
  | 'shared-father-mother' 
  | 'shared-mother-father' 
  | 'shared-father-mother-reversed' 
  | 'shared-mother-father-reversed' 
  | null;

export interface DayInfo {
  parent: ParentType;
  exchangeTime?: string; // Horário de troca (substitui pickup/dropoff)
  reason?: string; // optional note
}

export interface CalendarDay {
  date: Date;
  parent: ParentType;
  details?: DayInfo;
}