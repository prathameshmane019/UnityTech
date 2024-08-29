import { useState } from 'react'
import { IUser } from '@/app/types/type'

interface UserFormProps {
  onSubmit: (userData: Omit<IUser, 'id'>) => void
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [userData, setUserData] = useState<IUser>({
    _id:'',
    name: '',
    email: '',
    password: '',
    type: 'individual',
    organizationName: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(userData)
    setUserData({ _id:'',name: '', email: '', password: '', type: 'individual', organizationName: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 text-gray-900 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <div className="mb-4">
        <label className="block mb-2">User ID:</label>
        <input
          type="text"
          value={userData._id}
          onChange={(e) => setUserData({ ...userData, _id: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Type:</label>
        <select
          value={userData.type}
          onChange={(e) => setUserData({ ...userData, type: e.target.value as 'individual' | 'organization' })}
          className="w-full p-2 border rounded"
        >
          <option value="individual">Individual</option>
          <option value="organization">Organization</option>
        </select>
      </div>
      {userData.type === 'organization' && (
        <div className="mb-4">
          <label className="block mb-2">Organization Name:</label>
          <input
            type="text"
            value={userData.organizationName}
            onChange={(e) => setUserData({ ...userData, organizationName: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add User
      </button>
    </form>
  )
}