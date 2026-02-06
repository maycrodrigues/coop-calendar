import React from 'react';
import { useAuthStore } from '../../../infrastructure/stores/useAuthStore';
import { LoginScreen } from './LoginScreen';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { email, isAuthenticated } = useAuthStore();

  if (!email || !isAuthenticated) {
    return <LoginScreen />;
  }

  return <>{children}</>;
};
