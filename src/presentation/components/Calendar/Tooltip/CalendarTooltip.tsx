import React from 'react';
import { format } from 'date-fns';
import { CalendarEvent } from '../../../../domain/entities/CalendarEvent';

interface CalendarTooltipProps {
  date: Date;
  events: CalendarEvent[];
}

export const CalendarTooltip: React.FC<CalendarTooltipProps> = ({ date, events }) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 z-50 flex flex-col gap-2 min-w-[120px]">
      <div className="flex flex-col gap-1">
        {events.map(event => (
          <div key={event.id} className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: event.color }} />
             <span className="text-sm font-semibold text-gray-800 leading-snug">
               {event.title}
             </span>
          </div>
        ))}
      </div>
      <span className="text-[10px] text-gray-400 font-medium tracking-wide pt-1 border-t border-gray-50">
        {format(date, 'dd/MM/yyyy')}
      </span>
    </div>
  );
};
