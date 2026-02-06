import React from 'react';
import { format, isWeekend } from 'date-fns';
import { createPortal } from 'react-dom';
import { getAdjacentDaysParents } from '../../../../domain/utils/parentAssignment';
import { useCalendarStore } from '../../../../infrastructure/stores/useCalendarStore';
import { useTooltip } from '../../../hooks/useTooltip';
import { getCurrentDayStyle } from '../../../styles/currentDayStyles';
import { getCalendarDayStyles } from '../../../styles/calendarDayStyles';
import { CalendarTooltip } from '../Tooltip/CalendarTooltip';

interface YearViewDayProps {
  date: Date;
}

export const YearViewDay: React.FC<YearViewDayProps> = ({ date }) => {
  const { getParentForDay, getEventsForDay } = useCalendarStore();
  const { tooltip, showTooltip, hideTooltip } = useTooltip();
  
  const parent = getParentForDay(date);
  const events = getEventsForDay(date);
  const hasEvent = events.length > 0;
  const { previousParent, nextParent } = getAdjacentDaysParents(date, getParentForDay);
  const { background, border } = getCalendarDayStyles(parent, previousParent, nextParent, hasEvent);
  const isWeekendDay = isWeekend(date);

  const dayStyle = `
    aspect-square text-xs rounded-sm overflow-hidden
    ${getCurrentDayStyle(date)}
  `;

  const contentStyle = `
    w-full h-full flex items-center justify-center
    ${background}
    ${border || ''}
    ${isWeekendDay ? 'bg-opacity-75' : ''}
    ${parent ? '' : 'hover:bg-gray-100'}
    transition-colors duration-200
  `;

  return (
    <>
      <div className={dayStyle}>
        <div
          className={contentStyle}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {format(date, 'd')}
        </div>
      </div>
      {tooltip.isVisible && createPortal(
        <div
          style={{
            position: 'absolute',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            zIndex: 50,
          }}
        >
          <CalendarTooltip date={date} events={events} />
        </div>,
        document.body
      )}
    </>
  );
};