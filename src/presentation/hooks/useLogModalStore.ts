import { create } from 'zustand';

interface LogModalStore {
  isOpen: boolean;
  openLogModal: () => void;
  closeLogModal: () => void;
}

export const useLogModalStore = create<LogModalStore>((set) => ({
  isOpen: false,
  openLogModal: () => set({ isOpen: true }),
  closeLogModal: () => set({ isOpen: false }),
}));
