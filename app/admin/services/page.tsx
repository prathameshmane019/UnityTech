'use client'

import { useState, useEffect } from 'react'
import { getServices, createService, updateService, deleteService } from '@/app/libs/api'
import { IService } from '@/app/types/type'

export default function ServicesPage() {
  const [services, setServices] = useState<IService[]>([])
  const [currentService, setCurrentService] = useState<IService>({ _id: '', name: '', description: '' })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const data = await getServices()
    setServices(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      await updateService(currentService.id, currentService)
    } else {
      await createService(currentService)
    }
    setCurrentService({ _id: '', name: '', description: '' })
    setIsEditing(false)
    fetchServices()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentService({ ...currentService, [name]: value })
  }

  const handleEditService = (service: IService) => {
    setCurrentService(service)
    setIsEditing(true)
  }

  const handleDeleteService = async (id: string) => {
    console.log(id);
    console.log(services);
    
    await deleteService(id)
    fetchServices()
  }

  const handleCancelEdit = () => {
    setCurrentService({ _id: '', name: '', description: '' })
    setIsEditing(false)
  }

  return (
    <div className='text-gray-900'>
      <h1 className="text-3xl font-semibold mb-6">Services</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="_id"
          placeholder="Service ID"
          value={currentService._id}
          onChange={handleInputChange}
          className="mr-2 p-2 border rounded"
          disabled={isEditing}
        />
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={currentService.name}
          onChange={handleInputChange}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={currentService.description}
          onChange={handleInputChange}
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
          {isEditing ? 'Update Service' : 'Add Service'}
        </button>
        {isEditing && (
          <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        )}
      </form>

      <ul>
        {services.map((service) => (
          <li key={service._id} className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p>{service.description}</p>
            <div className="mt-4">
              <button
                onClick={() => handleEditService(service)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteService(service?.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}