import { WEBHOOK_CONFIG } from './config';
import { WebhookData } from './types';
import { WebhookResponse } from '../../../domain/types/webhook';

class WebhookService {
  constructor(private readonly baseUrl = WEBHOOK_CONFIG.url) {}

  async sendData(data: WebhookData): Promise<WebhookResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to webhook');
      }

      const result: WebhookResponse = await response.json();
      
      if (!result.success) {
        throw new Error('Webhook returned unsuccessful response');
      }

      return result;
    } catch (error) {
      console.error('Error sending data to webhook:', error);
      throw error;
    }
  }
}

export const webhookService = new WebhookService();