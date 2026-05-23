import React, { useState, useEffect } from 'react';
import { apiClient } from '@/integrations/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  interested_subject: string;
  created_at: string;
  last_login?: string;
}

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  course_name: string;
  payment_plan: string;
  amount: number;
  status: string;
  created_at: string;
  user_name: string;
  user_email: string;
}

interface Activity {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  timestamp: string;
  details: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
    activeUsers: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const usersData = await apiClient.getAdminUsers();
      setUsers(usersData);

      const enrollmentsData = await apiClient.getAdminEnrollments();
      setEnrollments(enrollmentsData);

      // Fetch activities (mock data for now)
      const mockActivities: Activity[] = [
        {
          id: '1',
          user_id: '1',
          user_name: 'John Doe',
          action: 'Login',
          timestamp: new Date().toISOString(),
          details: 'User logged in successfully'
        },
        {
          id: '2',
          user_id: '2',
          user_name: 'Jane Smith',
          action: 'Enrollment',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          details: 'Enrolled in Full Stack Web Development'
        },
        {
          id: '3',
          user_id: '3',
          user_name: 'Mike Johnson',
          action: 'Profile Update',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          details: 'Updated phone number'
        }
      ];
      setActivities(mockActivities);

      // Calculate stats
      const totalUsers = usersData.length;
      const totalEnrollments = enrollmentsData.length;
      const totalRevenue = enrollmentsData.reduce((sum: number, enrollment: Enrollment) => sum + enrollment.amount, 0);
      const activeUsers = usersData.filter((user: User) => user.last_login).length;

      setStats({
        totalUsers,
        totalEnrollments,
        totalRevenue,
        activeUsers
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = (type: string) => {
    let data: any[] = [];
    let filename = '';
    
    switch (type) {
      case 'users':
        data = users;
        filename = 'users.csv';
        break;
      case 'enrollments':
        data = enrollments;
        filename = 'enrollments.csv';
        break;
      case 'activities':
        data = activities;
        filename = 'activities.csv';
        break;
    }

    const csv = convertToCSV(data);
    downloadCSV(csv, filename);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value}"` : value;
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-6">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Monitor user activity and platform performance</p>
            </div>
            <Button onClick={fetchDashboardData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalEnrollments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${stats.totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Registered Users</CardTitle>
                  <Button onClick={() => exportData('users')} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Phone</th>
                        <th className="text-left py-3 px-4">Interest</th>
                        <th className="text-left py-3 px-4">Joined</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted">
                          <td className="py-3 px-4 font-medium">{user.first_name} {user.last_name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.phone}</td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">
                              {user.interested_subject?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Not specified'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={user.last_login ? "default" : "secondary"}>
                              {user.last_login ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enrollments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Course Enrollments</CardTitle>
                  <Button onClick={() => exportData('enrollments')} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Student</th>
                        <th className="text-left py-3 px-4">Course</th>
                        <th className="text-left py-3 px-4">Payment Plan</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.map((enrollment) => (
                        <tr key={enrollment.id} className="border-b hover:bg-muted">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{enrollment.user_name}</div>
                              <div className="text-sm text-muted-foreground">{enrollment.user_email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{enrollment.course_name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{enrollment.payment_plan}</Badge>
                          </td>
                          <td className="py-3 px-4 font-medium">${enrollment.amount}</td>
                          <td className="py-3 px-4">
                            <Badge variant={enrollment.status === 'completed' ? 'default' : 'secondary'}>
                              {enrollment.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(enrollment.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Activities</CardTitle>
                  <Button onClick={() => exportData('activities')} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{activity.user_name}</span>
                          <Badge variant="outline">{activity.action}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
