'use client'

import { useState, useEffect } from 'react'
import { getServices, createService, updateService, deleteService } from '@/app/libs/api'
import { IService } from '@/app/types/type'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from '@/hooks/use-toast'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const serviceSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

export default function ServicesPage() {
  const [services, setServices] = useState<IService[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<IService | null>(null)

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      _id: "",
      name: "",
      description: "",
    },
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const data = await getServices()
    console.log(data);
    
    setServices(data)
  }

  const onSubmit = async (values: z.infer<typeof serviceSchema>) => {
    try {
      if (editingService) {
        await updateService(editingService._id, values)
        toast({ title: "Service updated successfully" })
      } else {
        await createService(values)
        toast({ title: "Service created successfully" })
      }
      setIsDialogOpen(false)
      setEditingService(null)
      form.reset()
      fetchServices()
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "An error occurred while processing your request", 
        variant: "destructive" 
      })
    }
  }

  const handleEditService = (service: IService) => {
    setEditingService(service)
    form.reset(service)
    setIsDialogOpen(true)
  }

  const handleDeleteService = async (_id: string) => {
    try {
      await deleteService(_id)
      toast({ title: "Service deleted successfully" })
      fetchServices()
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "An error occurred while deleting the service", 
        variant: "destructive" 
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Services</h1>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) {
          setEditingService(null)
          form.reset()
        }
      }}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Service</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Id</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /><FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Service List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2" onClick={() => handleEditService(service)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteService(service._id)}>
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
