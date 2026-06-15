import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Calendar,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Library,
  LogOut,
  Menu,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import type { LMSNavItem } from '@/lib/lms/types';

const NAV_ITEMS: LMSNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'curriculum', label: 'Curriculum', path: '/dashboard/curriculum' },
  { id: 'sessions', label: 'Live Sessions', path: '/dashboard/sessions' },
  { id: 'assignments', label: 'Assignments', path: '/dashboard/assignments' },
  { id: 'projects', label: 'Projects', path: '/dashboard/projects' },
  { id: 'resources', label: 'Resources', path: '/dashboard/resources' },
  { id: 'certificate', label: 'Certificate', path: '/dashboard/certificate' },
  { id: 'profile', label: 'Profile', path: '/dashboard/profile' },
];

const navIcons: Record<string, React.ElementType> = {
  dashboard: LayoutDashboard,
  curriculum: BookOpen,
  sessions: Calendar,
  assignments: ClipboardList,
  projects: FolderKanban,
  resources: Library,
  certificate: Award,
  profile: User,
};

interface LearnerSidebarProps {
  programCode?: string;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const LearnerSidebar = ({ programCode, mobileOpen, onMobileClose }: LearnerSidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const nav = (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/80 px-4 py-5">
        <p className="text-sm font-semibold tracking-tight text-foreground">ZYVOTRIX</p>
        <p className="mt-0.5 text-xs font-medium text-muted-foreground">Learning Platform</p>
        {programCode ? (
          <p className="mt-3 text-xs font-medium text-primary">{programCode} Program</p>
        ) : null}
        <p className="mt-2 truncate rounded-md bg-muted/60 px-2 py-1.5 text-xs text-muted-foreground">
          {user?.email}
        </p>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {NAV_ITEMS.map(({ id, label, path, badge }) => {
          const Icon = navIcons[id];
          const active = isActive(path);
          return (
            <Link
              key={id}
              to={path}
              onClick={onMobileClose}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                active
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="flex-1">{label}</span>
              {badge ? (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-border/80 p-3">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/">Back to site</Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r border-border/80 bg-card lg:block">{nav}</aside>
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={onMobileClose}
          />
          <aside className="relative h-full w-72 max-w-[85vw] bg-card shadow-xl">{nav}</aside>
        </div>
      ) : null}
    </>
  );
};

export const LearnerMobileToggle = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => (
  <Button variant="outline" size="icon" className="lg:hidden" onClick={onToggle}>
    {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
  </Button>
);

export default LearnerSidebar;
