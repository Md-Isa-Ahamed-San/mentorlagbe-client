'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMyApplications, useCancelApplication } from '@/hooks/useApplications';
import StatusBadge from '@/components/StatusBadge';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import {
  FileText,
  Search,
  Calendar,
  User,
  DollarSign,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function MyApplicationsPage() {
  const { data: applications, isLoading } = useMyApplications();
  const { mutate: cancelApplication, isPending: isCancelling } = useCancelApplication();

  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const handleCancel = (id: string) => {
    cancelApplication(id, {
      onSettled: () => setConfirmCancelId(null),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 w-full rounded-xl bg-slate-100 dark:bg-slate-800/40" />
          ))}
        </div>
      </div>
    );
  }

  const appList = applications || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            My Applications
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review the status of your applications submitted to mentors.
          </p>
        </div>

        <Link
          href="/tuitions"
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-4 py-2 text-sm transition-all shadow-xs active:scale-[0.99] w-fit"
        >
          <Search className="h-4 w-4" />
          <span>Find More Tuitions</span>
        </Link>
      </div>

      {/* Confirmation Modal for Cancelling */}
      {confirmCancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Cancel Application?
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Are you sure you want to cancel this tuition application? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmCancelId(null)}
                disabled={isCancelling}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Keep Application
              </button>
              <button
                type="button"
                onClick={() => handleCancel(confirmCancelId)}
                disabled={isCancelling}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition-colors shadow-xs disabled:opacity-50 flex items-center gap-2"
              >
                {isCancelling ? 'Cancelling...' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applications List */}
      {appList.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-4">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No applications yet
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Browse tuitions to get started! Apply directly to courses matching your academic needs.
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
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">Tuition Title</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Subject</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Tutor</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Monthly Fee</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Applied Date</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {appList.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/tuitions/${app.tuitionId}`}
                          prefetch={false}
                          className="font-semibold text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors line-clamp-1 flex items-center gap-1.5"
                        >
                          <span>{app.tuitionTitle}</span>
                          <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-teal-500/10 px-2 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
                          {app.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {app.tutorName}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                        {formatCurrency(app.monthlyFee)}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {formatDate(app.appliedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {app.status === 'pending' ? (
                          <button
                            type="button"
                            onClick={() => setConfirmCancelId(app._id)}
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            <span>Cancel</span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No action</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card Grid View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {appList.map((app) => (
              <div
                key={app._id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center rounded-md bg-teal-500/10 px-2 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
                    {app.subject}
                  </span>
                  <StatusBadge status={app.status} />
                </div>

                <Link
                  href={`/tuitions/${app.tuitionId}`}
                  prefetch={false}
                  className="block font-bold text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  {app.tuitionTitle}
                </Link>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">{app.tutorName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{formatDate(app.appliedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {formatCurrency(app.monthlyFee)}/mo
                    </span>
                  </div>
                </div>

                {app.status === 'pending' && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setConfirmCancelId(app._id)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 transition-colors"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Cancel Application</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
