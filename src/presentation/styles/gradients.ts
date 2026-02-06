import { ParentType } from '../../domain/entities/CalendarDay';

export interface GradientConfig {
  from?: string;
  to?: string;
  hover?: string;
  background?: string;
}

export const getGradientForSharedDay = (
  previousParent: ParentType,
  nextParent: ParentType,
  currentParent?: ParentType // Add currentParent to arguments
): GradientConfig => {
  // Explicit Shared Types take precedence
  if (currentParent === 'shared-father-mother') {
    return {
      background: 'bg-[linear-gradient(135deg,#bfdbfe_70%,#fbcfe8_80%)]',
      hover: 'hover:bg-[linear-gradient(135deg,#93c5fd_70%,#f9a8d4_80%)]',
    };
  }

  if (currentParent === 'shared-mother-father') {
    return {
      background: 'bg-[linear-gradient(135deg,#fbcfe8_20%,#bfdbfe_30%)]',
      hover: 'hover:bg-[linear-gradient(135deg,#f9a8d4_20%,#93c5fd_30%)]',
    };
  }

  if (currentParent === 'shared-father-mother-reversed') {
    return {
      background: 'bg-[linear-gradient(135deg,#bfdbfe_20%,#fbcfe8_30%)]',
      hover: 'hover:bg-[linear-gradient(135deg,#93c5fd_20%,#f9a8d4_30%)]',
    };
  }

  if (currentParent === 'shared-mother-father-reversed') {
    return {
      background: 'bg-[linear-gradient(135deg,#fbcfe8_70%,#bfdbfe_80%)]',
      hover: 'hover:bg-[linear-gradient(135deg,#f9a8d4_70%,#93c5fd_80%)]',
    };
  }

  // Default gradient (when no clear pattern or generic 'shared')
  const defaultGradient: GradientConfig = {
    background: 'bg-gradient-to-br from-purple-200 to-purple-200',
    hover: 'hover:from-purple-300 hover:to-purple-300',
  };

  // If generic 'shared', try to infer from neighbors (Legacy/Auto mode)
  // Father to Mother gradient
  if (previousParent === 'father' && nextParent === 'mother') {
    return {
      background: 'bg-[linear-gradient(135deg,#bfdbfe_70%,#fbcfe8_80%)]',
      hover: 'hover:bg-[linear-gradient(135deg,#93c5fd_70%,#f9a8d4_80%)]',
    };
  }

  // Mother to Father gradient
  if (previousParent === 'mother' && nextParent === 'father') {
    return {
      background: 'bg-[linear-gradient(135deg,#fbcfe8_20%,#bfdbfe_30%)]',
      hover: 'hover:bg-[linear-gradient(135deg,#f9a8d4_20%,#93c5fd_30%)]',
    };
  }

  return defaultGradient;
};