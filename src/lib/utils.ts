import { Review } from '@/types';

export function cn(...classes: (string | boolean | undefined | null | { [key: string]: any })[]): string {
  return classes
    .filter(Boolean)
    .map((c) => {
      if (typeof c === 'string') return c;
      if (typeof c === 'object' && c !== null) {
        return Object.entries(c)
          .filter(([, v]) => Boolean(v))
          .map(([k]) => k)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
}

export function formatCurrency(amount: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date?: string | Date | null): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

export function getStatusColor(status?: string): string {
  const s = status?.toLowerCase() || '';
  if (['approved', 'accepted', 'paid', 'active'].includes(s)) {
    return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20';
  }
  if (['pending'].includes(s)) {
    return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20';
  }
  if (['rejected', 'closed', 'cancelled'].includes(s)) {
    return 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20';
  }
  return 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border border-slate-500/20';
}

export function getAverageRating(reviews?: Review[]): number {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0);
  const avg = total / reviews.length;
  return Math.round(avg * 10) / 10;
}
