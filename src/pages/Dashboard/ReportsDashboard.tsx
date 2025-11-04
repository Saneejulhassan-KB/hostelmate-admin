import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { toast } from 'sonner';

const monthlyRevenue = [
  { month: 'Jul', revenue: 45000, bookings: 65 },
  { month: 'Aug', revenue: 52000, bookings: 78 },
  { month: 'Sep', revenue: 61000, bookings: 90 },
  { month: 'Oct', revenue: 58000, bookings: 81 },
  { month: 'Nov', revenue: 68000, bookings: 95 },
  { month: 'Dec', revenue: 75000, bookings: 110 },
];

const occupancyData = [
  { month: 'Jul', hostel: 72, mess: 68 },
  { month: 'Aug', hostel: 75, mess: 71 },
  { month: 'Sep', hostel: 78, mess: 74 },
  { month: 'Oct', hostel: 76, mess: 72 },
  { month: 'Nov', hostel: 82, mess: 78 },
  { month: 'Dec', hostel: 85, mess: 81 },
];

export default function ReportsDashboard() {
  const handleExport = (format: string) => {
    toast.success(`Exporting reports as ${format.toUpperCase()}...`);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Detailed insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-2">₹3.59L</h3>
                <div className="flex items-center gap-1 mt-2 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span>+23.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Avg Occupancy</p>
              <h3 className="text-2xl font-bold mt-2">78%</h3>
              <div className="flex items-center gap-1 mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4" />
                <span>+5.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <h3 className="text-2xl font-bold mt-2">519</h3>
              <div className="flex items-center gap-1 mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4" />
                <span>+18.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Cancellation Rate</p>
              <h3 className="text-2xl font-bold mt-2">4.2%</h3>
              <div className="flex items-center gap-1 mt-2 text-sm text-destructive">
                <TrendingDown className="h-4 w-4" />
                <span>-2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(217, 91%, 60%)" 
                  strokeWidth={3}
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bookings Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="bookings" fill="hsl(160, 84%, 39%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Occupancy Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Occupancy Rate Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="hostel" 
                stroke="hsl(217, 91%, 60%)" 
                strokeWidth={3}
                name="Hostel"
                dot={{ fill: 'hsl(217, 91%, 60%)', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="mess" 
                stroke="hsl(160, 84%, 39%)" 
                strokeWidth={3}
                name="Mess"
                dot={{ fill: 'hsl(160, 84%, 39%)', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
