
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Code, Shield, Cloud, Wrench } from 'lucide-react';

const courses = [
  {
    id: 'ai-ml',
    title: 'Professional AI/ML & Generative AI Career Accelerator',
    description: 'Transform your career with our intensive AI/ML program. From Python foundations to advanced GenAI systems in 8 weeks.',
    duration: '8 Weeks',
    projects: '15+',
    icon: Brain,
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    price: '$300',
    route: '/courses/ai-ml'
  },
  {
    id: 'web-dev',
    title: 'Full Stack Web Development',
    description: 'Master modern web development from frontend to backend with React, Node.js, and cloud deployment.',
    duration: '10 Weeks',
    projects: '12+',
    icon: Code,
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    price: '$300',
    route: '/courses/web-development'
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Learn CI/CD, containerization, cloud infrastructure, and automation tools for modern software delivery.',
    duration: '8 Weeks',
    projects: '10+',
    icon: Wrench,
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    price: '$350',
    route: '/courses/devops'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Comprehensive cybersecurity training covering ethical hacking, penetration testing, and security protocols.',
    duration: '12 Weeks',
    projects: '8+',
    icon: Shield,
    color: 'bg-gradient-to-br from-red-500 to-orange-500',
    price: '$300',
    route: '/courses/cybersecurity'
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    description: 'Master AWS, Azure, and GCP with hands-on experience in cloud architecture and serverless computing.',
    duration: '10 Weeks',
    projects: '10+',
    icon: Cloud,
    color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    price: '$350',
    route: '/courses/cloud-computing'
  }
];

const Courses = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 md:pt-28 pb-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 text-sm font-bold text-primary border border-primary/20 shadow-lg mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              🚀 Comprehensive Tech Education
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Zyvotrix
              </span><br />
              <span className="text-gray-900">Tech Programs</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Choose from our comprehensive selection of tech programs designed to accelerate your career in technology.
              Each program includes hands-on projects, one-on-one mentoring, and industry-oriented learning across all major tech domains.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-20 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Choose Your Tech Path</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Select from our comprehensive range of tech programs designed to launch your career
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2000+</div>
                <div className="text-gray-600 font-medium">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">5+</div>
                <div className="text-gray-600 font-medium">Tech Domains</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600 font-medium">Hands-on Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">1:1</div>
                <div className="text-gray-600 font-medium">Mentoring</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {courses.map((course) => (
              <Card key={course.id} className="group border-2 border-gray-200 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white">
                <CardHeader className="p-8 space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className={`w-12 h-12 rounded-2xl ${course.color} shadow-lg flex items-center justify-center`}>
                      <course.icon className="w-6 h-6 text-white" />
                    </span>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {course.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-8">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                      <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Duration</p>
                      <p className="font-bold text-xl text-gray-900 mt-1">{course.duration}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
                      <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Projects</p>
                      <p className="font-bold text-xl text-primary mt-1">{course.projects}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl">
                      <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Price</p>
                      <p className="font-bold text-xl text-secondary mt-1">{course.price}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button asChild size="lg" className="w-full font-bold text-base py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <Link to={course.route} className="flex items-center justify-center">
                        Learn More <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20"></div>
        <div className="container px-4 md:px-6 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-6 py-3 text-sm font-bold text-white border border-primary/30 shadow-lg mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              🚀 Limited Time Offer - Enroll Now!
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
                Ready to Start Your
              </span><br />
              <span className="text-white">Tech Journey?</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300">
              Choose your specialization and transform your career with Zyvotrix's intensive, 
              industry-oriented programs. Limited spots available - secure your place today.
            </p>
            
            <div className="flex justify-center mb-12">
              <Button asChild size="lg" variant="outline" className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-12 py-5 text-xl font-bold transition-all duration-300 transform hover:scale-105">
                <Link to="/contact">Connect on Call</Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-xl font-semibold text-gray-300">
              <span className="text-yellow-400">🚀</span>
              <span>Limited spots available across all programs</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Courses;
