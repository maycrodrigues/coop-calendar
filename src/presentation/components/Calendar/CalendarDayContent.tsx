import React from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ParentType } from '../../../domain/entities/CalendarDay';
import { CalendarEvent } from '../../../domain/entities/CalendarEvent';
import { useCalendarStore } from '../../../infrastructure/stores/useCalendarStore';
import { getAdjacentDaysParents } from '../../../domain/utils/parentAssignment';
import { getParentLabelKey } from '../../utils/parentLabel';

interface CalendarDayContentProps {
  date: Date;
  parent: ParentType;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent, e: React.MouseEvent) => void;
}

export const CalendarDayContent: React.FC<CalendarDayContentProps> = ({ date, parent, events, onEventClick }) => {
  const { t } = useTranslation();
  const { getParentForDay } = useCalendarStore();

  const labelKey = getParentLabelKey(date, parent, getParentForDay);

  return (
    <>
      <div className="flex justify-between items-start p-0.5 sm:p-1">
        <div className="text-xs sm:text-sm font-semibold">{format(date, 'd')}</div>
      </div>
      
      {/* Event Indicators */}
      <div className="flex flex-col gap-0.5 mt-0.5 min-h-[12px] px-0.5 sm:px-1">
        {events.slice(0, 4).map(event => {
          const isStart = event.startDate === format(date, 'yyyy-MM-dd');
          const isEnd = event.endDate === format(date, 'yyyy-MM-dd');
          const isSingleDay = event.startDate === event.endDate;
          
          if (isSingleDay) {
            return (
              <div 
                key={event.id} 
                className="flex items-center justify-end"
                onClick={(e) => onEventClick(event, e)}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full hover:scale-125 transition-transform" style={{ backgroundColor: event.color }} title={event.title} />
              </div>
            );
          }
          
          return (
            <div 
              key={event.id}
              className={`h-1 sm:h-1.5 w-full ${isStart ? 'rounded-l-sm ml-0.5' : ''} ${isEnd ? 'rounded-r-sm mr-0.5' : ''} hover:opacity-80 transition-opacity`}
              style={{ backgroundColor: event.color }}
              title={event.title}
              onClick={(e) => onEventClick(event, e)}
            />
          );
        })}
        {events.length > 4 && (
           <div className="h-0.5 sm:h-1 w-0.5 sm:w-1 bg-gray-300 rounded-full ml-auto mr-1" />
        )}
      </div>

      {parent && (
        <div className="text-[10px] sm:text-xs mt-auto p-0.5 sm:p-1 truncate w-full">
          {t(labelKey)}
        </div>
      )}
    </>
  );
};
