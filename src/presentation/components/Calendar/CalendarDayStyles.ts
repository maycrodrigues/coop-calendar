import { ParentType } from '../../../domain/entities/CalendarDay';
import { getGradientForSharedDay } from '../../styles/gradients';

interface StyleConfig {
  background: string;
  hover: string;
}

export const getCalendarDayStyles = (
  parent: ParentType,
  previousParent: ParentType,
  nextParent: ParentType
): StyleConfig => {
  switch (parent) {
    case 'father':
      return {
        background: 'bg-blue-200',
        hover: 'hover:bg-blue-300',
      };
    case 'mother':
      return {
        background: 'bg-pink-200',
        hover: 'hover:bg-pink-300',
      };
    case 'shared': {
      const gradient = getGradientForSharedDay(previousParent, nextParent);
      return {
        background: `bg-gradient-to-r ${gradient.from} ${gradient.to}`,
        hover: gradient.hover,
      };
    }
    default:
      return {
        background: 'bg-white',
        hover: 'hover:bg-gray-100',
      };
  }
};