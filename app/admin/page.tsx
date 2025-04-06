'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getDashboardOverview,
  getTopServices,
  getRecentDemoRequests,
  getUnreadGrievances,
  getSubscriptionTrends
} from '@/app/libs/dashboardApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend,
  LineChart, Line
} from 'recharts';
import { Users, DollarSign, Server, AlertCircle, TrendingUp } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const [overview, setOverview] = useState<any>({});
  const [topServices, setTopServices] = useState<any[]>([]);
  const [demos, setDemos] = useState<any[]>([]);
  const [grievances, setGrievances] = useState<any[]>([]);
  const [trends, setTrends] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      getDashboardOverview().then(setOverview),
      getTopServices().then(setTopServices),
      getRecentDemoRequests().then(setDemos),
      getUnreadGrievances().then(setGrievances),
      getSubscriptionTrends().then(setTrends)
    ]).catch(error => console.error('Failed to load dashboard data:', error));
  }, []);

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  const demoStatusData = demos.reduce((acc, demo) => {
    acc[demo.status] = (acc[demo.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(demoStatusData).map(([name, value]) => ({ name, value }));

  const stats = [
    { title: 'Users', value: overview.users, icon: Users, path: '/admin/users', color: 'text-blue-500' },
    { title: 'Active Subscriptions', value: overview.activeSubscriptions, icon: DollarSign, path: '/admin/subscriptions', color: 'text-green-500' },
    { title: 'Total Revenue', value: `$${overview.totalRevenue?.toLocaleString() || 0}`, icon: DollarSign, path: '/admin/finance', color: 'text-emerald-500' },
    { title: 'Services', value: overview.services, icon: Server, path: '/admin/services', color: 'text-purple-500' },
    { title: 'Pending Demos', value: overview.pendingDemoRequests, icon: AlertCircle, path: '/admin/demos', color: 'text-yellow-500' },
    { title: 'Unread Grievances', value: overview.unreadGrievances, icon: AlertCircle, path: '/admin/grievances', color: 'text-red-500' },
  ];

  return (
    <div className="  min-h-screen overflow-y-auto  bg-gradient-to-br  from-gray-50 to-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        {stats.map((item) => (
          <Card 
            key={item.title}
            className="hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-200"
            onClick={() => handleCardClick(item.path)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{item.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{item.value || 0}</p>
                </div>
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Services Bar Chart */}
        <Card className="bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Subscribed Services</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topServices}>
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                />
                <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Subscriptions" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="totalRevenue" fill="#10b981" name="Revenue ($)" radius={[4, 4, 0, 0]} />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Demo Status Pie Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Demo Request Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Trends */}
        <Card className="bg-white lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
              Subscription Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trends}>
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="subscriptions" stroke="#3b82f6" name="Subscriptions" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue ($)" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Demo Requests */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recent Demo Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {demos.slice(0, 5).map(d => (
                <li 
                  key={d._id}
                  className="p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors border-b last:border-b-0"
                  onClick={() => handleCardClick(`/demos/${d._id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800">{d.name}</span>
                      <p className="text-sm text-gray-600">
                        {d.institute?.name} • {new Date(d.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      d.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      d.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {d.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Unread Grievances */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Unread Grievances</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {grievances.slice(0, 5).map(g => (
                <li 
                  key={g._id}
                  className="p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors border-b last:border-b-0"
                  onClick={() => handleCardClick(`/grievances/${g._id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800">{g.name}</span>
                      <p className="text-sm text-gray-600">
                        {g.submittedBy?.name} • {g.issue.slice(0, 40)}...
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      g.priority === 'high' ? 'bg-red-100 text-red-800' :
                      g.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {g.priority}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Footer with Last Updated */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Last Updated: {overview.lastUpdated ? new Date(overview.lastUpdated).toLocaleString() : 'Loading...'}
      </div>
    </div>
  );
}