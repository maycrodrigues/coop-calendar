import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useLogStore } from './useLogStore';

interface AuthState {
  email: string | null;
  isAuthenticated: boolean;
  
  login: (email: string) => void;
  logout: () => void;
  resetAuth: () => void;
}

const logAuthAction = (action: string, email: string | null, details?: string) => {
  useLogStore.getState().addLog({
    user: email || 'anonymous',
    action,
    details,
  });
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      email: null,
      isAuthenticated: false,

      login: (email: string) => {
        set({ email, isAuthenticated: true });
        logAuthAction('LOGIN', email, 'User identified');
      },

      logout: () => {
        const { email } = get();
        set({ isAuthenticated: false, email: null });
        logAuthAction('LOGOUT', email, 'User session ended');
      },
      
      resetAuth: () => {
        const { email } = get();
        set({ email: null, isAuthenticated: false });
        logAuthAction('RESET_AUTH', email, 'Auth data cleared');
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ email: state.email, isAuthenticated: state.isAuthenticated }),
    }
  )
);
