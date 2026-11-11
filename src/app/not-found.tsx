import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090D16] p-4 text-center">
      <div className="max-w-md w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-lg space-y-6">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md mx-auto">
          <GraduationCap className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <p className="font-mono tabular-nums text-4xl sm:text-5xl font-extrabold text-teal-600 dark:text-teal-400">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="pt-2">
          <Link
            prefetch={false}
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
