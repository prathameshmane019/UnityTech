import { fetchWithErrorHandling } from './api';

export interface Grievance {
  _id: string;
  name: string;
  email: string;
  issue?: string;
  suggestion?: string;
  image?: {
    image_url?: string;
    public_id?: string;
  };
  isRead: boolean;
  createdAt: string;
}


export interface EmailReplyPayload {
  to: string;
  subject: string;
  body: string;
  grievanceId: string;
}

export const GrievanceService = {
  async fetchAll(): Promise<Grievance[]> {
    return fetchWithErrorHandling('/api/grievances');
  },

  async fetchUnread(): Promise<Grievance[]> {
    return fetchWithErrorHandling('/api/grievances/unread');
  },

  async markAsRead(id: string): Promise<Grievance> {
    return fetchWithErrorHandling(`/api/grievances/${id}/read`, {
      method: 'PATCH'
    });
  },

  async markAsUnread(id: string): Promise<Grievance> {
    return fetchWithErrorHandling(`/api/grievances/${id}/unread`, {
      method: 'PATCH'
    });
  },

  async delete(id: string): Promise<Grievance> {
    return fetchWithErrorHandling(`/api/grievances/${id}`, {
      method: 'DELETE'
    });
  },
  
  async sendReply(payload: EmailReplyPayload): Promise<any> {
    return fetchWithErrorHandling('/api/grievances/reply', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};