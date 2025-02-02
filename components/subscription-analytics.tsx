import type { ISubscription } from "@/app/types/type"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface SubscriptionAnalyticsProps {
  subscriptions: ISubscription[]
}

export function SubscriptionAnalytics({ subscriptions }: SubscriptionAnalyticsProps) {
  const activeSubscriptions = subscriptions.filter((sub) => sub.status === "active")
  const totalRevenue = activeSubscriptions.reduce((sum, sub) => sum + sub.cost, 0)
  const averageDiscount =
    activeSubscriptions.reduce((sum, sub) => sum + sub.discountPercentage, 0) / activeSubscriptions.length

  const subscriptionsByService = activeSubscriptions.reduce(
    (acc, sub) => {
      acc[sub.serviceId] = (acc[sub.serviceId] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(subscriptionsByService).map(([serviceId, count]) => ({
    service: serviceId,
    subscriptions: count,
  }))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeSubscriptions.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Discount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageDiscount.toFixed(2)}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions by Service</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="service" />
              <YAxis />
              <Bar dataKey="subscriptions" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

