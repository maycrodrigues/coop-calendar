import { create } from 'zustand';
import { CalendarEvent } from '../../domain/entities/CalendarEvent';

interface EventModalState {
  isOpen: boolean;
  selectedDate: Date | null;
  selectedEndDate: Date | null;
  selectedEvent: CalendarEvent | null;
  openModal: (date: Date, event?: CalendarEvent | null, endDate?: Date | null) => void;
  closeModal: () => void;
}

export const useEventModalStore = create<EventModalState>((set) => ({
  isOpen: false,
  selectedDate: null,
  selectedEndDate: null,
  selectedEvent: null,
  openModal: (date, event = null, endDate = null) => set({ 
    isOpen: true, 
    selectedDate: date, 
    selectedEvent: event,
    selectedEndDate: endDate 
  }),
  closeModal: () => set({ 
    isOpen: false, 
    selectedDate: null, 
    selectedEndDate: null,
    selectedEvent: null 
  }),
}));
