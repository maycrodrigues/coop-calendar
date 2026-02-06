import { useCalendarStore } from '../../infrastructure/stores/useCalendarStore';

export const clearCalendar = () => {
  const { clearAllDays } = useCalendarStore.getState();
  clearAllDays();
};