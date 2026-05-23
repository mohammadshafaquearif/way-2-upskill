
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, BookOpen, ChevronDown, Brain, Code, Shield, Cloud, Wrench } from 'lucide-react';
import LoginSignupModal from './LoginSignupModal';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Courses data for dropdown
  const courses = [
    {
      id: 'ai-ml',
      title: 'AI/ML & Generative AI',
      route: '/courses/ai-ml',
      icon: Brain
    },
    {
      id: 'web-dev',
      title: 'Full Stack Web Development',
      route: '/courses/web-development',
      icon: Code
    },
    {
      id: 'devops',
      title: 'DevOps Engineering',
      route: '/courses/devops',
      icon: Wrench
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      route: '/courses/cybersecurity',
      icon: Shield
    },
    {
      id: 'cloud',
      title: 'Cloud Computing',
      route: '/courses/cloud-computing',
      icon: Cloud
    }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full max-w-[100vw] z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md shadow-md py-2 sm:py-3' : 'bg-transparent py-3 sm:py-5'
    }`}>
      <div className="container flex max-w-full items-center justify-between gap-2 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 md:gap-3 shrink min-w-0 max-w-[calc(100%-3rem)]">
          <img
            src="/zyvotrix-logo.png"
            alt="Zyvotrix logo"
            className="h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain drop-shadow-sm shrink-0"
            width={56}
            height={56}
          />
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-brand-950 truncate">
            Zyvotrix
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Home</Link>
          
          {/* Courses Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center space-x-1 transition-colors ${location.pathname.startsWith('/courses') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>
                <span>Courses</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {courses.map((course) => {
                const IconComponent = course.icon;
                return (
                  <DropdownMenuItem key={course.id} asChild>
                    <Link to={course.route} className="flex items-center space-x-3 p-3">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{course.title}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuItem asChild>
                <Link to="/courses" className="flex items-center space-x-3 p-3 border-t border-border">
                  <span className="text-sm font-medium text-primary">View All Courses</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/resources" className={`transition-colors ${location.pathname === '/resources' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Resources</Link>
          <Link to="/#community" className="transition-colors text-foreground hover:text-primary">Community</Link>
          <Link to="/about" className={`transition-colors ${location.pathname === '/about' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>About</Link>
          <Link to="/contact" className={`transition-colors ${location.pathname === '/contact' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Contact</Link>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <User className="w-4 h-4 mr-2" />
                    {user?.firstName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <BookOpen className="w-4 h-4 mr-2" />
                      My Landing Page
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { logout(); window.location.href = '/'; }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsLoginModalOpen(true)}
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                Login/Signup
              </Button>
            )}
            <Button asChild size="sm" className="brand-gradient text-white border-0">
              <Link to="/courses">Explore Programs</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md absolute top-full left-0 right-0 w-full max-h-[min(85vh,calc(100dvh-4rem))] overflow-y-auto shadow-md py-4 slide-in overscroll-contain">
          <div className="container flex flex-col space-y-4 pb-6">
            <Link to="/" className={`transition-colors px-4 py-2 ${location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Home</Link>
            
            {/* Mobile Courses Section */}
            <div className="px-4">
              <div className="text-sm font-medium text-muted-foreground mb-2">Courses</div>
              <div className="ml-4 space-y-2">
                {courses.map((course) => {
                  const IconComponent = course.icon;
                  return (
                    <Link 
                      key={course.id} 
                      to={course.route} 
                      className={`flex items-center space-x-3 py-2 transition-colors ${location.pathname === course.route ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{course.title}</span>
                    </Link>
                  );
                })}
                <Link 
                  to="/courses" 
                  className={`flex items-center space-x-3 py-2 transition-colors border-t border-border mt-2 pt-3 ${location.pathname === '/courses' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-sm font-medium">View All Courses</span>
                </Link>
              </div>
            </div>
            
            <Link to="/resources" className={`transition-colors px-4 py-2 ${location.pathname === '/resources' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`} onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
            <Link to="/#community" className="transition-colors px-4 py-2 text-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Community</Link>
            <Link to="/about" className={`transition-colors px-4 py-2 ${location.pathname === '/about' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>About</Link>
            <Link to="/contact" className={`transition-colors px-4 py-2 ${location.pathname === '/contact' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Contact</Link>
            
            <div className="px-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      My Landing Page ({user?.firstName})
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                      window.location.href = '/';
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login/Signup
                </Button>
              )}
              <Button asChild className="w-full brand-gradient text-white border-0">
                <Link to="/courses">Explore Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Login/Signup Modal */}
      <LoginSignupModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
