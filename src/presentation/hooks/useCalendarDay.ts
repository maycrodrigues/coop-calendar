import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCalendarStore } from '../../infrastructure/stores/useCalendarStore';
import { getNextParentInCycle, getAdjacentDaysParents } from '../../domain/utils/parentAssignment';
import { getCalendarDayStyles } from '../styles/calendarDayStyles';
import { showToast } from '../services/alerts/toastAlert';
import { getParentLabelKey } from '../utils/parentLabel';
import { useEventModalStore } from './useEventModalStore';

export const useCalendarDay = (date: Date) => {
  const { t } = useTranslation();
  const { 
    getParentForDay, 
    setParentForDay, 
    getEventsForDay 
  } = useCalendarStore();
  
  const { openModal } = useEventModalStore();
  
  const parent = getParentForDay(date);
  const events = getEventsForDay(date);
  const hasEvent = events.length > 0;
  
  const { previousParent, nextParent } = getAdjacentDaysParents(date, getParentForDay);

  const handleAddEvent = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    openModal(date);
  }, [date, openModal]);

  const handleEditEvent = useCallback((event: any, e: React.MouseEvent) => {
    e.stopPropagation();
    openModal(date, event);
  }, [date, openModal]);

  const handleDayClick = useCallback(async () => {
    const { nextParent } = getNextParentInCycle(parent);

    setParentForDay(date, nextParent);
    
    if (nextParent) {
      const labelKey = getParentLabelKey(date, nextParent, getParentForDay);
      showToast({
        message: t(labelKey),
        type: 'success',
        duration: 1500,
      });
    }
  }, [date, parent, setParentForDay, getParentForDay, t]);

  const styles = getCalendarDayStyles(parent, previousParent, nextParent, hasEvent);

  return {
    parent,
    events,
    handleDayClick,
    handleAddEvent,
    handleEditEvent,
    styles,
  };
};
