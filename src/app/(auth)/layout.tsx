import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090D16] p-4 sm:p-6">
      {children}
    </div>
  );
}
