'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090D16] p-4 text-center">
      <div className="max-w-md w-full rounded-2xl border border-rose-500/20 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-lg space-y-6">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Something went wrong!
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-mono text-xs bg-slate-100 dark:bg-slate-800 p-3 rounded-xl overflow-x-auto text-left break-words">
            {error.message || 'An unexpected runtime error occurred.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          <Link
            prefetch={false}
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
