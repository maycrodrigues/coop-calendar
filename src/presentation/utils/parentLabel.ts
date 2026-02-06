import { ParentType } from '../../domain/entities/CalendarDay';
import { getAdjacentDaysParents } from '../../domain/utils/parentAssignment';

export const getParentLabelKey = (
  date: Date,
  parent: ParentType,
  getParentForDay: (date: Date) => ParentType
): string => {
  if (!parent) return 'calendar.parents.none';

  if (parent === 'shared-father-mother' || parent === 'shared-father-mother-reversed') {
    return 'calendar.parents.shared.fatherToMother';
  }

  if (parent === 'shared-mother-father' || parent === 'shared-mother-father-reversed') {
    return 'calendar.parents.shared.motherToFather';
  }

  if (parent === 'shared') {
    const { previousParent, nextParent } = getAdjacentDaysParents(date, getParentForDay);

    if (previousParent === 'father' && nextParent === 'mother') {
      return 'calendar.parents.shared.fatherToMother';
    }

    if (previousParent === 'mother' && nextParent === 'father') {
      return 'calendar.parents.shared.motherToFather';
    }

    return 'calendar.parents.shared.default';
  }

  return `calendar.parents.${parent}`;
};