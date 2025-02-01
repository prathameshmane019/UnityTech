"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Settings, Users, CreditCard, ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { useAuth } from "@/app/providers/AuthProvider"
import { FcFeedback } from "react-icons/fc"
import { FaDemocrat } from "react-icons/fa"
import { FaRegSquarePlus } from "react-icons/fa6"
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Services",
    icon: Settings,
    href: "/admin/services",
    color: "text-violet-500",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
    color: "text-pink-700",
  },
  {
    label: "Subscriptions",
    icon: CreditCard,
    href: "/admin/subscriptions",
    color: "text-orange-700",
  }, {
    label: "Grievance",
    icon: FcFeedback,
    href: "/admin/grievance",
    color: "text-blue-700",
  }, {
    label: "Demo Requests",
    icon: FaRegSquarePlus,
    href: "/admin/demo-requests",
    color: "text-violet-700",
  },
]

const Sidebar = () => {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/signin")
  }

  return (
    <div
      className={cn(
        "relative h-screen bg-secondary text-secondary-foreground transition-all duration-300 ease-in-out flex flex-col",
        isCollapsed ? "w-[70px]" : "w-60",
      )}
    >
      <div className="flex-1">
        <div className="p-4 flex justify-between items-center">
          {!isCollapsed && <h2 className="text-lg font-semibold">Admin Panel</h2>}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                asChild
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === route.href && "bg-secondary-foreground/10",
                  isCollapsed ? "px-2" : "px-4",
                )}
              >
                <Link href={route.href} className="flex items-center">
                  <route.icon className={cn("h-5 w-5", route.color, isCollapsed ? "mr-0" : "mr-2")} />
                  {!isCollapsed && <span>{route.label}</span>}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn("w-full justify-start", isCollapsed ? "px-2" : "px-4")}
        >
          <LogOut className={cn("h-5 w-5 text-red-500", isCollapsed ? "mr-0" : "mr-2")} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}

export default Sidebar

