import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  Award,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ADMIN_SECTIONS } from '@/lib/adminConstants';
import type { AdminSection } from '@/lib/adminTypes';
import { useAuth } from '@/contexts/AuthContext';

const sectionIcons: Record<AdminSection, React.ElementType> = {
  dashboard: LayoutDashboard,
  learners: Users,
  programs: BookOpen,
  sessions: Calendar,
  assignments: ClipboardList,
  certificates: Award,
  contacts: MessageSquare,
};

interface AdminSidebarProps {
  active: AdminSection;
  onChange: (section: AdminSection) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const AdminSidebar = ({ active, onChange, mobileOpen, onMobileClose }: AdminSidebarProps) => {
  const { user, logout } = useAuth();

  const nav = (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/80 px-4 py-5">
        <p className="text-sm font-semibold tracking-tight text-foreground">ZYVOTRIX</p>
        <p className="mt-0.5 text-xs font-medium text-muted-foreground">Administration</p>
        <p className="mt-3 truncate rounded-md bg-muted/60 px-2 py-1.5 text-xs text-muted-foreground">
          {user?.email}
        </p>
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {ADMIN_SECTIONS.map(({ id, label }) => {
          const Icon = sectionIcons[id];
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                onChange(id);
                onMobileClose();
              }}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {label}
            </button>
          );
        })}
      </nav>
      <div className="space-y-2 border-t p-3">
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
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={onMobileClose}
          />
          <aside className="relative h-full w-72 max-w-[85vw] bg-card shadow-xl">{nav}</aside>
        </div>
      )}
    </>
  );
};

export const AdminMobileToggle = ({
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

export default AdminSidebar;
