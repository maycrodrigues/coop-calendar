import { ParentType } from '../../domain/entities/CalendarDay';
import { getGradientForSharedDay, GradientConfig } from './gradients';

export interface CalendarDayStyle extends GradientConfig {
  border?: string;
}

export const getCalendarDayStyles = (
  parent: ParentType,
  previousParent: ParentType,
  nextParent: ParentType,
  hasEvent?: boolean
): CalendarDayStyle => {
  let baseStyles: CalendarDayStyle;

  switch (parent) {
    case 'father':
      baseStyles = {
        background: 'bg-blue-200',
        hover: 'hover:bg-blue-300',
      };
      break;
    case 'mother':
      baseStyles = {
        background: 'bg-pink-200',
        hover: 'hover:bg-pink-300',
      };
      break;
    case 'shared': 
    case 'shared-father-mother':
    case 'shared-mother-father':
    case 'shared-father-mother-reversed':
    case 'shared-mother-father-reversed': {
      const gradient = getGradientForSharedDay(previousParent, nextParent, parent);
      baseStyles = {
        background: gradient.background,
        hover: gradient.hover,
      };
      break;
    }
    default:
      baseStyles = {
        background: 'bg-white',
        hover: 'hover:bg-gray-100',
      };
  }

  // Event styling is now handled via content (purple dot) rather than border/background
  return {
    ...baseStyles,
    border: 'border border-gray-200',
  };
};