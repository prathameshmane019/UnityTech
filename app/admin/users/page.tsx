'use client'

import { useState, useEffect } from 'react'
import { getUsers, createUser } from '@/app/libs/api'
import { IUser } from '@/app/types/type'
import UserForm from '@/app/components/UserForm'
import UserList from '@/app/components/UserList'

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers()
    setUsers(fetchedUsers)
  }

  const handleAddUser = async (userData: Omit<IUser, 'id'>) => {
    await createUser(userData)
    fetchUsers()
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <UserForm onSubmit={handleAddUser} />
      <UserList users={users} />
    </div>
  )
}