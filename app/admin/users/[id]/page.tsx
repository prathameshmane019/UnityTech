'use client'

import { useState, useEffect } from 'react'
import { getUserById, revokeAccess } from '@/app/libs/api'
import { IUser, IService, ISubscription } from '@/app/types/type'
import ServiceAssignment from '@/app/components/ServiceAssignment'
import SubscriptionList from '@/app/components/SubscriptionList'

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([])

  useEffect(() => {
    fetchUserData()
  }, [params.id])

  const fetchUserData = async () => {
    const userData = await getUserById(params.id)
    setUser(userData)
  }

 

  const handleRevokeAccess = async (subscriptionId: string) => {
    await revokeAccess(subscriptionId)
    fetchUserData()
  }

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">{user.name}</h1>
      <p >Email: {user.email}</p>
      <p>Type: {user.type}</p>
      {user.type === 'organization' && <p>Organization: {user.organizationName}</p>}

      <SubscriptionList subscriptions={subscriptions} onRevokeAccess={handleRevokeAccess} />
    </div>
  )
}