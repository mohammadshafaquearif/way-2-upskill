import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  User,
  LogOut,
  BookOpen,
  ChevronDown,
  Brain,
  Code,
  Shield,
  Cloud,
  Wrench,
  Sparkles,
} from 'lucide-react';
import LoginSignupModal from './LoginSignupModal';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const courses = [
  { id: 'ai-ml', title: 'AI/ML & Generative AI', route: '/courses/ai-ml', icon: Brain },
  { id: 'web-dev', title: 'Full Stack Web Development', route: '/courses/web-development', icon: Code },
  { id: 'devops', title: 'DevOps Engineering', route: '/courses/devops', icon: Wrench },
  { id: 'cybersecurity', title: 'Cybersecurity', route: '/courses/cybersecurity', icon: Shield },
  { id: 'cloud', title: 'Cloud Computing', route: '/courses/cloud-computing', icon: Cloud },
];

const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${
      active ? 'text-primary' : 'text-foreground/80 hover:text-primary'
    }`;

  return (
    <header className="fixed top-0 z-50 w-full max-w-[100vw]">
      {/* Promo bar */}
      <div className="hidden bg-primary text-primary-foreground sm:block">
        <div className="container flex items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-sm">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span>
            New cohorts open — explore industry-ready programs in AI, Cloud &amp; Full Stack
          </span>
          <Link to="/courses" className="ml-1 underline underline-offset-2 hover:opacity-90">
            View Programs →
          </Link>
        </div>
      </div>

      <nav
        className={`border-b transition-all duration-300 ${
          isScrolled
            ? 'border-border bg-card/95 shadow-md backdrop-blur-md'
            : 'border-transparent bg-card shadow-sm'
        }`}
      >
        <div className="container flex max-w-full items-center justify-between gap-2 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex min-w-0 max-w-[calc(100%-3rem)] shrink items-center gap-2 sm:gap-2.5"
          >
            <img
              src="/zyvotrix-logo.png"
              alt="Zyvotrix logo"
              className="h-9 w-9 shrink-0 object-contain sm:h-11 sm:w-11"
              width={44}
              height={44}
            />
            <span className="truncate text-xl font-bold tracking-tight text-brand-950 sm:text-2xl">
              Zyvotrix
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-7 lg:flex">
            <Link to="/" className={navLinkClass(location.pathname === '/')}>
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 ${navLinkClass(location.pathname.startsWith('/courses'))}`}
                >
                  Programs
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 rounded-xl p-2">
                {courses.map((course) => {
                  const IconComponent = course.icon;
                  return (
                    <DropdownMenuItem key={course.id} asChild>
                      <Link
                        to={course.route}
                        className="flex items-center gap-3 rounded-lg p-3"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </span>
                        <span className="text-sm font-medium">{course.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuItem asChild>
                  <Link
                    to="/courses"
                    className="mt-1 flex items-center justify-center rounded-lg border-t border-border p-3 text-sm font-semibold text-primary"
                  >
                    View All Programs
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/resources" className={navLinkClass(location.pathname === '/resources')}>
              Resources
            </Link>
            <Link to="/#community" className={navLinkClass(false)}>
              Community
            </Link>
            <Link to="/about" className={navLinkClass(location.pathname === '/about')}>
              About
            </Link>
            <Link to="/faq" className={navLinkClass(location.pathname === '/faq')}>
              FAQ
            </Link>

            <div className="flex items-center gap-2.5">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/30 font-medium text-primary hover:bg-primary/5"
                    >
                      <User className="mr-2 h-4 w-4" />
                      {user?.firstName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <BookOpen className="mr-2 h-4 w-4" />
                        My Landing Page
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        window.location.href = '/';
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="font-medium text-foreground/80 hover:text-primary"
                >
                  Log In
                </Button>
              )}
              <Button asChild size="sm" className="btn-brand rounded-lg px-5 font-semibold">
                <Link to="/courses">Explore Programs</Link>
              </Button>
            </div>
          </div>

          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="slide-in absolute left-0 right-0 top-full max-h-[min(85vh,calc(100dvh-4rem))] w-full overflow-y-auto overscroll-contain border-t border-border bg-card py-4 shadow-lg lg:hidden">
            <div className="container flex flex-col space-y-1 pb-6">
              <Link to="/" className={`px-4 py-3 ${navLinkClass(location.pathname === '/')}`}>
                Home
              </Link>

              <div className="px-4 py-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Programs
                </p>
                <div className="ml-2 space-y-1">
                  {courses.map((course) => {
                    const IconComponent = course.icon;
                    return (
                      <Link
                        key={course.id}
                        to={course.route}
                        className={`flex items-center gap-3 py-2.5 ${navLinkClass(location.pathname === course.route)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span className="text-sm">{course.title}</span>
                      </Link>
                    );
                  })}
                  <Link
                    to="/courses"
                    className="flex py-2.5 text-sm font-semibold text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View All Programs →
                  </Link>
                </div>
              </div>

              <Link
                to="/resources"
                className={`px-4 py-3 ${navLinkClass(location.pathname === '/resources')}`}
              >
                Resources
              </Link>
              <Link to="/#community" className="px-4 py-3 text-sm font-medium text-foreground/80">
                Community
              </Link>
              <Link to="/about" className={`px-4 py-3 ${navLinkClass(location.pathname === '/about')}`}>
                About
              </Link>
              <Link to="/faq" className={`px-4 py-3 ${navLinkClass(location.pathname === '/faq')}`}>
                FAQ
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-3 ${navLinkClass(location.pathname === '/contact')}`}
              >
                Contact
              </Link>

              <div className="space-y-2 px-4 pt-4">
                {isAuthenticated ? (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        My Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-200 text-red-600"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                        window.location.href = '/';
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Log In / Sign Up
                  </Button>
                )}
                <Button asChild className="btn-brand w-full">
                  <Link to="/courses">Explore Programs</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <LoginSignupModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Navbar;
