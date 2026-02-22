import { useCallback } from 'react';
import { useLogStore } from '../../infrastructure/stores/useLogStore';
import { useAuthStore } from '../../infrastructure/stores/useAuthStore';

type LogLevel = 'info' | 'warning' | 'error';

interface LogActionOptions {
  details?: string;
  entityType?: string;
  entityId?: string;
  level?: LogLevel;
  payload?: Record<string, unknown>;
}

const getClientContext = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const path = window.location?.pathname;
  const language = window.navigator?.language;
  const userAgent = window.navigator?.userAgent;

  return {
    path,
    language,
    userAgent,
  };
};

export const useLogger = () => {
  const { addLog } = useLogStore();
  const { email } = useAuthStore();

  const logAction = useCallback(
    (action: string, options: LogActionOptions = {}) => {
      const { details, entityType, entityId, level, payload } = options;
      const baseUser = email || 'anonymous';
      const context = getClientContext();

      addLog({
        user: baseUser,
        action,
        details,
        level: level || 'info',
        entityType,
        entityId,
        payload,
        ...context,
      });

      const consoleDetails = details || '';
      console.log(`[Audit] ${baseUser} - ${action}: ${consoleDetails}`);
    },
    [addLog, email]
  );

  return { logAction };
};
