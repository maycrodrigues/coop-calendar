import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details?: string;
  tenantId?: string; // Future proofing for multi-tenant
}

interface LogState {
  logs: LogEntry[];
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
}

export const useLogStore = create<LogState>()(
  persist(
    (set) => ({
      logs: [],
      addLog: (entry) => {
        set((state) => ({
          logs: [
            {
              id: crypto.randomUUID(),
              timestamp: new Date().toISOString(),
              ...entry,
            },
            ...state.logs,
          ],
        }));
      },
      clearLogs: () => set({ logs: [] }),
    }),
    {
      name: 'audit-logs',
    }
  )
);
