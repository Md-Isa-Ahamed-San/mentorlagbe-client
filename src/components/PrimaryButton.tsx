import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export default function PrimaryButton({
  children,
  isLoading = false,
  icon,
  variant = 'primary',
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold px-5 py-2.5 text-sm transition-all duration-200 shadow-xs active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 hover:shadow-md',
    outline:
      'border border-slate-300 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800',
    secondary:
      'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100',
    ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-none',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
