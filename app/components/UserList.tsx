import { IUser } from '@/app/types/type';
import Link from 'next/link';

interface UserListProps {
  users: IUser[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="bg-white p-6 text-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <ul>
        {users.map((user) => {
          // Ensure that _id is used as the primary key identifier
          const userId = user._id;

          // Check if userId is available
          if (!userId) {
            console.error('User ID is missing for:', user);
            return null; // Skip rendering this item if _id is missing
          }

          return (
            <li key={userId} className="mb-2 p-2 border-b">
              <Link
                href={`/admin/users/${userId}`}
                className="text-blue-500 hover:underline"
              >
                {user.name} - {user.email}
              </Link> 
            </li>
          );
        })}
      </ul>
    </div>
  );
}
