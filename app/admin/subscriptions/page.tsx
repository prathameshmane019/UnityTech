'use client'
import { useState, useEffect } from 'react'
import { getSubscriptions, revokeAccess, updateSubscription } from '@/app/libs/api'
import { ISubscription } from '@/app/types/type'
import SubscriptionList from '@/app/components/SubscriptionList'

export default function AccessPage() {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([])

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    const data = await getSubscriptions()
    setSubscriptions(data)
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
  
  return (
    <SubscriptionList 
    subscriptions={subscriptions} 
    onRevokeAccess={handleRevokeAccess} 
    onUpdateStatus={handleUpdateStatus}
  />

  )
}