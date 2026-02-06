import { useCallback } from 'react';
import { useLogStore } from '../../infrastructure/stores/useLogStore';
import { useAuthStore } from '../../infrastructure/stores/useAuthStore';

export const useLogger = () => {
  const { addLog } = useLogStore();
  const { email } = useAuthStore();

  const logAction = useCallback((action: string, details?: string) => {
    addLog({
      user: email || 'anonymous',
      action,
      details,
    });
    console.log(`[Audit] ${email || 'anonymous'} - ${action}: ${details || ''}`);
  }, [addLog, email]);

  return { logAction };
};
