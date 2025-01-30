// "use client"

// import { useState, useEffect } from "react"
// import {   getUsers, updateUser, deleteUser, createUser } from "@/app/libs/api"
// import type { IInstitute } from "@/app/types/type"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { toast } from "@/hooks/use-toast"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// const instituteSchema = z.object({
//   _id: z.string().optional(),
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   instituteCode: z.string().min(2, "Institute code must be at least 2 characters"),
//   address: z.string().min(5, "Address must be at least 5 characters"),
//   university: z.string().optional(),
//   contact: z.string().min(5, "Contact must be at least 5 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// })

// type InstituteFormData = z.infer<typeof instituteSchema>

// export default function InstitutesPage() {
//   const [institutes, setInstitutes] = useState<IInstitute[]>([])
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [editingInstitute, setEditingInstitute] = useState<IInstitute | null>(null)

//   const form = useForm<InstituteFormData>({
//     resolver: zodResolver(instituteSchema),
//     defaultValues: {
//       name: "",
//       instituteCode: "",
//       address: "",
//       university: "",
//       contact: "",
//       email: "",
//       password: "",
//     },
//   })

//   useEffect(() => {
//     fetchInstitutes()
//   }, [])

//   const fetchInstitutes = async () => {
//     const data = await getUsers()
//     setInstitutes(data)
//   }

//   const onSubmit = async (values: InstituteFormData) => {
//     try {
//       if (editingInstitute) {
//         await updateUser(editingInstitute._id, values)
//         toast({ title: "Institute updated successfully" })
//       } else {
//         await createUser(values)
//         toast({ title: "Institute created successfully" })
//       }
//       setIsDialogOpen(false)
//       setEditingInstitute(null)
//       form.reset()
//       fetchInstitutes()
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while processing your request",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleEditInstitute = (institute: IInstitute) => {
//     setEditingInstitute(institute)
//     form.reset(institute as InstituteFormData)
//     setIsDialogOpen(true)
//   }

//   const handleDeleteInstitute = async (id: string) => {
//     try {
//       console.log(id);
      
//       await deleteUser(id)
//       toast({ title: "Institute deleted successfully" })
//       fetchInstitutes()
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while deleting the institute",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-3xl font-bold mb-6">Institutes</h1>

//       <Dialog
//         open={isDialogOpen}
//         onOpenChange={(open) => {
//           setIsDialogOpen(open)
//           if (!open) {
//             setEditingInstitute(null)
//             form.reset()
//           }
//         }}
//       >
//         <DialogTrigger asChild>
//           <Button className="mb-4">Add New Institute</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>{editingInstitute ? "Edit Institute" : "Add New Institute"}</DialogTitle>
//           </DialogHeader>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="instituteCode"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Institute Code</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="address"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Address</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="university"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>University</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="contact"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Contact</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input type="password" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit">{editingInstitute ? "Update Institute" : "Add Institute"}</Button>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>

//       <Card>
//         <CardHeader>
//           <CardTitle>Institute List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Institute Code</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {institutes.map((institute) => (
//                 <TableRow key={institute._id}>
//                   <TableCell>{institute.name}</TableCell>
//                   <TableCell>{institute.instituteCode}</TableCell>
//                   <TableCell>{institute.email}</TableCell>
//                   <TableCell>
//                     <Button variant="outline" className="mr-2" onClick={() => handleEditInstitute(institute)}>
//                       Edit
//                     </Button>
//                     <Button variant="destructive" onClick={() => handleDeleteInstitute(institute.id)}>
//                       Delete
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

import { useState, useEffect } from "react"
import { getUsers, createUser, updateUser, deleteUser } from "@/app/libs/api"
import type { IUser } from "@/app/types/type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const userSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  type: z.enum(["individual", "organization", "institute"]),
  organizationName: z.string().optional(),
  instituteCode: z.string().optional(),
  address: z.string().optional(),
  university: z.string().optional(),
  contact: z.string().optional(),
})

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<IUser | null>(null)

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      type: "individual",
    },
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      if (editingUser) {
        await updateUser(editingUser._id, values)
        toast({ title: "User updated successfully" })
      } else {
        await createUser(values)
        toast({ title: "User created successfully" })
      }
      setIsDialogOpen(false)
      setEditingUser(null)
      form.reset()
      fetchUsers()
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your request",
        variant: "destructive",
      })
    }
  }

  const handleEditUser = (user: IUser) => {
    setEditingUser(user)
    form.reset(user)
    setIsDialogOpen(true)
  }

  const handleDeleteUser = async (_id: string) => {
    try {
      await deleteUser(_id)
      toast({ title: "User deleted successfully" })
      fetchUsers()
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the user",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) {
            setEditingUser(null)
            form.reset()
          }
        }}
      >
        <DialogTrigger asChild>
          <Button className="mb-4">Add New User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="organization">Organization</SelectItem>
                        <SelectItem value="institute">Institute</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("type") === "organization" && (
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {form.watch("type") === "institute" && (
                <>
                  <FormField
                    control={form.control}
                    name="instituteCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <Button type="submit">{editingUser ? "Update User" : "Add User"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2" onClick={() => handleEditUser(user)}>
                      Edit
                    </Button>
                    <Button variant="destructive" className="mr-2" onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </Button>
                    <Button variant="default" asChild>
                      <Link href={`/admin/users/${user._id}`}>Manage Subscriptions</Link>
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

