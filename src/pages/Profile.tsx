import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EnrollButton from '@/components/EnrollButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  CreditCard, 
  BookOpen, 
  Settings, 
  LogOut,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('details');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to view your profile</h1>
          <Button onClick={() => window.location.href = '/'}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="page-shell">
      <Navbar />
      
      <div className="pt-24 md:pt-28 pb-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 break-words px-2">
              Welcome, {user.firstName}!
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2">
              Manage your account, view your courses, and track your progress
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 h-auto gap-1 p-1">
                <TabsTrigger value="details" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-1 sm:px-3 text-xs sm:text-sm">
                  <User className="w-4 h-4 shrink-0" />
                  <span className="text-center leading-tight">Details</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-1 sm:px-3 text-xs sm:text-sm">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span className="text-center leading-tight">Services</span>
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-1 sm:px-3 text-xs sm:text-sm">
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span className="text-center leading-tight">Payments</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">First Name</label>
                        <div className="p-3 bg-muted rounded-lg font-medium">{user.firstName}</div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                        <div className="p-3 bg-muted rounded-lg font-medium">{user.lastName}</div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <div className="p-3 bg-muted rounded-lg font-medium flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                        <div className="p-3 bg-muted rounded-lg font-medium flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Area of Interest</label>
                        <div className="p-3 bg-muted rounded-lg">
                          <Badge variant="secondary" className="text-sm">
                            {user.interestedSubject?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Not specified'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <Button className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>My Services & Courses</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Services Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't enrolled in any courses yet. Start your learning journey today!
                      </p>
                      <Button asChild>
                        <a href="/courses">Browse Courses</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended for You</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { title: 'Agentic AI Certification Training (AAC)', route: '/courses/aac', desc: 'Build intelligent agents and LLM-powered workflows.' },
                        { title: 'AWS Solutions Architect Program (AWS)', route: '/courses/aws', desc: 'Design scalable cloud architectures on AWS.' },
                      ].map((program) => (
                        <div key={program.route} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <h4 className="font-semibold mb-2">{program.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{program.desc}</p>
                          <Button size="sm" asChild className="w-full mt-2">
                            <Link to={program.route}>View Program</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Payment History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Payments Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Your payment history will appear here once you enroll in a course.
                      </p>
                      <EnrollButton>Start Enrollment</EnrollButton>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No payment methods saved</p>
                      <Button variant="outline">Add Payment Method</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center space-x-2 mx-auto"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
