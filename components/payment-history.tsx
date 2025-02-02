import type { ISubscription } from "@/app/types/type"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PaymentHistoryProps {
  subscriptions: ISubscription[]
}

export function PaymentHistory({ subscriptions }: PaymentHistoryProps) {
  // This is a mock function to generate payment history
  // In a real application, you would fetch this data from your backend
  const generatePaymentHistory = (subscription: ISubscription) => {
    const payments = []
    const currentDate = new Date(subscription.startDate)
    const endDate = new Date(subscription.endDate)

    while (currentDate <= endDate) {
      payments.push({
        date: new Date(currentDate),
        amount: subscription.cost * (1 - subscription.discountPercentage / 100),
        status: "Paid",
      })

      // Advance to the next payment date based on billing cycle
      switch (subscription.billingCycle) {
        case "monthly":
          currentDate.setMonth(currentDate.getMonth() + 1)
          break
        case "quarterly":
          currentDate.setMonth(currentDate.getMonth() + 3)
          break
        case "annually":
          currentDate.setFullYear(currentDate.getFullYear() + 1)
          break
      }
    }

    return payments
  }

  const allPayments = subscriptions.flatMap(generatePaymentHistory)
  allPayments.sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort by date descending

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPayments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment.date.toLocaleDateString()}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

