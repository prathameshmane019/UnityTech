"use client"

import { useState, useEffect } from "react"
import { getSubscriptions, createSubscription, updateSubscription, getUsers, getServices } from "@/app/libs/api"
import type { ISubscription, IUser, IService } from "@/app/types/type"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const subscriptionSchema = z.object({
  userId: z.string().min(1, "User is required"),
  serviceId: z.string().min(1, "Service is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.enum(["active", "inactive", "pending"]),
  domain: z.string().min(1, "Domain is required"),
  access: z.boolean(),
})

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [services, setServices] = useState<IService[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<ISubscription | null>(null)

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      userId: "",
      serviceId: "",
      startDate: "",
      endDate: "",
      status: "pending",
      domain: "",
      access: false,
    },
  })

  useEffect(() => {
    fetchSubscriptions()
    fetchUsers()
    fetchServices()
  }, [])

  const fetchSubscriptions = async () => {
    const data = await getSubscriptions()
    setSubscriptions(data)
  }

  const fetchUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  const fetchServices = async () => {
    const data = await getServices()
    setServices(data)
  }

  const onSubmit = async (values: z.infer<typeof subscriptionSchema>) => {
    try {
      const subscriptionData = {
        ...values,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
      }

      if (editingSubscription) {
        await updateSubscription(editingSubscription._id, subscriptionData)
        toast({ title: "Subscription updated successfully" })
      } else {
        await createSubscription(subscriptionData)
        toast({ title: "Subscription created successfully" })
      }
      setIsDialogOpen(false)
      setEditingSubscription(null)
      form.reset()
      fetchSubscriptions()
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your request",
        variant: "destructive",
      })
    }
  }

  const handleEditSubscription = (subscription: ISubscription) => {
    setEditingSubscription(subscription)
    form.reset({
      userId: subscription.userId,
      serviceId: subscription.serviceId,
      startDate: new Date(subscription.startDate).toISOString().split("T")[0],
      endDate: new Date(subscription.endDate).toISOString().split("T")[0],
      status: subscription.status,
      domain: subscription.domain,
      access: subscription.access,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Subscriptions</h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Subscription</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingSubscription ? "Edit Subscription" : "Add New Subscription"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user._id} value={user._id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service._id} value={service._id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="access"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Access</FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">{editingSubscription ? "Update Subscription" : "Add Subscription"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Subscription List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription._id}>
                  <TableCell>{users.find((u) => u._id === subscription.userId)?.name || subscription.userId}</TableCell>
                  <TableCell>
                    {services.find((s) => s._id === subscription.serviceId)?.name || subscription.serviceId}
                  </TableCell>
                  <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{subscription.status}</TableCell>
                  <TableCell>{subscription.domain}</TableCell>
                  <TableCell>{subscription.access ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleEditSubscription(subscription)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

