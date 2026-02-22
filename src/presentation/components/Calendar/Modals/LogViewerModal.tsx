import React, { useState } from 'react';
import { X, Search, FileText, Download, Eye, Clipboard } from 'lucide-react';
import { useLogStore } from '../../../../infrastructure/stores/useLogStore';
import type { LogEntry } from '../../../../infrastructure/stores/useLogStore';
import { useLogModalStore } from '../../../hooks/useLogModalStore';

export const LogViewerModal: React.FC = () => {
  const { logs } = useLogStore();
  const { isOpen, closeLogModal } = useLogModalStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  if (!isOpen) return null;

  const filteredLogs = logs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Data,Usuário,Ação,Detalhes\n"
      + logs.map(log => {
          const date = new Date(log.timestamp).toLocaleString();
          const details = log.details ? log.details.replace(/,/g, ' ') : '';
          return `${date},${log.user},${log.action},${details}`;
        }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `audit_log_${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openDetails = (log: LogEntry) => {
    setSelectedLog(log);
  };

  const closeDetails = () => {
    setSelectedLog(null);
  };

  const handleCopyJson = () => {
    if (!selectedLog) return;
    const text = JSON.stringify(selectedLog, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeLogModal}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2" id="modal-title">
                <FileText className="h-5 w-5 text-gray-500" />
                Auditoria do Sistema
              </h3>
              <button
                onClick={closeLogModal}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Fechar</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Buscar logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={handleExport}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </button>
            </div>

            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg max-h-[60vh] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data/Hora
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Usuário
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ação
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLogs.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                              Nenhum registro encontrado.
                            </td>
                          </tr>
                        ) : (
                          filteredLogs.map((log) => (
                            <tr
                              key={log.id}
                              className="hover:bg-gray-50 cursor-pointer"
                              role="button"
                              tabIndex={0}
                              onClick={() => openDetails(log)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  openDetails(log);
                                }
                              }}
                              aria-label={`Abrir detalhes do log ${log.action} por ${log.user}`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(log.timestamp).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {log.user}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {log.action}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={closeLogModal}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
      {selectedLog && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/30" onClick={closeDetails} aria-hidden="true" />
          <div role="dialog" aria-modal="true" className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Eye className="h-5 w-5 text-gray-500" />
                Detalhes do Log
              </h4>
              <button
                onClick={closeDetails}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Fechar detalhes do log"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">ID</p>
                  <p className="text-sm font-medium text-gray-900 break-all">{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Data/Hora</p>
                  <p className="text-sm font-medium text-gray-900">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Usuário</p>
                  <p className="text-sm font-medium text-gray-900">{selectedLog.user}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ação</p>
                  <p className="text-sm font-medium text-gray-900">{selectedLog.action}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Nível</p>
                  <p className="text-sm font-medium text-gray-900">{selectedLog.level ?? 'info'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tenant</p>
                  <p className="text-sm font-medium text-gray-900">{selectedLog.tenantId ?? '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rota</p>
                  <p className="text-sm font-medium text-gray-900 break-all">{selectedLog.path ?? '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Idioma</p>
                  <p className="text-sm font-medium text-gray-900">{selectedLog.language ?? '-'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Detalhes</p>
                <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{selectedLog.details ?? '-'}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-gray-500">Conteúdo bruto (JSON)</p>
                  <button
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-2 text-xs text-indigo-600 hover:text-indigo-700"
                    title="Copiar JSON"
                  >
                    <Clipboard className="h-4 w-4" />
                    Copiar
                  </button>
                </div>
                <pre className="text-xs bg-gray-900 text-gray-100 rounded-md p-3 overflow-x-auto max-h-60">
{JSON.stringify(selectedLog, null, 2)}
                </pre>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t px-5 py-3">
              <button
                onClick={closeDetails}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
