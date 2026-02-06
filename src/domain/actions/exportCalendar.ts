import { useCalendarStore } from '../../infrastructure/stores/useCalendarStore';

export const exportCalendar = () => {
  const { days } = useCalendarStore.getState();
  return JSON.stringify(days, null, 2);
};