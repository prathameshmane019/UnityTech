'use client'

import { useState, useEffect } from 'react'
import { getServices } from '@/app/libs/api'
import { IService } from '@/app/types/type'

interface ServiceAssignmentProps {
  onAssign: (serviceId: string) => void
}

export default function ServiceAssignment({ onAssign }: ServiceAssignmentProps) {
  const [services, setServices] = useState<IService[]>([])
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const fetchedServices = await getServices()
    setServices(fetchedServices)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedService) {
      onAssign(selectedService)
      setSelectedService('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white text-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-xl  font-semibold mb-4">Assign Service</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Service:</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-gray-900 px-4 py-2 rounded hover:bg-green-600">
        Assign Service
      </button>
    </form>
  )
}