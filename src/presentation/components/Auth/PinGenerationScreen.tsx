import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, Copy } from 'lucide-react';
import { useAuthStore } from '../../../infrastructure/stores/useAuthStore';
import { useLogger } from '../../hooks/useLogger';

export const PinGenerationScreen: React.FC = () => {
  const { setPin, email } = useAuthStore();
  const { logAction } = useLogger();
  const [generatedPin, setGeneratedPin] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    // Generate a 6-digit PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPin(pin);
  }, []);

  const handleConfirm = () => {
    setPin(generatedPin);
    logAction('PIN_CREATED', 'User created a new PIN');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPin);
    // Could show a toast here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <ShieldCheck className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Seu Novo PIN
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Guarde este número com segurança. Você precisará dele para acessar o sistema.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="mb-8">
            <div className="text-5xl font-mono font-bold tracking-widest text-indigo-600 select-all p-4 bg-indigo-50 rounded-lg border border-indigo-100 mb-2">
              {generatedPin}
            </div>
            <button 
              onClick={copyToClipboard}
              className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-1 mx-auto"
            >
              <Copy size={14} />
              Copiar para área de transferência
            </button>
          </div>

          <div className="flex items-start mb-6 text-left p-4 bg-yellow-50 rounded-md border border-yellow-200">
            <div className="flex-shrink-0">
              <ShieldCheck className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Atenção
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Este PIN é exclusivo para este dispositivo. Se você limpar os dados do navegador, precisará gerar um novo.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="confirm-save"
                name="confirm-save"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <label htmlFor="confirm-save" className="ml-2 block text-sm text-gray-900">
                Eu salvei meu PIN em um local seguro
              </label>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!confirmed}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                confirmed 
                  ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <Check className="ml-2 h-4 w-4" />
              Acessar Sistema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
