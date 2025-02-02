// "use client"
// import { useState, useEffect } from "react"
// import { getSubscriptions, createSubscription, updateSubscription, getUsers, getServices } from "@/app/libs/api"
// import type { ISubscription, IUser, IService } from "@/app/types/type"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { toast } from "@/hooks/use-toast"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"

// const subscriptionSchema = z.object({
//   userId: z.string().min(1, "User is required"),
//   serviceId: z.string().min(1, "Service is required"),
//   startDate: z.string().min(1, "Start date is required"),
//   endDate: z.string().min(1, "End date is required"),
//   status: z.enum(["active", "inactive", "pending"]),
//   domain: z.string().min(1, "Domain is required"),
//   access: z.boolean(),
// })

// export default function SubscriptionsPage() {
//   const [subscriptions, setSubscriptions] = useState<ISubscription[]>([])
//   const [users, setUsers] = useState<IUser[]>([])
//   const [services, setServices] = useState<IService[]>([])
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [editingSubscription, setEditingSubscription] = useState<ISubscription | null>(null)

//   const form = useForm<z.infer<typeof subscriptionSchema>>({
//     resolver: zodResolver(subscriptionSchema),
//     defaultValues: {
//       userId: "",
//       serviceId: "",
//       startDate: "",
//       endDate: "",
//       status: "pending",
//       domain: "",
//       access: false,
//     },
//   })

//   useEffect(() => {
//     fetchSubscriptions()
//     fetchUsers()
//     fetchServices()
//   }, [])

//   const fetchSubscriptions = async () => {
//     const data = await getSubscriptions()
//     console.log(data);
    
//     setSubscriptions(data)
//   }

//   const fetchUsers = async () => {
//     const data = await getUsers()
//     setUsers(data)
//   }

//   const fetchServices = async () => {
//     const data = await getServices()
//     setServices(data)
//   }

//   const onSubmit = async (values: z.infer<typeof subscriptionSchema>) => {
//     try {
//       const subscriptionData = {
//         ...values,
//         startDate: new Date(values.startDate),
//         endDate: new Date(values.endDate),
//       }

//       if (editingSubscription) {
//         await updateSubscription(editingSubscription._id, subscriptionData)
//         toast({ title: "Subscription updated successfully" })
//       } else {
//         await createSubscription(subscriptionData)
//         toast({ title: "Subscription created successfully" })
//       }
//       setIsDialogOpen(false)
//       setEditingSubscription(null)
//       form.reset()
//       fetchSubscriptions()
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while processing your request",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleEditSubscription = (subscription: ISubscription) => {
//     setEditingSubscription(subscription)
//     form.reset({
//       userId: subscription.userId,
//       serviceId: subscription.serviceId,
//       startDate: new Date(subscription.startDate).toISOString().split("T")[0],
//       endDate: new Date(subscription.endDate).toISOString().split("T")[0],
//       status: subscription.status,
//       domain: subscription.domain,
//       access: subscription.access,
//     })
//     setIsDialogOpen(true)
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-3xl font-bold mb-6">Subscriptions</h1>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogTrigger asChild>
//           <Button className="mb-4">Add New Subscription</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>{editingSubscription ? "Edit Subscription" : "Add New Subscription"}</DialogTitle>
//           </DialogHeader>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="userId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>User</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select user" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {users.map((user) => (
//                           <SelectItem key={user._id} value={user._id}>
//                             {user.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="serviceId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Service</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select service" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {services.map((service) => (
//                           <SelectItem key={service._id} value={service._id}>
//                             {service.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="startDate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Start Date</FormLabel>
//                     <FormControl>
//                       <Input type="date" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="endDate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>End Date</FormLabel>
//                     <FormControl>
//                       <Input type="date" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="active">Active</SelectItem>
//                         <SelectItem value="inactive">Inactive</SelectItem>
//                         <SelectItem value="pending">Pending</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="domain"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Domain</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="access"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                     <div className="space-y-0.5">
//                       <FormLabel className="text-base">Access</FormLabel>
//                     </div>
//                     <FormControl>
//                       <Switch checked={field.value} onCheckedChange={field.onChange} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit">{editingSubscription ? "Update Subscription" : "Add Subscription"}</Button>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>

//       <Card>
//         <CardHeader>
//           <CardTitle>Subscription List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>User</TableHead>
//                 <TableHead>Service</TableHead>
//                 <TableHead>Start Date</TableHead>
//                 <TableHead>End Date</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Domain</TableHead>
//                 <TableHead>Access</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {subscriptions.map((subscription) => (
//                 <TableRow key={subscription._id}>
//                   <TableCell>{users.find((u) => u._id === subscription.userId)?.name || subscription.userId}</TableCell>
//                   <TableCell>
//                     {services.find((s) => s._id === subscription.serviceId)?.name || subscription.serviceId}
//                   </TableCell>
//                   <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
//                   <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
//                   <TableCell>{subscription.status}</TableCell>
//                   <TableCell>{subscription.domain}</TableCell>
//                   <TableCell>{subscription.access ? "Yes" : "No"}</TableCell>
//                   <TableCell>
//                     <Button variant="outline" onClick={() => handleEditSubscription(subscription)}>
//                       Edit
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// } 
"use client"
import { useState, useEffect, useCallback } from "react"
import { getSubscriptions, createSubscription, updateSubscription, getUsers, getServices } from "@/app/libs/api"
import type { ISubscription, IUser, IService } from "@/app/types/type"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CheckCircle2, XCircle, Clock, Banknote, RefreshCw } from "lucide-react"

const subscriptionSchema = z.object({
  userId: z.string().min(1, "User is required"),
  serviceId: z.string().min(1, "Service is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.enum(["active", "inactive", "pending"]),
  domain: z.string().min(1, "Domain is required"),
  access: z.boolean(),
  cost: z.number().min(0, "Cost must be a positive number"),
  discountPercentage: z.number().min(0).max(100, "Discount must be between 0 and 100"),
  billingCycle: z.enum(["monthly", "quarterly", "annually"]),
  autoRenew: z.boolean()
})

const defaultValues = {
  userId: "",
  serviceId: "",
  startDate: "",
  endDate: "",
  status: "pending" as const,
  domain: "",
  access: false,
  cost: 0,
  discountPercentage: 0,
  billingCycle: "monthly" as const,
  autoRenew: false
}


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
      cost: 0,
      discountPercentage: 0,
      billingCycle: "monthly",
      autoRenew: false
    },
  })

  const resetForm = useCallback(() => {
    form.reset(defaultValues)
    setEditingSubscription(null)
  }, [form])

  const handleModalChange = useCallback((open: boolean) => {
    if (!open) {
      resetForm()
    }
    setIsDialogOpen(open)
  }, [resetForm])

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

 
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: 'active' | 'inactive' | 'pending') => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    } as const
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${variants[status]}`}>
        {getStatusIcon(status)}
        <span className="text-sm font-medium capitalize">{status}</span>
      </div>
    )
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
      ...subscription,
      startDate: new Date(subscription.startDate).toISOString().split("T")[0],
      endDate: new Date(subscription.endDate).toISOString().split("T")[0],
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <p className="text-gray-500 mt-1">Manage your service subscriptions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleModalChange} >
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2" >
              <span className="hidden sm:inline" >Add New Subscription</span>
              <span className="sm:hidden">Add New</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]"  >
            <DialogHeader>
              <DialogTitle>{editingSubscription ? "Edit Subscription" : "Add New Subscription"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="access"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Access</FormLabel>
                          <FormDescription>Enable or disable access to the service</FormDescription>
                        </div>
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
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Auto Renew</FormLabel>
                          <FormDescription>Automatically renew subscription</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  {editingSubscription ? "Update Subscription" : "Add Subscription"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription List</CardTitle>
          <CardDescription>Manage and monitor all active subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Billing</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((subscription) => (
                  <TableRow key={subscription._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {users.find((u) => u._id === subscription.userId)?.name || subscription.userId}
                    </TableCell>
                    <TableCell>
                      {services.find((s) => s._id === subscription.serviceId)?.name || subscription.serviceId}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(subscription.status)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100">
                        {subscription.domain}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <Banknote className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">${subscription.cost}</span>
                        </div>
                        {subscription.discountPercentage > 0 && (
                          <span className="text-sm text-green-600">
                            -{subscription.discountPercentage}% off
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="capitalize">{subscription.billingCycle}</span>
                        {subscription.autoRenew && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <RefreshCw className="w-3 h-3" />
                            <span>Auto-renew</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4 text-gray-500" />
                          <span>{new Date(subscription.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <span>Until: {new Date(subscription.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSubscription(subscription)}
                          className="hover:bg-gray-100"
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {subscriptions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-gray-500">No subscriptions found</p>
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(true)}
                        >
                          Add your first subscription
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}