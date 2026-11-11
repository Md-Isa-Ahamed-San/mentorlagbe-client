'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAuth } from '@/lib/auth-context';
import {
  Menu,
  X,
  GraduationCap,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Browse Tuitions', href: '/tuitions' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ];

  const dashboardHref =
    user?.role === 'admin'
      ? '/dashboard/admin'
      : user?.role === 'tutor'
      ? '/dashboard/tutor'
      : '/dashboard/student';

  const isDark = resolvedTheme === 'dark';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#090D16]/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link prefetch={false} href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-teal-600 dark:text-teal-400">
              MentorLagbe
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                prefetch={false}
                href={item.href}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted ? (
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700 transition-transform hover:-rotate-12" />
                )}
              </button>
            ) : (
              <div className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" />
            )}

            {/* Auth Buttons or User Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 pr-3 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all focus:outline-hidden"
                >
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || 'User'
                      )}&background=0d9488&color=fff`
                    }
                    alt={user.name || 'User avatar'}
                    className="h-8 w-8 rounded-full object-cover border border-teal-500/30"
                  />
                  <div className="text-left hidden lg:block">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[120px]">
                        {user.name}
                      </span>
                      {user.plan === 'pro' && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.2 text-[9px] font-extrabold uppercase">
                          <Sparkles className="h-2.5 w-2.5" />
                          PRO
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize block">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500 transition-transform" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-xl transition-all z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 px-2 py-0.5 text-[10px] font-semibold capitalize">
                          {user.role}
                        </span>
                        {user.plan === 'pro' && (
                          <span className="rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-2 py-0.5 text-[10px] font-bold">
                            PRO
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        prefetch={false}
                        href={dashboardHref}
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        prefetch={false}
                        href="/dashboard/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <UserIcon className="h-4 w-4 text-slate-500" />
                        <span>Update Profile</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  prefetch={false}
                  href="/sign-in"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  prefetch={false}
                  href="/sign-up"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-2.5 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle & Theme */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                prefetch={false}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || 'User'
                      )}&background=0d9488&color=fff`
                    }
                    alt={user.name || 'User avatar'}
                    className="h-10 w-10 rounded-full object-cover border border-teal-500/30"
                  />
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </span>
                      {user.plan === 'pro' && (
                        <span className="rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.2 text-[9px] font-extrabold">
                          PRO
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                      {user.role} • {user.email}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    prefetch={false}
                    href={dashboardHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <LayoutDashboard className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    prefetch={false}
                    href="/dashboard/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <UserIcon className="h-4 w-4 text-slate-500" />
                    <span>Update Profile</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  prefetch={false}
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  prefetch={false}
                  href="/sign-up"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-4 py-2.5 text-sm transition-colors shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
