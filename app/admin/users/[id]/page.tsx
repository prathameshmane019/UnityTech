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
import type { IUser, ISubscription, IService } from "@/app/types/type"
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
  _id: z.string().optional(),
  userId: z.string(),
  serviceId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(["active", "inactive", "pending"]),
  domain: z.string(),
  access: z.boolean(),
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
      serviceId: "",
      startDate: "",
      endDate: "",
      status: "pending",
      domain: "",
      access: false,
    },
  })

  useEffect(() => {
    fetchUserData()
    fetchServices()
  }, []) // Removed params.id from dependencies

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
      if (editingSubscription) {
        await updateSubscription(editingSubscription._id, {
          ...values,
          startDate: new Date(values.startDate),
          endDate: new Date(values.endDate),
        })
        toast({ title: "Subscription updated successfully" })
      } else {
        await createSubscription({
          ...values,
          startDate: new Date(values.startDate),
          endDate: new Date(values.endDate),
        })
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

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <Button onClick={() => router.push("/admin/users")} className="mb-4">
        Back to Users
      </Button>
      <h1 className="text-3xl font-bold mb-6">{user.name}&apos;s Subscriptions</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Subscription</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingSubscription ? "Edit Subscription" : "Add New Subscription"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
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
          <CardTitle>Subscription History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription._id}>
                  <TableCell>
                    {services.find((s) => s._id === subscription.serviceId)?.name || subscription.serviceId}
                  </TableCell>
                  <TableCell>{subscription.status}</TableCell>
                  <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{subscription.domain}</TableCell>
                  <TableCell>{subscription.access ? "Yes" : "No"}</TableCell>
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

