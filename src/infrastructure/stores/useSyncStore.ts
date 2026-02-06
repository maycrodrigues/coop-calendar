import { create } from 'zustand';

interface SyncState {
  isSaving: boolean;
  lastSyncedAt: Date | null;
  setIsSaving: (isSaving: boolean) => void;
  setLastSyncedAt: (date: Date) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  isSaving: false,
  lastSyncedAt: null,
  setIsSaving: (isSaving) => set({ isSaving }),
  setLastSyncedAt: (date) => set({ lastSyncedAt: date }),
}));
