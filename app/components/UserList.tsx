import { IUser } from '@/app/types/type'
import Link from 'next/link'

interface UserListProps {
  users: IUser[]
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="bg-white p-6 text-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2 p-2 border-b">
            <Link href={`/admin/users/${user.id}`} className="text-blue-500 hover:underline">
              {user.name} - {user.email}
            </Link>
            <span className="ml-2 text-sm text-gray-900">{user.type}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}