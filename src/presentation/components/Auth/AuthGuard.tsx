import React from 'react';
import { useAuthStore } from '../../../infrastructure/stores/useAuthStore';
import { LoginScreen } from './LoginScreen';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { email, isAuthenticated } = useAuthStore();

  // 1. If no email or not authenticated, show login
  if (!email || !isAuthenticated) {
    return <LoginScreen />;
  }

  // 2. Authenticated -> Show content
  return <>{children}</>;
};
