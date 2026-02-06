import { webhookService } from '../../infrastructure/services/webhook/webhookService';
import { SaveRecord } from '../../presentation/hooks/calendar/types';

export const saveCalendar = async (records: SaveRecord[]): Promise<void> => {
  // Transform records to webhook format
  const webhookData = {
    records: records.map(record => ({
      date: record.data,
      responsibility: record.responsibility,
    })),
  };

  // Send data to webhook
  await webhookService.sendData(webhookData);

  // Also save to localStorage as backup
  localStorage.setItem('calendar-backup', JSON.stringify(records));
};