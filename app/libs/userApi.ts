import { IUser } from '@/app/types/type'
import { fetchWithErrorHandling } from './api'  

const API = '/api/users'

export async function getUsers(): Promise<IUser[]> {
  return fetchWithErrorHandling(API)
}

export async function createUser(userData: Omit<IUser, '_id'>): Promise<IUser> {
  console.log(userData);
  
  return fetchWithErrorHandling(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
}

export async function getUserById(_id: string): Promise<IUser> {
  console.log(_id);
  
  return fetchWithErrorHandling(`${API}/${_id}`)
}

export async function updateUser(_id: string, userData: Partial<IUser>): Promise<IUser> {
  return fetchWithErrorHandling(`${API}/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
}

export async function deleteUser(_id: string): Promise<void> {
  return fetchWithErrorHandling(`${API}/${_id}`, { method: 'DELETE' })
}

