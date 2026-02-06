import React, { useState, useEffect, useCallback } from 'react';
import {
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isWeekend,
} from 'date-fns';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useCalendarStore } from '../../../../infrastructure/stores/useCalendarStore';
import { getCalendarDayStyles } from '../../../styles/calendarDayStyles';
import { getAdjacentDaysParents } from '../../../../domain/utils/parentAssignment';
import { getCurrentDayStyle } from '../../../styles/currentDayStyles';
import { CalendarTooltip } from '../Tooltip/CalendarTooltip';
import { useTooltip } from '../../../hooks/useTooltip';
import { MonthEventsList } from '../Events/MonthEventsList';
import { useEventModalStore } from '../../../hooks/useEventModalStore';
import { Calendar, Plus, X } from 'lucide-react';

interface YearViewProps {
  currentDate: Date;
}

export const YearView: React.FC<YearViewProps> = ({ currentDate }) => {
  const { t } = useTranslation();
  const { getParentForDay, setParentForDay, getEventsForDay } = useCalendarStore();
  const { openModal } = useEventModalStore();
  const { tooltip, showTooltip, hideTooltip } = useTooltip();
  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  
  const yearStart = startOfYear(currentDate);
  const yearEnd = endOfYear(currentDate);
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const toKey = (date: Date) => date.toISOString().split('T')[0];
  const addSelected = useCallback((key: string) => {
    setSelectedDays(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);
  const applyParentToSelection = useCallback((parent: 'father' | 'mother' | null) => {
    selectedDays.forEach(key => {
      const [y, m, d] = key.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      setParentForDay(date, parent);
    });
  }, [selectedDays, setParentForDay]);

  const clearSelection = useCallback(() => setSelectedDays(new Set()), []);

  const handleAddEvent = useCallback(() => {
    if (selectedDays.size === 0) return;
    
    const dates = Array.from(selectedDays).sort();
    const startDateStr = dates[0];
    const endDateStr = dates[dates.length - 1];
    
    const [sy, sm, sd] = startDateStr.split('-').map(Number);
    const startDate = new Date(sy, sm - 1, sd);
    
    const [ey, em, ed] = endDateStr.split('-').map(Number);
    const endDate = new Date(ey, em - 1, ed);
    
    openModal(startDate, null, endDate);
    clearSelection();
  }, [selectedDays, openModal, clearSelection]);

  const getDayStyle = (date: Date) => {
    const parent = getParentForDay(date);
    const { previousParent, nextParent } = getAdjacentDaysParents(date, getParentForDay);
    const events = getEventsForDay(date);
    const { background } = getCalendarDayStyles(parent, previousParent, nextParent, events.length > 0);
    const isWeekendDay = isWeekend(date);

    return `
      w-full h-full flex items-center justify-center select-none relative
      ${background}
      ${isWeekendDay ? 'bg-opacity-75' : ''}
      ${parent ? '' : 'hover:bg-gray-100'}
      transition-colors duration-200
    `;
  };

  return (
    <div className="space-y-4 select-none">
      {selectedDays.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-auto sm:right-4 z-50 bg-white border-t sm:border border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:shadow-lg rounded-t-xl sm:rounded-lg p-3 sm:p-2 flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
          <div className="flex w-full sm:w-auto items-center justify-between gap-2">
            <span className="text-xs text-gray-500 sm:ml-2 order-2 sm:order-last font-medium">
              {selectedDays.size} {selectedDays.size === 1 ? 'dia' : 'dias'}
            </span>
            <button
              onClick={handleAddEvent}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-lg sm:rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors active:bg-indigo-800"
            >
              <Plus size={16} />
              Adicionar
            </button>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-gray-200 mx-1"></div>
          
          <div className="flex w-full sm:w-auto items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <button
              onClick={() => applyParentToSelection('father')}
              className="flex-1 sm:flex-none px-3 py-2 sm:px-2 sm:py-1 rounded-lg sm:rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 whitespace-nowrap"
            >
              {t('calendar.parents.father')}
            </button>
            <button
              onClick={() => applyParentToSelection('mother')}
              className="flex-1 sm:flex-none px-3 py-2 sm:px-2 sm:py-1 rounded-lg sm:rounded-md text-sm font-medium bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 whitespace-nowrap"
            >
              {t('calendar.parents.mother')}
            </button>
            <button
              onClick={() => applyParentToSelection(null)}
              className="flex-1 sm:flex-none px-3 py-2 sm:px-2 sm:py-1 rounded-lg sm:rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap"
            >
              {t('calendar.parents.none')}
            </button>
            <button
              onClick={clearSelection}
              className="sm:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <button
            onClick={clearSelection}
            className="hidden sm:block px-2 py-1 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            {t('common.cancel')}
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 sm:pb-0">
      {months.map((month) => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

        return (
          <div key={month.toISOString()} className="space-y-2">
            <h3 className="font-semibold text-gray-900 mb-2">
              {format(month, 'MMMM')}
            </h3>
            <div className="grid grid-cols-7 gap-0.5">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="h-6 flex items-center justify-center text-xs font-medium text-gray-500"
                >
                  {t(`calendar.weekDays.${day}`).charAt(0)}
                </div>
              ))}
              
              {/* Empty cells for days before the start of the month */}
              {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                <div key={`empty-start-${index}`} className="aspect-square" />
              ))}
              
              {days.map((day) => (
                <div
                  key={day.toISOString()}
                  className={`aspect-square text-xs rounded-sm overflow-hidden ${getCurrentDayStyle(day)} ${selectedDays.has(toKey(day)) ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  <div
                    className={getDayStyle(day)}
                    onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); addSelected(toKey(day)); }}
                    onMouseEnter={(e) => { 
                      if (isDragging) addSelected(toKey(day)); 
                      if (getEventsForDay(day).length > 0) {
                        showTooltip(e);
                        setHoveredDate(day);
                      }
                    }}
                    onMouseLeave={() => {
                      hideTooltip();
                      setHoveredDate(null);
                    }}
                  >
                    {format(day, 'd')}
                    {getEventsForDay(day).length > 0 && (
                      <div 
                        className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: getEventsForDay(day)[0].color || '#9333EA' }}
                      />
                    )}
                  </div>
                </div>
              ))}
              
              {/* Empty cells for days after the end of the month */}
              {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
                <div key={`empty-end-${index}`} className="aspect-square" />
              ))}
            </div>
            <MonthEventsList currentDate={month} compact />
          </div>
        );
      })}
    </div>
    {tooltip.isVisible && hoveredDate && createPortal(
        <div
          style={{
            position: 'absolute',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            zIndex: 50,
          }}
        >
          <CalendarTooltip 
            date={hoveredDate} 
            events={getEventsForDay(hoveredDate)} 
          />
        </div>,
        document.body
      )}
      </div>
  );
};