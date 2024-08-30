import { ISubscription } from '@/app/types/type'

interface SubscriptionListProps {
  subscriptions: ISubscription[]
  onRevokeAccess: (subscriptionId: string) => void
  onUpdateStatus: (subscriptionId: string, status: 'active' | 'inactive' | 'pending') => void
}

export default function SubscriptionList({ subscriptions, onRevokeAccess, onUpdateStatus }: SubscriptionListProps) {
  return (
    <div className="mt-6 bg-white text-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
      <ul className="space-y-4">
        {subscriptions.map((subscription) => (
          <li key={subscription.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="space-y-1">
                <p><span className="font-semibold">Service ID:</span> {subscription.serviceId}</p>
                <p><span className="font-semibold">Domain:</span> {subscription.domain}</p>
                <p><span className="font-semibold">Status:</span> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                    subscription.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() => onUpdateStatus(subscription.id, subscription.status === 'active' ? 'inactive' : 'active')}
                  className={`px-3 py-1 rounded text-white transition-colors ${
                    subscription.status === 'active'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                  disabled={!subscription.access}
                >
                  {subscription.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => onRevokeAccess(subscription.id)}
                  className={`px-3 py-1 rounded text-white transition-colors ${
                    subscription.access
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {subscription.access ? "Revoke Access" : "Grant Access"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}