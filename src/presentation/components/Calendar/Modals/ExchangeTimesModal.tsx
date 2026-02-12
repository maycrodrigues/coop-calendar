import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { X, Clock, Save, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useEventModalStore } from '../../../hooks/useEventModalStore';
import { useCalendarStore } from '../../../../infrastructure/stores/useCalendarStore';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export const ExchangeTimesModal = () => {
  const { isExchangeOpen, selectedDate, closeExchangeModal } = useEventModalStore();
  const getDayDetails = useCalendarStore((state) => state.getDayDetails);
  const setDayDetails = useCalendarStore((state) => state.setDayDetails);

  const [exchangeTime, setExchangeTime] = useState('');

  useEffect(() => {
    if (isExchangeOpen && selectedDate) {
      const details = getDayDetails(selectedDate);
      setExchangeTime(details?.exchangeTime || '');
    }
  }, [isExchangeOpen, selectedDate ? selectedDate.getTime() : 0, getDayDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      try {
        setDayDetails(selectedDate, {
          exchangeTime: exchangeTime || undefined,
        });
        
        Toast.fire({
          icon: 'success',
          title: 'Horário salvo com sucesso!'
        });
        
        closeExchangeModal();
      } catch (error) {
        console.error('Error saving exchange time:', error);
        Toast.fire({
          icon: 'error',
          title: 'Erro ao salvar horário.'
        });
      }
    }
  };

  const handleRemove = () => {
    if (selectedDate) {
      try {
        setDayDetails(selectedDate, {
          exchangeTime: undefined,
        });
        
        Toast.fire({
          icon: 'success',
          title: 'Horário removido com sucesso!'
        });
        
        closeExchangeModal();
      } catch (error) {
        console.error('Error removing exchange time:', error);
        Toast.fire({
          icon: 'error',
          title: 'Erro ao remover horário.'
        });
      }
    }
  };

  if (!isExchangeOpen || !selectedDate) return null;

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen p-0 sm:px-4 sm:pt-4 sm:pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50 backdrop-blur-sm" aria-hidden="true" onClick={closeExchangeModal}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-t-2xl rounded-b-none sm:rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-md sm:w-full border border-gray-100">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2" id="modal-title">
                <Clock size={20} className="text-blue-600" />
                Horário de Troca
              </h3>
              <button onClick={closeExchangeModal} className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="mb-4 text-sm text-gray-500">
              Defina o horário para {format(selectedDate, 'dd/MM/yyyy')}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-blue-700 mb-1">Horário</label>
                    <input
                      type="time"
                      autoFocus
                      value={exchangeTime}
                      onChange={(e) => setExchangeTime(e.target.value)}
                      className="block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                {exchangeTime && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="mr-auto flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                    Remover
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeExchangeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  <Save size={16} />
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
