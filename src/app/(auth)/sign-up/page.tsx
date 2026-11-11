'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  GraduationCap,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, loginWithGoogle, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(name.trim(), email.trim().toLowerCase(), password, role);
      // Auth context signs the user in and toasts success
      if (role === 'tutor') {
        router.push('/dashboard/tutor');
      } else {
        router.push('/dashboard/student');
      }
    } catch {
      // Error toast already displayed in auth context
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
          Create your account
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Join thousands of learners and educators across Bangladesh
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tanvir Hasan"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
        </div>

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
            Password (min. 6 characters)
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
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

        {/* Role Selection (Radio Buttons) */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
            I want to join as:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                role === 'student'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-900 dark:text-teal-200 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === 'student'}
                onChange={() => setRole('student')}
                className="accent-teal-600"
              />
              <span className="text-xs font-semibold">Student / Learner</span>
            </label>

            <label
              className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                role === 'tutor'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-900 dark:text-teal-200 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="radio"
                name="role"
                value="tutor"
                checked={role === 'tutor'}
                onChange={() => setRole('tutor')}
                className="accent-teal-600"
              />
              <span className="text-xs font-semibold">Tutor / Mentor</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99] disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Creating account...' : 'Create Account'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
        <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 uppercase tracking-wider">
          Or continue with
        </span>
      </div>

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
        <span>Sign up with Google</span>
      </button>

      {/* Link to Sign In */}
      <div className="text-center pt-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link
            prefetch={false}
            href="/sign-in"
            className="font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
