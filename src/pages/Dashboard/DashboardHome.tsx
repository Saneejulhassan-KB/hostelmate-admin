"use client";
import { StatsCard } from "@/components/Cards/StatsCard";
import {
  Building2,
  Bed,
  PhoneCall,
  TrendingUp,
  Eye,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardHome() {
  // ===== Dummy Data =====
  const callTrendData = [
    { name: "Jan", calls: 15 },
    { name: "Feb", calls: 22 },
    { name: "Mar", calls: 18 },
    { name: "Apr", calls: 25 },
    { name: "May", calls: 30 },
    { name: "Jun", calls: 27 },
  ];

  const distributionData = [
    { name: "Hostels", value: 3 },
    { name: "Mess", value: 1 },
  ];

  const propertyCallsData = [
    { name: "Green Valley Hostel", calls: 22 },
    { name: "City View PG", calls: 15 },
    { name: "Metro Hostel", calls: 10 },
    { name: "Royal Mess", calls: 5 },
  ];

  const COLORS = ["hsl(217, 91%, 60%)", "hsl(160, 84%, 39%)"];

  const activities = [
    {
      message: "User called owner for Green Valley Hostel",
      time: "2 hours ago",
      type: "success",
    },
    {
      message: "You added a new property: City View PG",
      time: "1 day ago",
      type: "info",
    },
    {
      message: "Admin approved your new hostel listing",
      time: "2 days ago",
      type: "success",
    },
    {
      message: "User called owner for Metro Hostel",
      time: "3 days ago",
      type: "success",
    },
  ];

  const totalViews = 530;
  const totalCalls = 62;
  const conversionRate = ((totalCalls / totalViews) * 100).toFixed(1);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col w-full">
        <main className="flex-1 p-6 space-y-6 animate-fade-in">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Rahul!</h1>
            <p className="text-muted-foreground">
              Here’s an overview of your hostels and mess performance this
              month.
            </p>
          </div>

          {/* Subscription Details */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <h3 className="text-lg font-semibold">Pro Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Valid till <span className="font-medium">20 Dec 2025</span>
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                  Upgrade Plan
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            <StatsCard
              title="My Properties"
              value="4"
              icon={Building2}
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard
              title="Total Rooms"
              value="120"
              icon={Bed}
              trend={{ value: 2, isPositive: true }}
            />
            <StatsCard
              title="Calls Received"
              value={totalCalls}
              icon={PhoneCall}
              trend={{ value: 15, isPositive: true }}
            />
            <StatsCard
              title="Avg Calls / Day"
              value="8"
              icon={TrendingUp}
              trend={{ value: 10, isPositive: true }}
            />
            <StatsCard
              title="Total Views"
              value={totalViews}
              icon={Eye}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Conversion Rate"
              value={`${conversionRate}%`}
              icon={Percent}
              trend={{ value: 3, isPositive: false }}
            />
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Call Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={callTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="calls"
                      stroke="hsl(217, 91%, 60%)"
                      strokeWidth={3}
                      dot={{ fill: "hsl(217, 91%, 60%)", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Hostel vs Mess Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Calls per Property & Recent Activities */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Calls per Property</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={propertyCallsData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="calls"
                      fill="hsl(217, 91%, 60%)"
                      radius={[8, 8, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          activity.type === "success"
                            ? "bg-success"
                            : activity.type === "warning"
                            ? "bg-warning"
                            : "bg-primary"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
