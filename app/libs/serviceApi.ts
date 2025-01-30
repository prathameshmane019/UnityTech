import { IService } from '@/app/types/type'
import { fetchWithErrorHandling } from './api'

const API_URL = '/api/services'

export async function getServices(): Promise<IService[]> {
  return fetchWithErrorHandling(API_URL)
}

export async function createService(serviceData: Omit<IService, '_id'>): Promise<IService> {
  return fetchWithErrorHandling(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceData),
  })
}

export async function getServiceById(_id: string): Promise<IService> {
  return fetchWithErrorHandling(`${API_URL}/${_id}`)
}

export async function updateService(_id: string, serviceData: Partial<IService>): Promise<IService> {
  console.log(serviceData);
  
  return fetchWithErrorHandling(`${API_URL}/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceData),
  })
}

export async function deleteService(_id: string): Promise<void> {
  console.log(_id);
  return fetchWithErrorHandling(`${API_URL}/${_id}`, { method: 'DELETE' })
}