export * from './userApi'
export * from './serviceApi'
export * from './subscriptionApi'

export async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'An error occurred')
  }
  return response.json()
}