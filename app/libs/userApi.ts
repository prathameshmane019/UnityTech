import { IUser } from '@/app/types/type'
import { fetchWithErrorHandling } from './api'  

const API = '/api/users'

export async function getUsers(): Promise<IUser[]> {
  return fetchWithErrorHandling(API)
}

export async function createUser(userData: Omit<IUser, 'id'>): Promise<IUser> {
  return fetchWithErrorHandling(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
}

export async function getUserById(id: string): Promise<IUser> {
  return fetchWithErrorHandling(`${API}/${id}`)
}

export async function updateUser(id: string, userData: Partial<IUser>): Promise<IUser> {
  return fetchWithErrorHandling(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
}

export async function deleteUser(id: string): Promise<void> {
  return fetchWithErrorHandling(`${API}/${id}`, { method: 'DELETE' })
}