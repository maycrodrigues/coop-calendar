import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useLogStore } from './useLogStore';

interface AuthState {
  email: string | null;
  pin: string | null; // In a real app, store a hash. For offline/local-only, this is acceptable.
  isAuthenticated: boolean;
  
  login: (email: string) => void;
  setPin: (pin: string) => void;
  verifyPin: (pin: string) => boolean;
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
      pin: null,
      isAuthenticated: false,

      login: (email: string) => {
        set({ email });
        logAuthAction('LOGIN', email, 'User identified via email');
      },

      setPin: (pin: string) => {
        const { email } = get();
        set({ pin, isAuthenticated: true });
        logAuthAction('SET_PIN', email, 'New PIN set');
      },

      verifyPin: (inputPin: string) => {
        const { pin, email } = get();
        if (pin === inputPin) {
          set({ isAuthenticated: true });
          logAuthAction('AUTH_SUCCESS', email, 'PIN verified successfully');
          return true;
        }
        logAuthAction('AUTH_FAILURE', email, 'Invalid PIN attempt');
        return false;
      },

      logout: () => {
        const { email } = get();
        set({ isAuthenticated: false });
        logAuthAction('LOGOUT', email, 'User session ended');
      },
      
      resetAuth: () => {
        const { email } = get();
        set({ email: null, pin: null, isAuthenticated: false });
        logAuthAction('RESET_AUTH', email, 'Auth data cleared');
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ email: state.email, pin: state.pin }), // Don't persist isAuthenticated
    }
  )
);
