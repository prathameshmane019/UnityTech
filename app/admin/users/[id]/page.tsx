'use client'

import { useState, useEffect } from 'react'
import { getUserById, getSubscriptions, revokeAccess, updateSubscription } from '@/app/libs/api'
import { IUser, ISubscription } from '@/app/types/type'
import ServiceAssignment from '@/app/components/ServiceAssignment'
import SubscriptionList from '@/app/components/SubscriptionList'

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [params.id])

  const fetchUserData = async () => {
    setLoading(true)
    try {
      const [userData, userSubscriptions] = await Promise.all([
        getUserById(params.id),
        getSubscriptions(params.id)
      ])
      setUser(userData)
      setSubscriptions(userSubscriptions)
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRevokeAccess = async (subscriptionId: string) => {
    try {
      await revokeAccess(subscriptionId)
      setSubscriptions(prevSubscriptions => 
        prevSubscriptions.map(sub => 
          sub._id === subscriptionId ? { ...sub, access: false, status: 'inactive' } : sub
        )
      )
    } catch (error) {
      console.error('Error revoking access:', error)
    }
  }

  const handleUpdateStatus = async (subscriptionId: string, status: 'active' | 'inactive' | 'pending') => {
    try {
      await updateSubscription(subscriptionId, { status })
      setSubscriptions(prevSubscriptions => 
        prevSubscriptions.map(sub => 
          sub._id === subscriptionId ? { ...sub, status } : sub
        )
      )
    } catch (error) {
      console.error('Error updating subscription status:', error)
    }
  }

  const handleSubscriptionAdded = (newSubscription: ISubscription) => {
    setSubscriptions(prev => [...prev, newSubscription])
  }

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div className="p-6 max-w-4xl text-gray-900 mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{user.name}</h1>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-2"><strong>Type:</strong> {user.type}</p>
        {user.type === 'organization' && <p className="mb-2"><strong>Organization:</strong> {user.organizationName}</p>}
      </div>

      <SubscriptionList 
        subscriptions={subscriptions} 
        onRevokeAccess={handleRevokeAccess} 
        onUpdateStatus={handleUpdateStatus}
      />

      <ServiceAssignment 
        userId={params.id} 
        onSubscriptionAdded={handleSubscriptionAdded}
      />
    </div>
  )
}