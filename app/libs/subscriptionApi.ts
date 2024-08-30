import { ISubscription } from '@/app/types/type'
import { fetchWithErrorHandling } from './api'

const API_URL = 'http://localhost:3000/api/subscriptions'

export async function getSubscriptions(userId?: string): Promise<ISubscription[]> {
  const url = userId ? `${API_URL}/user/${userId}` : API_URL
  return fetchWithErrorHandling(url)
}

export async function createSubscription(subscriptionData: Omit<ISubscription, '_id'>): Promise<ISubscription> {
  return fetchWithErrorHandling(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData),
  })
}

export async function getSubscriptionById(id: string): Promise<ISubscription> {
  return fetchWithErrorHandling(`${API_URL}/${id}`)
}

export async function updateSubscription(id: string, subscriptionData: Partial<ISubscription>): Promise<ISubscription> {
  return fetchWithErrorHandling(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData),
  })
}

export async function deleteSubscription(id: string): Promise<void> {
  return fetchWithErrorHandling(`${API_URL}/${id}`, { method: 'DELETE' })
}

export async function revokeAccess(id: string): Promise<void> {
  return fetchWithErrorHandling(`${API_URL}/${id}/revoke`, { method: 'POST' })
}