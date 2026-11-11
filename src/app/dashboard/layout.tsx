'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import ThemeToggle from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Crown,
  BookmarkIcon,
  CreditCard,
  GraduationCap,
  Shield,
  User as UserIcon,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auth Guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] flex flex-col items-center justify-center p-4">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-teal-600 dark:border-t-teal-400 animate-spin" />
          <div className="absolute font-bold text-xs text-teal-600 dark:text-teal-400">ML</div>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // Determine Nav Items by Role
  const role = user.role || 'student';
  let navItems: NavItem[] = [];

  if (role === 'student') {
    navItems = [
      { label: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
      { label: 'My Applications', href: '/dashboard/student/my-applications', icon: FileText },
      { label: 'Saved Tuitions', href: '/dashboard/student/saved-tuitions', icon: BookmarkIcon },
    ];
  } else if (role === 'tutor') {
    navItems = [
      { label: 'Overview', href: '/dashboard/tutor', icon: LayoutDashboard },
      { label: 'Post Tuition', href: '/dashboard/tutor/post-tuition', icon: Plus },
      { label: 'My Tuitions', href: '/dashboard/tutor/my-tuitions', icon: BookOpen },
      { label: 'Applicants', href: '/dashboard/tutor/applicants', icon: Users },
    ];
  } else if (role === 'admin') {
    navItems = [
      { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
      { label: 'Users', href: '/dashboard/admin/users', icon: Users },
      { label: 'Tuitions', href: '/dashboard/admin/tuitions', icon: BookOpen },
      { label: 'Transactions', href: '/dashboard/admin/transactions', icon: CreditCard },
    ];
  }

  const sharedNavItems: NavItem[] = [
    { label: 'Update Profile', href: '/dashboard/profile', icon: Settings },
  ];

  const isLinkActive = (href: string) => {
    if (href === `/dashboard/${role}`) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  const getRoleBadge = () => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-600 dark:text-purple-400 border border-purple-500/20 capitalize">
            <Shield className="h-3 w-3" />
            Admin
          </span>
        );
      case 'tutor':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold text-teal-600 dark:text-teal-400 border border-teal-500/20 capitalize">
            <GraduationCap className="h-3 w-3" />
            Tutor
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/20 capitalize">
            <UserIcon className="h-3 w-3" />
            Student
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2.5 overflow-hidden focus:outline-hidden"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 font-bold shadow-xs">
              ML
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white truncate">
                Mentor<span className="text-teal-600 dark:text-teal-400">Lagbe</span>
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Card */}
        <div className={cn('p-4 border-b border-slate-200 dark:border-slate-800', isCollapsed && 'p-2 flex flex-col items-center')}>
          <div className={cn('flex items-center gap-3', isCollapsed && 'flex-col')}>
            <div className="relative">
              <img
                src={
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=0d9488&color=fff`
                }
                alt={user.name || 'User'}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-teal-500/20"
              />
              {user.plan === 'pro' && (
                <div
                  title="PRO Subscriber"
                  className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white shadow-xs"
                >
                  <Crown className="h-2.5 w-2.5" />
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {user.name}
                  </p>
                  {user.plan === 'pro' && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1 rounded-sm">
                      PRO
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  {getRoleBadge()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            {!isCollapsed && (
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Main Menu
              </p>
            )}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = isLinkActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                      active
                        ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-r-2 border-teal-500'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100',
                      isCollapsed && 'justify-center px-2'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5 shrink-0 transition-colors',
                        active ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                      )}
                    />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            {!isCollapsed && (
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Preferences
              </p>
            )}
            <nav className="space-y-1">
              {sharedNavItems.map((item) => {
                const active = isLinkActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                      active
                        ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-r-2 border-teal-500'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100',
                      isCollapsed && 'justify-center px-2'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5 shrink-0 transition-colors',
                        active ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                      )}
                    />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer / Sign Out & Collapse */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <button
            type="button"
            onClick={logout}
            title={isCollapsed ? 'Sign Out' : undefined}
            className={cn(
              'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors duration-150',
              isCollapsed && 'justify-center px-2'
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-300 ease-in-out',
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 capitalize">
                {pathname.includes('/student') && 'Student Workspace'}
                {pathname.includes('/tutor') && 'Tutor Workspace'}
                {pathname.includes('/admin') && 'Platform Admin'}
                {pathname.includes('/profile') && 'Account Settings'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

            <Link
              href="/dashboard/profile"
              prefetch={false}
              className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src={
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=0d9488&color=fff`
                }
                alt={user.name || 'User'}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-teal-500/20"
              />
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[120px] truncate">
                {user.name}
              </span>
            </Link>
          </div>
        </header>

        {/* Dashboard Body Page Content */}
        <main className="flex-1 bg-slate-50 dark:bg-[#090D16] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
