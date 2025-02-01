export * from './userApi'
export * from './serviceApi'
export * from './subscriptionApi' 
// api.ts
import axios, { AxiosRequestConfig } from 'axios';
 

export async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  try {
    const axiosConfig: AxiosRequestConfig = {
      method: options?.method || 'GET',
      headers: options?.headers ? Object.fromEntries(new Headers(options.headers)) : undefined,
      data: options?.body ? JSON.parse(options.body as string) : undefined,
    };

    const response = await axios(url, axiosConfig);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || {};
      throw new Error(errorData.message || 'An error occurred');
    }
    throw error;
  }
}