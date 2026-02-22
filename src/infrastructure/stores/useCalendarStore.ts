import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ParentType } from '../../domain/entities/CalendarDay';
import { CalendarEvent } from '../../domain/entities/CalendarEvent';
import { defaultEvents2026 } from '../../domain/constants/events2026';
import { useLogStore } from './useLogStore';
import { useAuthStore } from './useAuthStore';

interface CalendarState {
  days: Record<string, ParentType>;
  dayDetails: Record<string, { exchangeTime?: string }>;
  events: CalendarEvent[];
  isEventMode: boolean;
  setParentForDay: (date: Date, parent: ParentType) => void;
  setDayDetails: (date: Date, details: { exchangeTime?: string }) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  removeEvent: (id: string) => void;
  toggleEventMode: () => void;
  getParentForDay: (date: Date) => ParentType;
  getDayDetails: (date: Date) => { exchangeTime?: string } | undefined;
  getEventsForDay: (date: Date) => CalendarEvent[];
  clearAllDays: () => void;
  initializeDefaultEvents: () => void;
  setEvents: (events: CalendarEvent[]) => void;
  setDays: (days: Record<string, ParentType>, dayDetails?: Record<string, { exchangeTime?: string }>) => void;
}

import { format } from 'date-fns';

const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

type LogLevel = 'info' | 'warning' | 'error';

interface LogContext {
  details?: string;
  entityType?: string;
  entityId?: string;
  payload?: Record<string, unknown>;
  level?: LogLevel;
}

const getClientContext = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const path = window.location?.pathname;
  const language = window.navigator?.language;
  const userAgent = window.navigator?.userAgent;

  return {
    path,
    language,
    userAgent,
  };
};

const logAction = (action: string, context: LogContext = {}) => {
  const user = useAuthStore.getState().email || 'anonymous';
  const clientContext = getClientContext();

  useLogStore.getState().addLog({
    user,
    action,
    level: context.level || 'info',
    details: context.details,
    entityType: context.entityType,
    entityId: context.entityId,
    payload: context.payload,
    ...clientContext,
  });
};

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      days: {},
      dayDetails: {},
      events: [],
      isEventMode: false,
      
      setParentForDay: (date: Date, parent: ParentType) => {
        const dateStr = formatDate(date);
        const previousParent = get().days[dateStr];
        
        set((state) => ({
          days: {
            ...state.days,
            [dateStr]: parent,
          },
        }));

        logAction('SET_PARENT_FOR_DAY', {
          details: `Date: ${dateStr}, Parent: ${parent}, Previous: ${previousParent}`,
          entityType: 'day',
          entityId: dateStr,
          payload: {
            parent,
            previousParent,
          },
        });
      },

      setDayDetails: (date: Date, details: { exchangeTime?: string }) => {
        const dateStr = formatDate(date);
        set((state) => ({
          dayDetails: {
            ...state.dayDetails,
            [dateStr]: { ...state.dayDetails[dateStr], ...details },
          },
        }));
        logAction('SET_DAY_DETAILS', {
          details: `Date: ${dateStr}, Exchange: ${details.exchangeTime}`,
          entityType: 'dayDetails',
          entityId: dateStr,
          payload: {
            exchangeTime: details.exchangeTime,
          },
        });
      },

      addEvent: (event: CalendarEvent) => {
        set((state) => ({
          events: [...state.events, event],
        }));
        logAction('ADD_EVENT', {
          details: `Event: ${event.title}, Range: ${event.startDate} -> ${event.endDate}, Type: ${event.type}`,
          entityType: 'event',
          entityId: event.id,
          payload: {
            title: event.title,
            startDate: event.startDate,
            endDate: event.endDate,
            type: event.type,
            color: event.color,
          },
        });
      },

      updateEvent: (event: CalendarEvent) => {
        set((state) => ({
          events: state.events.map((e) => (e.id === event.id ? event : e)),
        }));
        logAction('UPDATE_EVENT', {
          details: `Event: ${event.title}, ID: ${event.id}, Range: ${event.startDate} -> ${event.endDate}, Type: ${event.type}`,
          entityType: 'event',
          entityId: event.id,
          payload: {
            title: event.title,
            startDate: event.startDate,
            endDate: event.endDate,
            type: event.type,
            color: event.color,
          },
        });
      },

      removeEvent: (id: string) => {
        const event = get().events.find(e => e.id === id);
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        }));
        logAction('REMOVE_EVENT', {
          details: `Event: ${event?.title || 'Unknown'}, ID: ${id}, Range: ${event?.startDate} -> ${event?.endDate}, Type: ${event?.type}`,
          entityType: 'event',
          entityId: id,
          payload: event
            ? {
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                type: event.type,
                color: event.color,
              }
            : undefined,
        });
      },

      toggleEventMode: () => {
        set((state) => ({ isEventMode: !state.isEventMode }));
      },
      
      getParentForDay: (date: Date) => {
        return get().days[formatDate(date)] || null;
      },

      getDayDetails: (date: Date) => {
        return get().dayDetails[formatDate(date)];
      },

      getEventsForDay: (date: Date) => {
        const dateStr = formatDate(date);
        return get().events.filter((event) => 
          dateStr >= event.startDate && dateStr <= event.endDate
        );
      },

      clearAllDays: () => {
        set({ days: {}, dayDetails: {}, events: [] });
        logAction('CLEAR_CALENDAR', {
          details: 'All days and events cleared',
          entityType: 'calendar',
          payload: {
            cleared: true,
          },
        });
      },

      initializeDefaultEvents: () => {
        set((state) => {
          if (state.events.length > 0) return {}; // Already initialized
          
          const newEvents: CalendarEvent[] = Object.entries(defaultEvents2026).map(([date, name]) => ({
            id: crypto.randomUUID(),
            title: name,
            startDate: date,
            endDate: date,
            type: 'holiday',
            color: '#EF4444', // Red for holidays
          }));
          
          logAction('INIT_DEFAULT_EVENTS', {
            details: `Initialized ${newEvents.length} default events`,
            entityType: 'event',
            payload: {
              count: newEvents.length,
            },
          });
          return { events: newEvents };
        });
      },

      setEvents: (events: CalendarEvent[]) => {
        set({ events });
      },

      setDays: (days: Record<string, ParentType>, dayDetails?: Record<string, { exchangeTime?: string }>) => {
        set((state) => ({ 
          days,
          dayDetails: dayDetails || state.dayDetails
        }));
      },
    }),
    {
      name: 'calendar-storage',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migrate from version 0 (legacy)
          let newEvents: CalendarEvent[] = [];
          const oldEvents = persistedState.events;

          if (Array.isArray(oldEvents)) {
            newEvents = oldEvents;
          } else if (typeof oldEvents === 'object' && oldEvents !== null) {
            // Attempt to migrate from Record<string, string> format
            newEvents = Object.entries(oldEvents)
              .map(([date, value]) => {
                if (typeof value === 'string') {
                  return {
                    id: crypto.randomUUID(),
                    title: value,
                    startDate: date,
                    endDate: date,
                    type: 'other' as const,
                    color: '#6366F1',
                  };
                }
                return null;
              })
              .filter((e) => e !== null) as CalendarEvent[];
          }

          return {
            ...persistedState,
            events: newEvents,
            dayDetails: {},
          };
        }
        
        if (version === 1) {
          return {
            ...persistedState,
            dayDetails: {},
          };
        }
        
        return persistedState;
      },
    }
  )
);
