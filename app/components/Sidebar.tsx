import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link href="/admin/services" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Services
        </Link>
        <Link href="/admin/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Users
        </Link>
        <Link href="/admin/subscriptions" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Subscriptions
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar