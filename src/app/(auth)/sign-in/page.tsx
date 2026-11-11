'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  GraduationCap,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const { login, loginWithGoogle, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectAfterLogin = (role?: string) => {
    if (redirectUrl) {
      router.push(redirectUrl);
      return;
    }
    if (role === 'admin') router.push('/dashboard/admin');
    else if (role === 'tutor') router.push('/dashboard/tutor');
    else router.push('/dashboard/student');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim().toLowerCase(), password);
      // Wait briefly for state or route
      redirectAfterLogin();
    } catch {
      // Error handled in auth context toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, role: 'admin' | 'tutor' | 'student') => {
    setEmail(demoEmail);
    setPassword('demo123');
    setIsSubmitting(true);
    try {
      await login(demoEmail, 'demo123');
      redirectAfterLogin(role);
    } catch {
      // Toast already fired
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-lg space-y-6">
      {/* Brand & Heading */}
      <div className="text-center space-y-2">
        <Link prefetch={false} href="/" className="inline-flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs group-hover:scale-105 transition-transform">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-teal-600 dark:text-teal-400">
            MentorLagbe
          </span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Welcome back
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter your credentials to access your tuition dashboard
        </p>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99] disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Google Login Placeholder */}
      <button
        type="button"
        onClick={loginWithGoogle}
        className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Sign in with Google</span>
      </button>

      {/* 1-CLICK DEMO ACCESS SECTION */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            ⚡ Quick Demo Access (1-Click)
          </span>
          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
            Instant Test Login
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Admin Demo Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleDemoLogin('admin@mentorlagbe.com', 'admin')}
            className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 bg-slate-50/70 dark:bg-slate-800/40 p-2.5 text-xs text-slate-700 dark:text-slate-200 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <ShieldAlert className="h-3.5 w-3.5" />
              </div>
              <div className="text-left">
                <span className="font-semibold block leading-tight">Demo Admin Login</span>
                <span className="text-[10px] text-slate-400">admin@mentorlagbe.com</span>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
          </button>

          {/* Tutor Demo Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleDemoLogin('tutor@mentorlagbe.com', 'tutor')}
            className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 bg-slate-50/70 dark:bg-slate-800/40 p-2.5 text-xs text-slate-700 dark:text-slate-200 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>
              <div className="text-left">
                <span className="font-semibold block leading-tight">Demo Tutor Login</span>
                <span className="text-[10px] text-slate-400">tutor@mentorlagbe.com</span>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
          </button>

          {/* Student Demo Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleDemoLogin('student@mentorlagbe.com', 'student')}
            className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 bg-slate-50/70 dark:bg-slate-800/40 p-2.5 text-xs text-slate-700 dark:text-slate-200 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <UserCheck className="h-3.5 w-3.5" />
              </div>
              <div className="text-left">
                <span className="font-semibold block leading-tight">Demo Student Login</span>
                <span className="text-[10px] text-slate-400">student@mentorlagbe.com</span>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Link to Sign Up */}
      <div className="text-center pt-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link
            prefetch={false}
            href="/sign-up"
            className="font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md w-full p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
