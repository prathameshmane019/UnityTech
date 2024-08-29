import { ISubscription } from '@/app/types/type'

interface SubscriptionListProps {
  subscriptions: ISubscription[]
  onRevokeAccess: (subscriptionId: string) => void
}

export default function SubscriptionList({ subscriptions, onRevokeAccess }: SubscriptionListProps) {
  return (
    <div className="mt-6 bg-white text-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.id} className="mb-2 p-2 border-b">
            <span>Service ID: {subscription.serviceId}</span>
            <span className="ml-4">Status: {subscription.status}</span>
            <button
              onClick={() => onRevokeAccess(subscription.id!)}
              className="ml-4 bg-red-500  px-2 py-1 rounded hover:bg-red-600"
            >
              Revoke Access
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}