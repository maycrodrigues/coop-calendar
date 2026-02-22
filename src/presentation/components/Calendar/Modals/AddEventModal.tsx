import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { X, Calendar as CalendarIcon, Type, AlignLeft, Palette, Trash2, Save, Clock } from 'lucide-react';
import { useEventModalStore } from '../../../hooks/useEventModalStore';
import { useCalendarStore } from '../../../../infrastructure/stores/useCalendarStore';
import { CalendarEvent, EventType } from '../../../../domain/entities/CalendarEvent';
import { ParentType } from '../../../../domain/entities/CalendarDay';
import { useTranslation } from 'react-i18next';
import { useConfirmationAlert } from '../../../services/alerts/confirmationAlert';
import { showToast } from '../../../services/alerts/toastAlert';

const EVENT_TYPES: { value: EventType; label: string; color: string }[] = [
  { value: 'vacation', label: 'Férias', color: '#10B981' }, // Green
  { value: 'school_holiday', label: 'Férias Escolares', color: '#F59E0B' }, // Amber
  { value: 'holiday', label: 'Feriado', color: '#EF4444' }, // Red
  { value: 'other', label: 'Outro', color: '#6366F1' }, // Indigo
];

const COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#84CC16', '#10B981', 
  '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#6B7280'
];

export const AddEventModal = () => {
  const { isOpen, selectedDate, selectedEndDate, selectedEvent, closeModal } = useEventModalStore();
  const { addEvent, updateEvent, removeEvent } = useCalendarStore();
  const { t } = useTranslation();
  const { showConfirmation } = useConfirmationAlert();

  // Event State
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState<EventType>('other');
  const [color, setColor] = useState(COLORS[7]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen && selectedDate) {
      if (selectedEvent) {
        setTitle(selectedEvent.title);
        setStartDate(selectedEvent.startDate);
        setEndDate(selectedEvent.endDate);
        setType(selectedEvent.type);
        setColor(selectedEvent.color || COLORS[7]);
        setDescription(selectedEvent.description || '');
      } else {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const endDateStr = selectedEndDate ? format(selectedEndDate, 'yyyy-MM-dd') : dateStr;
        
        setTitle('');
        setStartDate(dateStr);
        setEndDate(endDateStr);
        setType('other');
        setColor(COLORS[7]);
        setDescription('');
      }
    }
  }, [isOpen, selectedDate, selectedEndDate, selectedEvent]); // Removed store actions to avoid re-runs

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If not editing an event and title is empty, just close (saved details above)
    if (!selectedEvent && !title.trim()) {
      closeModal();
      return;
    }
    
    const eventData: CalendarEvent = {
      id: selectedEvent?.id || crypto.randomUUID(),
      title,
      startDate,
      endDate,
      type,
      color,
      description
    };

    if (selectedEvent) {
      updateEvent(eventData);
    } else {
      addEvent(eventData);
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    const confirmed = await showConfirmation({
      text: t('calendar.event.confirmDelete', 'Tem certeza que deseja remover este evento?'),
      icon: 'warning',
    });
    if (confirmed) {
      removeEvent(selectedEvent.id);
      showToast({
        message: t('calendar.event.removed'),
        type: 'success',
      });
      closeModal();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen p-0 sm:px-4 sm:pt-4 sm:pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50 backdrop-blur-sm" aria-hidden="true" onClick={closeModal}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-t-2xl rounded-b-none sm:rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-100">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2" id="modal-title">
                {selectedEvent ? 'Editar Evento' : 'Novo Evento'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título do Evento</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="title"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-shadow"
                    placeholder="Ex: Aniversário, Consulta Médica..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>


              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Início</label>
                  <div className="relative">
                    <input
                      type="date"
                      id="startDate"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Fim</label>
                  <div className="relative">
                    <input
                      type="date"
                      id="endDate"
                      required
                      min={startDate}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Evento</label>
                <div className="grid grid-cols-2 gap-2">
                  {EVENT_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => {
                        setType(t.value);
                        setColor(t.color);
                      }}
                      className={`
                        flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all
                        ${type === t.value 
                          ? 'bg-purple-50 border-purple-200 text-purple-700 ring-1 ring-purple-200' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }}></span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cor</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`
                        w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110
                        ${color === c ? 'border-gray-400 scale-110' : 'border-transparent'}
                      `}
                      style={{ backgroundColor: c }}
                      aria-label={`Select color ${c}`}
                    >
                      {color === c && <div className="w-2 h-2 bg-white rounded-full" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição (Opcional)</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <AlignLeft className="h-4 w-4 text-gray-400" />
                  </div>
                  <textarea
                    id="description"
                    rows={3}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Detalhes adicionais..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-6">
                {selectedEvent ? (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                    Excluir
                  </button>
                ) : (
                  <div></div> // Spacer
                )}
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    <Save size={16} />
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
