"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getUserById,
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getServices,
} from "@/app/libs/api"
import type { IUser, ISubscription, IService, ISubscriptionService } from "@/app/types/type"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

// Updated schema to match the backend
const serviceSchema = z.object({
  serviceId: z.string().min(1, "Service is required"),
  baseCost: z.number().min(0, "Cost must be a positive number"),
  discountPercentage: z.number().min(0).max(100, "Discount must be between 0 and 100"),
  finalCost: z.number().min(0).optional(),
})

const subscriptionSchema = z.object({
  userId: z.string().min(1, "User is required"),
  services: z.array(serviceSchema).min(1, "At least one service is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.enum(["active", "inactive", "pending"]),
  domain: z.string().min(1, "Domain is required"),
  access: z.boolean(),
  billingCycle: z.enum(["monthly", "quarterly", "annually"]),
  autoRenew: z.boolean(),
})

export default function UserPage({ params }: { params: { _id: string } }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([])
  const [services, setServices] = useState<IService[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<ISubscription | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      userId: params._id,
      services: [{ serviceId: "", baseCost: 0, discountPercentage: 0 }],
      startDate: "",
      endDate: "",
      status: "pending",
      domain: "",
      access: false,
      billingCycle: "monthly",
      autoRenew: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  })

  useEffect(() => {
    fetchUserData()
    fetchServices()
  }, [params._id])

  const fetchUserData = async () => {
    try {
      const userData = await getUserById(params._id)
      setUser(userData)
      const userSubscriptions = await getSubscriptions(params._id)
      setSubscriptions(userSubscriptions)
    } catch (error) {
      toast({
        title: "Error fetching user data",
        description: "There was a problem fetching the user data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchServices = async () => {
    try {
      const servicesData = await getServices()
      setServices(servicesData)
    } catch (error) {
      toast({
        title: "Error fetching services",
        description: "There was a problem fetching the services. Please try again.",
        variant: "destructive",
      })
    }
  }

  const onSubmit = async (values: z.infer<typeof subscriptionSchema>) => {
    try {
      // Calculate finalCost for each service
      const processedServices = values.services.map(service => ({
        ...service,
        finalCost: service.baseCost * (1 - service.discountPercentage / 100),
      }))

      const subscriptionData = {
        ...values,
        services: processedServices,
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
      fetchUserData()
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
      ...subscription,
      startDate: new Date(subscription.startDate).toISOString().split("T")[0],
      endDate: new Date(subscription.endDate).toISOString().split("T")[0],
    })
    setIsDialogOpen(true)
  }

  const handleDeleteSubscription = async (_id: string) => {
    try {
      await deleteSubscription(_id)
      toast({ title: "Subscription deleted successfully" })
      fetchUserData()
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the subscription",
        variant: "destructive",
      })
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-10">
      <Button onClick={() => router.push("/admin/users")} className="mb-4">
        Back to Users
      </Button>
      <h1 className="text-3xl font-bold mb-6">{user.name}'s Subscriptions</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Subscription</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{editingSubscription ? "Edit Subscription" : "Add New Subscription"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name={`services.${index}.serviceId`}
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
                    name={`services.${index}.baseCost`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Cost</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`services.${index}.discountPercentage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => append({ serviceId: "", baseCost: 0, discountPercentage: 0 })}>
                Add Service
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  name="billingCycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Cycle</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select billing cycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="access"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 flex-1">
                      <FormLabel>Access</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="autoRenew"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 flex-1">
                      <FormLabel>Auto Renew</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">{editingSubscription ? "Update Subscription" : "Add Subscription"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Subscription History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Services</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription._id}>
                  <TableCell>
                    {subscription.services.map((service) => (
                      <div key={service.serviceId}>
                        {services.find((s) => s._id === service.serviceId)?.name || service.serviceId}
                        {` ($${service.finalCost || (service.baseCost * (1 - service.discountPercentage / 100)).toFixed(2)})`}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{subscription.status}</TableCell>
                  <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{subscription.domain}</TableCell>
                  <TableCell>{subscription.billingCycle}</TableCell>
                  <TableCell>{subscription.access ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    ${subscription.services.reduce((sum, s) => 
                      sum + (s.finalCost || (s.baseCost * (1 - s.discountPercentage / 100))), 0).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2" onClick={() => handleEditSubscription(subscription)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteSubscription(subscription._id)}>
                      Delete
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