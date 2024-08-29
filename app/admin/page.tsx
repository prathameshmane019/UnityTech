import DashboardCard from "../components/DashBoardCard"

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard title="Total Services" value="15" />
      <DashboardCard title="Active Users" value="250" />
      <DashboardCard title="Access Requests" value="10" />
    </div>
  )
}