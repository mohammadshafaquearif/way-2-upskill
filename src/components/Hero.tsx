
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container px-4 md:px-6 mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center space-y-10 lg:space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 text-sm font-bold text-primary border border-primary/20 shadow-lg">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              🚀 Limited Places Available - Enroll Now!
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Zero to Expert
              </span><br />
              <span className="text-gray-900">Tech Journey</span><br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-medium">
                with One-to-One Mentoring
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-[700px] leading-relaxed">
              Transform your career with Zyvotrix's comprehensive edtech programs. Master 
              <span className="font-semibold text-primary">Full Stack Development</span>, 
              <span className="font-semibold text-secondary">AI/ML</span>, 
              <span className="font-semibold text-primary">DevOps</span>, 
              <span className="font-semibold text-secondary">Cloud Computing</span>, and 
              <span className="font-semibold text-primary">Cybersecurity</span> with industry-oriented, project-based learning.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <Button asChild size="lg" className="font-bold text-lg px-10 py-5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <Link to="/enroll" className="flex items-center">
                Enroll Now <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold text-lg px-10 py-5 border-2 border-primary bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
              <Link to="/courses">
                Explore Courses
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center space-x-6 text-base pt-6">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center border-4 border-white text-sm font-bold text-white shadow-lg">JS</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center border-4 border-white text-sm font-bold text-white shadow-lg">KL</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center border-4 border-white text-sm font-bold text-white shadow-lg">AP</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center border-4 border-white text-sm font-bold text-white shadow-lg">+5</div>
            </div>
            <p className="text-gray-600">Joined by <span className="text-gray-900 font-bold">2000+ students</span> this year</p>
          </div>
        </div>
        
        <div className="relative lg:block">
          <div className="relative p-8">
            <div className="bg-white/98 backdrop-blur-sm rounded-3xl shadow-2xl p-10 md:p-12 border border-gray-200/50 animate-float">
              <div className="flex flex-col space-y-8">
                <div className="flex justify-between items-center">
                  <span className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/20">
                    🎯 Multiple Programs
                  </span>
                  <span className="text-sm text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full">One-on-One</span>
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Tech Career Mastery
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Learning</p>
                    <p className="font-bold text-xl text-gray-900">One-to-One Mentoring</p>
                  </div>
                  <div className="space-y-2 p-4 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Duration</p>
                    <p className="font-bold text-xl text-gray-900">8-12 Weeks</p>
                  </div>
                  <div className="space-y-2 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Learning Mode</p>
                    <p className="font-bold text-xl text-gray-900">Industry Oriented</p>
                  </div>
                  <div className="space-y-2 p-4 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Domains</p>
                    <p className="font-bold text-xl text-gray-900">5+ Specializations</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Starting from</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        $300
                      </p>
                    </div>
                    <Button asChild size="sm" className="px-8 py-3 font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <Link to="/courses">Explore Programs</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 border-4 border-dashed border-primary/30 rounded-lg rotate-12"></div>
          <div className="absolute -bottom-10 -left-10 w-16 h-16 border-4 border-dashed border-secondary/30 rounded-full"></div>
          <div className="absolute top-1/2 -right-6 w-12 h-12 bg-accent rounded-md rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
