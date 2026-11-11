'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { XCircle, ArrowRight, RotateCcw, LayoutDashboard } from 'lucide-react';

export default function PaymentCancelPage() {
  const { user } = useAuth();

  const dashboardHref =
    user?.role === 'admin'
      ? '/dashboard/admin'
      : user?.role === 'tutor'
      ? '/dashboard/tutor'
      : '/dashboard/student';

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-lg text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto border border-slate-200 dark:border-slate-700">
          <XCircle className="h-8 w-8" />
        </div>

        <div>
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
            Order Incomplete
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Payment Cancelled
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Your payment was not processed. No charges were made to your card.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            prefetch={false}
            href="/pricing"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </Link>

          <Link
            prefetch={false}
            href={dashboardHref}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
