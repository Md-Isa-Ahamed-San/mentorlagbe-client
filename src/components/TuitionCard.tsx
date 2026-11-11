'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, Globe, MapPin, User as UserIcon, Calendar, ArrowRight } from 'lucide-react';
import { Tuition } from '@/types';
import { formatCurrency, getAverageRating } from '@/lib/utils';
import StarRating from './StarRating';
import { useAuth } from '@/lib/auth-context';
import { useToggleBookmark } from '@/hooks/useBookmarks';
import { toast } from 'sonner';

interface TuitionCardProps {
  tuition: Tuition;
}

export default function TuitionCard({ tuition }: TuitionCardProps) {
  const { user, isAuthenticated } = useAuth();
  const { mutate: toggleBookmark, isPending: isToggling } = useToggleBookmark();

  const isBookmarked = Boolean(user?.savedTuitions?.includes(tuition._id));
  const avgRating = getAverageRating(tuition.reviews);
  const reviewCount = tuition.reviews?.length || 0;
  const isOnline = tuition.mode?.toLowerCase() === 'online';

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please sign in to bookmark tuitions');
      return;
    }
    toggleBookmark(tuition._id);
  };

  return (
    <div className="group h-full flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md hover:border-teal-500/40 transition-all duration-200">
      <div>
        {/* Banner Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 mb-4">
          <img
            src={
              tuition.bannerImage ||
              'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60'
            }
            alt={tuition.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Mode Badge (Online=teal, Offline=slate) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md shadow-xs">
            {isOnline ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/90 text-white px-2 py-0.5 text-[11px] font-semibold">
                <Globe className="h-3 w-3" />
                Online
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 dark:bg-slate-800/90 text-slate-100 px-2 py-0.5 text-[11px] font-semibold">
                <MapPin className="h-3 w-3 text-amber-400" />
                {tuition.location || 'Offline'}
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleBookmark}
            disabled={isToggling}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark tuition'}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-sm transition-transform active:scale-90 hover:scale-105"
          >
            <Bookmark
              className={`h-4 w-4 transition-colors ${
                isBookmarked
                  ? 'fill-teal-600 text-teal-600 dark:fill-teal-400 dark:text-teal-400'
                  : ''
              }`}
            />
          </button>
        </div>

        {/* Badges row: Subject badge (teal), Class Level */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center rounded-md bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300 border border-teal-500/20">
            {tuition.subject}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Class {tuition.classLevel}
          </span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {tuition.title}
        </h3>

        {/* Tutor Info */}
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <UserIcon className="h-3 w-3" />
          </div>
          <span className="font-medium truncate">{tuition.tutorName}</span>
          {tuition.daysPerWeek && (
            <>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                {tuition.daysPerWeek}d/week
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        {reviewCount > 0 && (
          <div className="mt-2.5">
            <StarRating rating={avgRating} size="sm" showNumber totalReviews={reviewCount} />
          </div>
        )}
      </div>

      {/* Footer: Monthly Fee & View Details CTA */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 block">Monthly Fee</span>
          <p className="font-mono tabular-nums text-lg font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(tuition.monthlyFee)}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-sans">/mo</span>
          </p>
        </div>

        <Link
          prefetch={false}
          href={`/tuitions/${tuition._id}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 px-3.5 py-2 text-xs font-semibold text-white dark:text-slate-900 hover:bg-teal-600 dark:hover:bg-teal-400 hover:text-white dark:hover:text-slate-950 transition-colors shadow-xs"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
