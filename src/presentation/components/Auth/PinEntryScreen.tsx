import React, { useState, useEffect, useRef } from 'react';
import { Lock, LogOut } from 'lucide-react';
import { useAuthStore } from '../../../infrastructure/stores/useAuthStore';
import { useLogger } from '../../hooks/useLogger';

export const PinEntryScreen: React.FC = () => {
  const { verifyPin, resetAuth, email } = useAuthStore();
  const { logAction } = useLogger();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedPin = value.slice(0, 6).split('');
      const newPin = [...pin];
      pastedPin.forEach((digit, i) => {
        if (i < 6) newPin[i] = digit;
      });
      setPin(newPin);
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedPin.length, 5);
      inputRefs.current[nextIndex]?.focus();
      
      // Auto submit if full
      if (pastedPin.length === 6) {
        handleVerify(newPin.join(''));
      }
      return;
    }

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(false);

    // Auto focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify
    if (index === 5 && value !== '') {
      handleVerify(newPin.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (pinString: string) => {
    const isValid = verifyPin(pinString);
    if (isValid) {
      logAction('LOGIN_SUCCESS', 'User logged in successfully with PIN');
    } else {
      setError(true);
      logAction('LOGIN_FAILED', 'Invalid PIN attempt');
      // Shake animation or clear could go here
      setTimeout(() => {
        setPin(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 500);
    }
  };

  const handleReset = () => {
    if (window.confirm('Isso irá desconectar sua conta e remover o PIN salvo. Deseja continuar?')) {
      resetAuth();
      logAction('AUTH_RESET', 'User reset authentication');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
          <Lock className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Digite seu PIN
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Olá, <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center gap-2 mb-6">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="password"
                maxLength={1}
                className={`w-12 h-14 text-center text-2xl font-bold border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${
                  error ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-300'
                }`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-red-600 text-sm mb-4">
              PIN incorreto. Tente novamente.
            </p>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <LogOut size={14} />
              Não é você? Sair e reconfigurar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
