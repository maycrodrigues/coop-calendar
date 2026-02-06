export type ParentType = 
  | 'father' 
  | 'mother' 
  | 'shared' 
  | 'shared-father-mother' 
  | 'shared-mother-father' 
  | 'shared-father-mother-reversed' 
  | 'shared-mother-father-reversed' 
  | null;

export interface CalendarDay {
  date: Date;
  parent: ParentType;
}