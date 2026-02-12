import { create } from 'zustand';
import { CalendarEvent } from '../../domain/entities/CalendarEvent';

interface EventModalState {
  isOpen: boolean;
  isExchangeOpen: boolean;
  selectedDate: Date | null;
  selectedEndDate: Date | null;
  selectedEvent: CalendarEvent | null;
  openModal: (date: Date, event?: CalendarEvent | null, endDate?: Date | null) => void;
  closeModal: () => void;
  openExchangeModal: (date: Date) => void;
  closeExchangeModal: () => void;
}

export const useEventModalStore = create<EventModalState>((set) => ({
  isOpen: false,
  isExchangeOpen: false,
  selectedDate: null,
  selectedEndDate: null,
  selectedEvent: null,
  openModal: (date, event = null, endDate = null) => set({ 
    isOpen: true, 
    selectedDate: date, 
    selectedEvent: event,
    selectedEndDate: endDate,
    isExchangeOpen: false // Ensure other modal is closed
  }),
  closeModal: () => set({ 
    isOpen: false, 
    selectedDate: null, 
    selectedEndDate: null,
    selectedEvent: null 
  }),
  openExchangeModal: (date) => set({
    isExchangeOpen: true,
    selectedDate: date,
    isOpen: false // Ensure other modal is closed
  }),
  closeExchangeModal: () => set({
    isExchangeOpen: false,
    selectedDate: null
  })
}));
