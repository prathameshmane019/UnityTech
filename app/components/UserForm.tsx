// import { useState } from 'react'
// import { IUser } from '@/app/types/type'

// interface UserFormProps {
//   onSubmit: (userData: Omit<IUser, 'id'>) => void
// }

// export default function UserForm({ onSubmit }: UserFormProps) {
//   const [userData, setUserData] = useState<IUser>({
//     _id:'',
//     name: '',
//     email: '',
//     password: '',
//     type: 'individual',
//     organizationName: '',
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onSubmit(userData)
//     setUserData({ _id:'',name: '', email: '', password: '', type: 'individual', organizationName: '' })
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mb-6 text-gray-900 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Add New User</h2>
//       <div className="mb-4">
//         <label className="block mb-2">User ID:</label>
//         <input
//           type="text"
//           value={userData._id}
//           onChange={(e) => setUserData({ ...userData, _id: e.target.value })}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Name:</label>
//         <input
//           type="text"
//           value={userData.name}
//           onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Email:</label>
//         <input
//           type="email"
//           value={userData.email}
//           onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Password:</label>
//         <input
//           type="password"
//           value={userData.password}
//           onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Type:</label>
//         <select
//           value={userData.type}
//           onChange={(e) => setUserData({ ...userData, type: e.target.value as 'individual' | 'organization' })}
//           className="w-full p-2 border rounded"
//         >
//           <option value="individual">Individual</option>
//           <option value="organization">Organization</option>
//         </select>
//       </div>
//       {userData.type === 'organization' && (
//         <div className="mb-4">
//           <label className="block mb-2">Organization Name:</label>
//           <input
//             type="text"
//             value={userData.organizationName}
//             onChange={(e) => setUserData({ ...userData, organizationName: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       )}
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//         Add User
//       </button>
//     </form>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { IUser } from "../types/type"
// Extend IUser to include Institute fields


const formSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  type: z.enum(["individual", "organization", "institute"]),
  organizationName: z.string().optional(),
  instituteCode: z.string().optional(),
  address: z.string().optional(),
  university: z.string().optional(),
  contact: z.string().optional(),
  isEditing: z.boolean().default(false),
})

interface UserFormProps {
  onSubmit: (userData: Omit<IUser, "id">) => void
  initialData?: IUser
}

export default function UserForm({ onSubmit, initialData }: UserFormProps) {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      password: "",
      type: "individual",
    },
  })

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        form.setValue(key as keyof IUser, initialData[key as keyof IUser])
      })
      setIsEditing(true)
    }
  }, [initialData, form])

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values)
    toast({
      title: isEditing ? "User Updated" : "User Created",
      description: `Successfully ${isEditing ? "updated" : "created"} user: ${values.name}`,
    })
    if (!isEditing) {
      form.reset()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit User" : "Add New User"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input type="email" placeholder="john@example.com" {...field} />
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
                    <Input type="password" placeholder="********" {...field} />
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
                  <FormLabel>User Type</FormLabel>
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
                      <Input placeholder="Acme Inc." {...field} />
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
                        <Input placeholder="INS001" {...field} />
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
                        <Input placeholder="123 Education St, City, Country" {...field} />
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
                        <Input placeholder="State University" {...field} />
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
                        <Input placeholder="+1 234 567 8900" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit">{isEditing ? "Update User" : "Add User"}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

