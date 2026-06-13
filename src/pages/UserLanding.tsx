import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/integrations/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EnrollButton from '@/components/EnrollButton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  PlayCircle,
  Award,
  Calendar,
  TrendingUp,
  Star,
  ArrowRight,
  Download,
  User,
  MessageCircle,
  Gift
} from 'lucide-react';

interface UserCourse {
  id: string;
  course_name: string;
  course_id: string;
  enrollment_date: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  next_lesson: string;
  total_lessons: number;
  completed_lessons: number;
  instructor: string;
  duration: string;
  price: number;
}

interface UserProgress {
  total_courses: number;
  completed_courses: number;
  total_lessons: number;
  completed_lessons: number;
  total_hours: number;
  completed_hours: number;
  achievements: string[];
}

const UserLanding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const courses = await apiClient.getUserCourses(user.id);
      if (courses) {
        setUserCourses(courses);

        // Calculate progress based on real data
        const totalCourses = courses.length;
        const completedCourses = courses.filter((course: UserCourse) => course.status === 'completed').length;
        const totalLessons = courses.reduce((sum: number, course: UserCourse) => sum + course.total_lessons, 0);
        const completedLessons = courses.reduce((sum: number, course: UserCourse) => sum + course.completed_lessons, 0);
        const totalHours = courses.reduce((sum: number, course: UserCourse) => sum + parseInt(course.duration), 0);
        const completedHours = Math.floor((completedLessons / totalLessons) * totalHours) || 0;

        // Generate achievements based on progress
        const achievements = [];
        if (totalCourses > 0) achievements.push('First Course Started');
        if (completedLessons >= 10) achievements.push('10 Lessons Completed');
        if (completedLessons >= 25) achievements.push('Consistent Learner');
        if (completedCourses > 0) achievements.push('Course Completed');
        if (completedLessons >= 50) achievements.push('Dedicated Student');

        const progress: UserProgress = {
          total_courses: totalCourses,
          completed_courses: completedCourses,
          total_lessons: totalLessons,
          completed_lessons: completedLessons,
          total_hours: totalHours,
          completed_hours: completedHours,
          achievements
        };

        setUserProgress(progress);
      } else {
        // No courses found or error
        setUserCourses([]);
        setUserProgress({
          total_courses: 0,
          completed_courses: 0,
          total_lessons: 0,
          completed_lessons: 0,
          total_hours: 0,
          completed_hours: 0,
          achievements: []
        });
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      // Set empty data on error
      setUserCourses([]);
      setUserProgress({
        total_courses: 0,
        completed_courses: 0,
        total_lessons: 0,
        completed_lessons: 0,
        total_hours: 0,
        completed_hours: 0,
        achievements: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to view your dashboard</h1>
          <Button onClick={() => window.location.href = '/'}>Go Home</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const getSimulatorPath = (course: UserCourse) => {
    const slug = course.course_name.toLowerCase();
    if (slug.includes('devops') || slug.includes('dop')) return '/learn/dop';
    if (slug.includes('agentic') || slug.includes('aac')) return '/learn/aac';
    if (slug.includes('aws') || slug.includes('cloud')) return '/learn/aws';
    if (slug.includes('data science') || slug.includes('machine learning')) return '/learn/data-science';
    return '/learn/aac';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <div className="page-shell">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 break-words">
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90">
              Continue your learning journey and achieve your goals
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        {userProgress && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Courses Enrolled</p>
                    <p className="text-2xl font-bold text-foreground">{userProgress.total_courses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Lessons Completed</p>
                    <p className="text-2xl font-bold text-foreground">
                      {userProgress.total_lessons > 0 ? `${userProgress.completed_lessons}/${userProgress.total_lessons}` : '0/0'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Hours Completed</p>
                    <p className="text-2xl font-bold text-foreground">
                      {userProgress.total_hours > 0 ? `${userProgress.completed_hours}/${userProgress.total_hours}` : '0/0'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                    <p className="text-2xl font-bold text-foreground">{userProgress.achievements.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Courses */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-foreground">My Courses</h2>
            <Button asChild>
              <Link to="/courses">
                Browse More Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{course.course_name}</CardTitle>
                      <p className="text-muted-foreground mt-1">by {course.instructor}</p>
                    </div>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Progress</span>
                        <span className="text-sm text-muted-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span>{course.completed_lessons}/{course.total_lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Next Lesson */}
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Next Lesson:</p>
                      <p className="text-sm text-muted-foreground">{course.next_lesson}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button className="flex-1" onClick={() => navigate(getSimulatorPath(course))}>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Open Simulator
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {userCourses.length === 0 && (
            <Card>
              <CardContent className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">No Data Found</h3>
                <p className="text-muted-foreground mb-2 max-w-md mx-auto">
                  You haven't enrolled in any paid courses yet. Start your learning journey by enrolling in one of our comprehensive programs.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  Once you enroll in a course, your progress and learning materials will appear here.
                </p>
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/courses">Browse Available Courses</Link>
                  </Button>
                  <div className="text-center">
                    <EnrollButton variant="outline" size="lg">
                      Start Learning
                    </EnrollButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Achievements */}
        {userProgress && userProgress.achievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {userProgress.achievements.map((achievement, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">{achievement}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col">
                <a href="/profile">
                  <User className="w-6 h-6 mb-2" />
                  View Profile
                </a>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <a href="/contact">
                  <MessageCircle className="w-6 h-6 mb-2" />
                  Get Support
                </a>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <a href="/bonus">
                  <Gift className="w-6 h-6 mb-2" />
                  Free Bonuses
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default UserLanding;
