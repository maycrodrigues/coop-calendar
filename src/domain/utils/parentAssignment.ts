import { ParentType } from '../entities/CalendarDay';
import { addDays, subDays } from 'date-fns';

export const getNextParentInCycle = (currentParent: ParentType): { nextParent: ParentType } => {
  // Cycle: null -> father -> mother -> shared-father-mother -> shared-father-mother-reversed -> shared-mother-father -> shared-mother-father-reversed -> null
  
  if (currentParent === null) return { nextParent: 'father' };
  if (currentParent === 'father') return { nextParent: 'mother' };
  if (currentParent === 'mother') return { nextParent: 'shared-father-mother' };
  
  // Father -> Mother variations
  if (currentParent === 'shared' || currentParent === 'shared-father-mother') return { nextParent: 'shared-father-mother-reversed' };
  if (currentParent === 'shared-father-mother-reversed') return { nextParent: 'shared-mother-father' };
  
  // Mother -> Father variations
  if (currentParent === 'shared-mother-father') return { nextParent: 'shared-mother-father-reversed' };
  if (currentParent === 'shared-mother-father-reversed') return { nextParent: null };
  
  // Default fallback
  return { nextParent: null };
};

export const getAdjacentDaysParents = (
  date: Date,
  getParentForDay: (date: Date) => ParentType
): { previousParent: ParentType; nextParent: ParentType } => {
  const previousDay = subDays(date, 1);
  const nextDay = addDays(date, 1);

  return {
    previousParent: getParentForDay(previousDay),
    nextParent: getParentForDay(nextDay),
  };
};