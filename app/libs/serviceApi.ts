import { IService } from '@/app/types/type'
import { fetchWithErrorHandling } from './api'

const API_URL = '/api/services'

export async function getServices(): Promise<IService[]> {
  return fetchWithErrorHandling(API_URL)
}

export async function createService(serviceData: Omit<IService, 'id'>): Promise<IService> {
  return fetchWithErrorHandling(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceData),
  })
}

export async function getServiceById(id: string): Promise<IService> {
  return fetchWithErrorHandling(`${API_URL}/${id}`)
}

export async function updateService(id: string, serviceData: Partial<IService>): Promise<IService> {
  return fetchWithErrorHandling(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceData),
  })
}

export async function deleteService(id: string): Promise<void> {
  console.log(id);
  return fetchWithErrorHandling(`${API_URL}/${id}`, { method: 'DELETE' })
}