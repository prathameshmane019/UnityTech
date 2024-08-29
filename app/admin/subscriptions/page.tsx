'use client'
import { useState, useEffect } from 'react'
import { getAccessRequests, updateAccessRequest } from '@/app/libs/api'
import { AccessRequest } from '@/app/types/type'

export default function AccessPage() {
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([])

  useEffect(() => {
    fetchAccessRequests()
  }, [])

  const fetchAccessRequests = async () => {
    const data = await getAccessRequests()
    setAccessRequests(data)
  }

  const handleUpdateAccessRequest = async (id: string, status: 'approved' | 'rejected') => {
    await updateAccessRequest(id, { status })
    fetchAccessRequests()
  }
  
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Access Management</h1>
      
      <ul>
        {accessRequests.map((request) => (
          <li key={request.id} className="bg-white text-gray-900 shadow rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold">Request ID: {request.id}</h2>
            <p>User ID: {request.userId}</p>
            <p>Service ID: {request.serviceId}</p>
            <p>Status: {request.status}</p>
            <div className="mt-4">
              <button
                onClick={() => handleUpdateAccessRequest(request.id, 'approved')}
                className="bg-green-500 text-gray-900 p-2 rounded mr-2"
                disabled={request.status !== 'pending'}
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdateAccessRequest(request.id, 'rejected')}
                className="bg-red-500 text-gray-900 p-2 rounded"
                disabled={request.status !== 'pending'}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}