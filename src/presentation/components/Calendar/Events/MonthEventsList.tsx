import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  format,
  parseISO,
  isSameDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCalendarStore } from '../../../../infrastructure/stores/useCalendarStore';
import { useEventModalStore } from '../../../hooks/useEventModalStore';
import { CalendarEvent } from '../../../../domain/entities/CalendarEvent';

interface MonthEventsListProps {
  currentDate: Date;
  compact?: boolean;
}

export const MonthEventsList: React.FC<MonthEventsListProps> = ({ 
  currentDate, 
  compact = false 
}) => {
  const { events } = useCalendarStore();
  const { openModal } = useEventModalStore();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthStartStr = format(monthStart, 'yyyy-MM-dd');
  const monthEndStr = format(monthEnd, 'yyyy-MM-dd');

  // Filter events that overlap with the current month
  const monthEvents = events
    .filter(event => {
      // Check for overlap: Event Start <= Month End AND Event End >= Month Start
      return event.startDate <= monthEndStr && event.endDate >= monthStartStr;
    })
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  if (monthEvents.length === 0) {
    return null;
  }

  const formatEventDate = (event: CalendarEvent) => {
    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);
    
    if (isSameDay(start, end)) {
      return (
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 border border-gray-100 w-12 h-12 shrink-0">
          <span className="text-lg font-bold text-gray-900 leading-none">
            {format(start, 'd')}
          </span>
          <span className="text-[10px] uppercase font-medium text-gray-500 mt-0.5">
            {format(start, 'EEE', { locale: ptBR }).slice(0, 3)}
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 border border-gray-100 w-12 h-12 shrink-0 px-1">
        <span className="text-[10px] font-bold text-gray-900 leading-tight text-center">
          {format(start, 'd/MMM', { locale: ptBR })}
        </span>
        <div className="w-px h-1.5 bg-gray-300 my-0.5 rotate-12"></div>
        <span className="text-[10px] font-bold text-gray-900 leading-tight text-center">
          {format(end, 'd/MMM', { locale: ptBR })}
        </span>
      </div>
    );
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case 'vacation': return 'Férias';
      case 'school_holiday': return 'Recesso';
      case 'holiday': return 'Feriado';
      default: return 'Evento';
    }
  };

  if (compact) {
    return (
      <div className="mt-2 space-y-2">
        {monthEvents.slice(0, 5).map((event) => (
          <div key={event.id} className="flex items-center gap-2 text-xs text-gray-600">
            <div 
              className="w-1.5 h-1.5 rounded-full shrink-0" 
              style={{ backgroundColor: event.color || '#9333EA' }}
            />
            <div className="flex flex-col min-w-0">
              <span className="truncate font-medium text-gray-900">{event.title}</span>
              <span className="text-[10px] text-gray-500 truncate">
                {event.startDate === event.endDate 
                  ? format(parseISO(event.startDate), 'd MMM', { locale: ptBR })
                  : `${format(parseISO(event.startDate), 'd MMM', { locale: ptBR })} - ${format(parseISO(event.endDate), 'd MMM', { locale: ptBR })}`
                }
              </span>
            </div>
          </div>
        ))}
        {monthEvents.length > 5 && (
          <div className="text-[10px] text-gray-400 pl-3.5">
            + {monthEvents.length - 5} eventos
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
          Eventos de {format(currentDate, 'MMMM', { locale: ptBR })}
        </h3>
        <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-100">
          {monthEvents.length} {monthEvents.length === 1 ? 'evento' : 'eventos'}
        </span>
      </div>
      
      <div className="divide-y divide-gray-50">
        {monthEvents.map((event) => {
          const isMultiDay = event.startDate !== event.endDate;
          
          return (
            <div 
              key={event.id} 
              onClick={() => openModal(parseISO(event.startDate), event)}
              className="group flex items-center gap-4 p-4 hover:bg-gray-50 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Left Color Bar on Hover */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 transition-colors duration-200"
                style={{ backgroundColor: event.color || '#9333EA' }}
              />

              {/* Date Badge */}
              {formatEventDate(event)}

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </span>
                  {isMultiDay && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {getEventLabel(event.type)}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {isMultiDay ? (
                     <span className="flex items-center gap-1">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                         <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                       </svg>
                       {format(parseISO(event.startDate), "d 'de' MMMM", { locale: ptBR })} até {format(parseISO(event.endDate), "d 'de' MMMM", { locale: ptBR })}
                     </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                      </svg>
                      Dia inteiro
                    </span>
                  )}
                </div>
              </div>

              {/* Edit Action Icon */}
              <div className="text-gray-300 group-hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
