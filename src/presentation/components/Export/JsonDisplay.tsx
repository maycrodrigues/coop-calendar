import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { showToast } from '../../services/alerts/toastAlert';

interface JsonDisplayProps {
  jsonData: string;
}

export const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonData }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      showToast({
        message: t('calendar.export.copySuccess'),
        type: 'success',
        duration: 1500,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast({
        message: t('calendar.export.copyError'),
        type: 'error',
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200"
        title={t('calendar.export.copy')}
      >
        {copied ? (
          <Check size={20} className="text-green-500" />
        ) : (
          <Copy size={20} className="text-gray-500" />
        )}
      </button>
      <pre className="text-left bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap break-all">
        <code>{jsonData}</code>
      </pre>
    </div>
  );
};