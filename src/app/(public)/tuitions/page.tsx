'use client';

import React, { useState, useEffect, useTransition, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTuitions } from '@/hooks/useTuitions';
import TuitionCard from '@/components/TuitionCard';
import SectionHeading from '@/components/SectionHeading';
import {
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

const SUBJECTS = [
  'All',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Programming',
  'IELTS',
  'Accounting',
];

const CLASS_LEVELS = [
  'All',
  'SSC',
  'HSC',
  'O-Level',
  'A-Level',
  'University',
  'Professional',
];

const MODES = ['All', 'Online', 'Offline'];

const SORT_OPTIONS = [
  { label: 'Latest', value: '' },
  { label: 'Fee: Low to High', value: 'asc' },
  { label: 'Fee: High to Low', value: 'desc' },
];

function TuitionsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Initialize filter state from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || 'All');
  const [classLevel, setClassLevel] = useState(searchParams.get('classLevel') || 'All');
  const [mode, setMode] = useState(searchParams.get('mode') || 'All');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  // Sync state if URL changes externally
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setSubject(searchParams.get('subject') || 'All');
    setClassLevel(searchParams.get('classLevel') || 'All');
    setMode(searchParams.get('mode') || 'All');
    setSort(searchParams.get('sort') || '');
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  // Query tuitions using tanstack hook
  const { data, isLoading } = useTuitions({
    search: search.trim() || undefined,
    subject: subject !== 'All' ? subject : undefined,
    classLevel: classLevel !== 'All' ? classLevel : undefined,
    mode: mode !== 'All' ? mode : undefined,
    sort: sort || undefined,
    page,
    limit: 9,
  });

  // Update URL helper
  const updateUrl = (newFilters: {
    search?: string;
    subject?: string;
    classLevel?: string;
    mode?: string;
    sort?: string;
    page?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newFilters.search !== undefined) {
      if (newFilters.search.trim()) params.set('search', newFilters.search.trim());
      else params.delete('search');
    }

    if (newFilters.subject !== undefined) {
      if (newFilters.subject && newFilters.subject !== 'All') params.set('subject', newFilters.subject);
      else params.delete('subject');
    }

    if (newFilters.classLevel !== undefined) {
      if (newFilters.classLevel && newFilters.classLevel !== 'All') params.set('classLevel', newFilters.classLevel);
      else params.delete('classLevel');
    }

    if (newFilters.mode !== undefined) {
      if (newFilters.mode && newFilters.mode !== 'All') params.set('mode', newFilters.mode);
      else params.delete('mode');
    }

    if (newFilters.sort !== undefined) {
      if (newFilters.sort) params.set('sort', newFilters.sort);
      else params.delete('sort');
    }

    if (newFilters.page !== undefined) {
      if (newFilters.page > 1) params.set('page', String(newFilters.page));
      else params.delete('page');
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    updateUrl({ search, page: 1 });
  };

  const handleResetFilters = () => {
    setSearch('');
    setSubject('All');
    setClassLevel('All');
    setMode('All');
    setSort('');
    setPage(1);
    router.push(pathname);
  };

  const tuitions = data?.tuitions || [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.total || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      {/* Page Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <SectionHeading
          center
          eyebrow="Tuition Marketplace"
          title="Browse All Tuitions"
          subtitle="Explore vetted tuition posts and mentorship batches. Filter by academic subject, grade level, and online or in-person delivery."
        />
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs space-y-4">
        {/* Top Search Line */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tuitions by title, tutor, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setPage(1);
                  updateUrl({ search: '', page: 1 });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-2.5 text-sm transition-all duration-200 shadow-xs shrink-0"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </form>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Subject Dropdown */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => {
                const val = e.target.value;
                setSubject(val);
                setPage(1);
                updateUrl({ subject: val, page: 1 });
              }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            >
              {SUBJECTS.map((sub) => (
                <option key={sub} value={sub}>
                  {sub === 'All' ? 'All Subjects' : sub}
                </option>
              ))}
            </select>
          </div>

          {/* Class Level Dropdown */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Class Level
            </label>
            <select
              value={classLevel}
              onChange={(e) => {
                const val = e.target.value;
                setClassLevel(val);
                setPage(1);
                updateUrl({ classLevel: val, page: 1 });
              }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            >
              {CLASS_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level === 'All' ? 'All Levels' : level}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Dropdown */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Mode
            </label>
            <select
              value={mode}
              onChange={(e) => {
                const val = e.target.value;
                setMode(val);
                setPage(1);
                updateUrl({ mode: val, page: 1 });
              }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m === 'All' ? 'All Modes' : m}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => {
                const val = e.target.value;
                setSort(val);
                setPage(1);
                updateUrl({ sort: val, page: 1 });
              }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.label} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Action */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/60 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{tuitions.length}</span> of{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{totalCount}</span> tuitions
        </span>
        {(search || subject !== 'All' || classLevel !== 'All' || mode !== 'All' || sort) && (
          <span className="rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 px-2.5 py-0.5 text-[11px] font-medium border border-teal-500/20">
            Active filters applied
          </span>
        )}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-96 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs animate-pulse flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full rounded-xl bg-slate-200 dark:bg-slate-800 mb-4" />
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-3" />
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tuitions Grid */}
      {!isLoading && tuitions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && tuitions.length === 0 && (
        <div className="text-center py-20 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-8">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            No tuitions found matching your criteria
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Try adjusting your search terms, removing subject filters, or clearing your current filter selection.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 text-sm transition-colors shadow-xs"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => {
              const newPage = Math.max(page - 1, 1);
              setPage(newPage);
              updateUrl({ page: newPage });
            }}
            aria-label="Previous page"
            className="inline-flex items-center justify-center h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, idx) => {
              const p = idx + 1;
              const isActive = p === page;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPage(p);
                    updateUrl({ page: p });
                  }}
                  className={`h-10 w-10 rounded-xl font-mono text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 shadow-xs'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => {
              const newPage = Math.min(page + 1, totalPages);
              setPage(newPage);
              updateUrl({ page: newPage });
            }}
            aria-label="Next page"
            className="inline-flex items-center justify-center h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function TuitionsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent" />
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading tuitions...</p>
        </div>
      }
    >
      <TuitionsContent />
    </Suspense>
  );
}
