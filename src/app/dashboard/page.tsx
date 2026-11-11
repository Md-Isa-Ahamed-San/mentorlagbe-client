'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function DashboardRootPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        router.push('/sign-in');
        return;
      }

      switch (user.role) {
        case 'admin':
          router.replace('/dashboard/admin');
          break;
        case 'tutor':
          router.replace('/dashboard/tutor');
          break;
        case 'student':
        default:
          router.replace('/dashboard/student');
          break;
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-teal-600 dark:border-t-teal-400 animate-spin" />
        <div className="absolute font-bold text-xs text-teal-600 dark:text-teal-400">ML</div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
        Directing to your workspace...
      </p>
    </div>
  );
}
