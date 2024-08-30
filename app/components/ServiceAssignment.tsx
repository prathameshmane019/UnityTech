'use client'

import { useState, useEffect } from 'react'
import { getServices, createSubscription } from '@/app/libs/api'
import { IService, ISubscription } from '@/app/types/type'

interface ServiceAssignmentProps {
  userId: string;
  onSubscriptionAdded: (newSubscription: ISubscription) => void;
}
export default function ServiceAssignment({ userId, onSubscriptionAdded }: ServiceAssignmentProps) {
  const [services, setServices] = useState<IService[]>([]);
  const [formData, setFormData] = useState({
    serviceId: '',
    domain: '',
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const fetchedServices = await getServices();
      setServices(fetchedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.serviceId && formData.startDate && formData.endDate) {
      setLoading(true);
      try {
        const newSubscription = await createSubscription({
          userId,
          serviceId: formData.serviceId,
          startDate: new Date(formData.startDate),
          endDate: new Date(formData.endDate),
          status: 'active',
          domain: formData.domain,
          access: true,
        });
        onSubscriptionAdded(newSubscription);
        setFormData({ serviceId: '', domain: '', startDate: '', endDate: '' });
      } catch (error) {
        console.error('Error creating subscription:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white text-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Assign Service</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Service:</label>
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Domain:</label>
        <input
          type="text"
          name="domain"
          value={formData.domain}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      </div>
      <button 
        type="submit" 
        className="bg-green-500 text-gray-900 px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        disabled={!formData.serviceId || !formData.startDate || !formData.endDate || loading}
      >
        {loading ? 'Assigning...' : 'Assign Service'}
      </button>
    </form>
  );
}