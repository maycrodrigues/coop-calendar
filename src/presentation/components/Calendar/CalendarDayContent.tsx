import React from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { ParentType } from '../../../domain/entities/CalendarDay';
import { CalendarEvent } from '../../../domain/entities/CalendarEvent';
import { useCalendarStore } from '../../../infrastructure/stores/useCalendarStore';
import { useEventModalStore } from '../../hooks/useEventModalStore';
import { getParentLabelKey } from '../../utils/parentLabel';

interface CalendarDayContentProps {
  date: Date;
  parent: ParentType;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent, e: React.MouseEvent) => void;
}

export const CalendarDayContent: React.FC<CalendarDayContentProps> = ({ date, parent, events, onEventClick }) => {
  const { t } = useTranslation();
  const { getParentForDay, getDayDetails } = useCalendarStore();
  const { openExchangeModal } = useEventModalStore();

  const labelKey = getParentLabelKey(date, parent, getParentForDay);
  const dayDetails = getDayDetails(date);
  
  // Check if it is a shared day
  const isSharedDay = parent && String(parent).includes('shared');
  
  // Format times for display (e.g. 18:00 -> 18h)
  const formatTime = (time?: string) => {
    if (!time) return '';
    return time.replace(':00', 'h');
  };

  const handleExchangeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openExchangeModal(date);
  };

  return (
    <>
      <div className="flex justify-between items-start p-0.5 sm:p-1">
        <div className="flex items-center gap-1">
          <div className="text-xs sm:text-sm font-semibold">{format(date, 'd')}</div>
          {/* Exchange Icon for Shared Days */}
          {isSharedDay && (
            <button 
              onClick={handleExchangeClick}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full p-0.5 transition-colors z-20 relative"
              title="Horários de Troca"
            >
              <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
            </button>
          )}
        </div>
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
        <div className="text-[10px] sm:text-xs mt-auto p-0.5 sm:p-1 w-full">
          <div className="truncate font-medium">{t(labelKey)}</div>
          
          {/* Shared Day Times Display */}
          {dayDetails && dayDetails.exchangeTime && (
            <div className="flex items-center gap-1 text-[10px] text-blue-700 font-bold mt-0.5 bg-blue-50/50 rounded px-1 py-0.5 -mx-0.5">
              <Clock size={10} className="text-blue-600" />
              <span>{dayDetails.exchangeTime}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};
