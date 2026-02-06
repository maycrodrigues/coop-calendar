import React from 'react';
import { useAuthStore } from '../../../infrastructure/stores/useAuthStore';
import { LoginScreen } from './LoginScreen';
import { PinGenerationScreen } from './PinGenerationScreen';
import { PinEntryScreen } from './PinEntryScreen';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { email, pin, isAuthenticated } = useAuthStore();

  // 1. If no email, show login (Registration Step 1)
  if (!email) {
    return <LoginScreen />;
  }

  // 2. If email but no PIN, show PIN generation (Registration Step 2)
  if (!pin) {
    return <PinGenerationScreen />;
  }

  // 3. If email and PIN exist but not authenticated, show PIN entry (Login)
  if (!isAuthenticated) {
    return <PinEntryScreen />;
  }

  // 4. Authenticated -> Show content
  return <>{children}</>;
};
