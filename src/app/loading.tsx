import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#090D16] p-4 text-center">
      <div className="relative flex items-center justify-center mb-6">
        {/* Animated ring */}
        <div className="h-16 w-16 rounded-full border-4 border-teal-500/20 border-t-teal-600 dark:border-t-teal-400 animate-spin" />
        {/* Centered Brand Icon */}
        <div className="absolute flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
          <GraduationCap className="h-5 w-5" />
        </div>
      </div>

      <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
        MentorLagbe
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
        Connecting learners & mentors...
      </p>
    </div>
  );
}
