'use client';

import React from 'react';
import Link from 'next/link';
import { useSavedTuitions, useToggleBookmark } from '@/hooks/useBookmarks';
import { formatCurrency } from '@/lib/utils';
import {
  Bookmark,
  BookmarkX,
  Search,
  Globe,
  MapPin,
  ExternalLink,
  GraduationCap,
  Calendar,
} from 'lucide-react';

export default function SavedTuitionsPage() {
  const { data: tuitions, isLoading } = useSavedTuitions();
  const { mutate: toggleBookmark, isPending: isToggling } = useToggleBookmark();

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 h-80"
            />
          ))}
        </div>
      </div>
    );
  }

  const list = tuitions || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Saved Tuitions
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Keep track of courses you’ve bookmarked to review or apply to later.
          </p>
        </div>

        <Link
          href="/tuitions"
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-4 py-2 text-sm transition-all shadow-xs active:scale-[0.99] w-fit"
        >
          <Search className="h-4 w-4" />
          <span>Explore Tuitions</span>
        </Link>
      </div>

      {/* Grid or Empty State */}
      {list.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
            <Bookmark className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No saved tuitions
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Browse and bookmark tuitions you're interested in! They will appear here for easy access.
          </p>
          <div className="mt-6">
            <Link
              href="/tuitions"
              prefetch={false}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-2.5 text-sm transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <Search className="h-4 w-4" />
              <span>Browse Tuitions</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((tuition) => {
            const isOnline = tuition.mode?.toLowerCase() === 'online';
            const imgUrl =
              tuition.bannerImage ||
              (tuition as any).image ||
              'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60';

            return (
              <div
                key={tuition._id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md hover:border-teal-500/30 transition-all duration-200"
              >
                <div>
                  {/* Banner Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 mb-4">
                    <img
                      src={imgUrl}
                      alt={tuition.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Mode Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white">
                      {isOnline ? (
                        <>
                          <Globe className="h-3.5 w-3.5 text-teal-400" />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-3.5 w-3.5 text-amber-400" />
                          <span>{tuition.location || 'Offline'}</span>
                        </>
                      )}
                    </div>

                    {/* Remove Bookmark Button */}
                    <button
                      type="button"
                      onClick={() => toggleBookmark(tuition._id)}
                      disabled={isToggling}
                      title="Remove Bookmark"
                      aria-label="Remove Bookmark"
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 text-rose-600 dark:text-rose-400 shadow-sm backdrop-blur-sm transition-transform active:scale-90 hover:scale-105"
                    >
                      <BookmarkX className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center rounded-md bg-teal-500/10 px-2 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
                      {tuition.subject}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Class {tuition.classLevel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="line-clamp-2 text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {tuition.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                    Tutor: {tuition.tutorName}
                  </p>
                </div>

                {/* Footer Fee & CTA */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Monthly Fee</span>
                    <p className="font-mono text-base font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {formatCurrency(tuition.monthlyFee)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(tuition._id)}
                      disabled={isToggling}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove from saved"
                    >
                      <BookmarkX className="h-4 w-4" />
                    </button>

                    <Link
                      href={`/tuitions/${tuition._id}`}
                      prefetch={false}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 px-3.5 py-2 text-xs font-semibold text-white dark:text-slate-900 hover:bg-teal-600 dark:hover:bg-teal-400 hover:text-white dark:hover:text-slate-950 transition-colors"
                    >
                      <span>View</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
