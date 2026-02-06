import React from 'react';
import { ClipboardList } from 'lucide-react';
import { useLogModalStore } from '../../../hooks/useLogModalStore';

export const AuditLogButton: React.FC = () => {
  const { openLogModal } = useLogModalStore();

  return (
    <button
      onClick={openLogModal}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
      title="Visualizar Logs de Auditoria"
    >
      <ClipboardList size={16} />
      <span>Auditoria</span>
    </button>
  );
};
