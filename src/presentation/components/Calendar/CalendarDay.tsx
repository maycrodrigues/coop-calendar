import React from 'react';
import { format, isWeekend } from 'date-fns';
import { createPortal } from 'react-dom';
import { PartyPopper } from 'lucide-react';
import { useCalendarDay } from '../../hooks/useCalendarDay';
import { CalendarDayContent } from './CalendarDayContent';
import { useTooltip } from '../../hooks/useTooltip';
import { CalendarTooltip } from './Tooltip/CalendarTooltip';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ date, isCurrentMonth }) => {
  const { parent, events, handleDayClick, handleAddEvent, handleEditEvent, styles } = useCalendarDay(date);
  const { tooltip, showTooltip, hideTooltip } = useTooltip();
  const isWeekendDay = isWeekend(date);

  return (
    <>
      <div
        onClick={handleDayClick}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className={`
          group relative min-h-[3.5rem] sm:h-28 rounded-none sm:rounded-lg cursor-pointer transition-all duration-200
          ${styles.background} ${styles.hover} ${styles.border}
          ${!isCurrentMonth ? 'opacity-50' : ''}
          ${isWeekendDay ? 'bg-opacity-75' : ''}
        `}
      >
        <CalendarDayContent 
          date={date} 
          parent={parent} 
          events={events} 
          onEventClick={handleEditEvent}
        />
        
        {/* Hover action to add event */}
        <div className="absolute top-1 right-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               handleAddEvent(e);
             }}
             className="p-1.5 sm:p-1 bg-white/90 sm:bg-white/80 hover:bg-white rounded-full shadow-sm text-purple-600 hover:text-purple-700"
             title="Adicionar Evento"
           >
             <PartyPopper size={14} />
           </button>
        </div>
      </div>
      {tooltip.isVisible && events.length > 0 && createPortal(
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
