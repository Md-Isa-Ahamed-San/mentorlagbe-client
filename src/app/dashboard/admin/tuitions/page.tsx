'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminTuitions, useModerateTuition } from '@/hooks/useAdmin';
import { Tuition } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import {
  BookOpen,
  Check,
  X,
  ExternalLink,
  Filter,
  User,
  Globe,
  MapPin,
  Calendar,
  AlertCircle,
} from 'lucide-react';

type TabType = 'all' | 'pending' | 'approved' | 'rejected';

export default function AdminTuitionsPage() {
  const { data: tuitions, isLoading } = useAdminTuitions();
  const { mutate: moderateTuition, isPending: isModerating } = useModerateTuition();

  const [activeTab, setActiveTab] = useState<TabType>('pending');

  const handleModerate = (id: string, status: 'approved' | 'rejected' | 'pending') => {
    moderateTuition({ id, approvalStatus: status });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-72 rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
          </div>
          <div className="h-10 w-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-full rounded-xl bg-slate-100 dark:bg-slate-800/40" />
          ))}
        </div>
      </div>
    );
  }

  const allList = tuitions || [];
  const pendingCount = allList.filter((t) => t.approvalStatus === 'pending').length;
  const approvedCount = allList.filter((t) => t.approvalStatus === 'approved').length;
  const rejectedCount = allList.filter((t) => t.approvalStatus === 'rejected').length;

  const filteredList = allList.filter((t) => {
    if (activeTab === 'all') return true;
    return t.approvalStatus === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Tuition Moderation
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Review, approve, or reject tuition listings submitted by tutors before they become visible to students.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all',
            activeTab === 'pending'
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          )}
        >
          <span>Pending</span>
          <span className="font-mono px-1.5 py-0.5 rounded-full bg-amber-500/20 text-[10px]">
            {pendingCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('approved')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all',
            activeTab === 'approved'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          )}
        >
          <span>Approved</span>
          <span className="font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-[10px]">
            {approvedCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rejected')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all',
            activeTab === 'rejected'
              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          )}
        >
          <span>Rejected</span>
          <span className="font-mono px-1.5 py-0.5 rounded-full bg-rose-500/20 text-[10px]">
            {rejectedCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all',
            activeTab === 'all'
              ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          )}
        >
          <span>All Tuitions</span>
          <span className="font-mono px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px]">
            {allList.length}
          </span>
        </button>
      </div>

      {/* Moderation Table */}
      {filteredList.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-4">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No {activeTab !== 'all' ? activeTab : ''} tuitions
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {activeTab === 'pending'
              ? 'All clear! There are no pending tuitions waiting for moderation.'
              : `No tuition posts with status '${activeTab}'.`}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Title</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Subject</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Tutor</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Monthly Fee</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Approval Status</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Active</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Created Date</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredList.map((tuition) => (
                  <tr
                    key={tuition._id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 max-w-xs">
                      <Link
                        href={`/tuitions/${tuition._id}`}
                        prefetch={false}
                        className="font-bold text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors truncate block flex items-center gap-1.5"
                      >
                        <span className="truncate">{tuition.title}</span>
                        <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                      </Link>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        {tuition.mode === 'Online' ? (
                          <Globe className="h-3 w-3 text-teal-500" />
                        ) : (
                          <MapPin className="h-3 w-3 text-amber-500" />
                        )}
                        <span>{tuition.location || tuition.mode}</span>
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-md bg-teal-500/10 px-2 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
                        {tuition.subject}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {tuition.tutorName}
                      </p>
                      <p className="text-xs text-slate-400 truncate">{tuition.tutorEmail}</p>
                    </td>

                    <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {formatCurrency(tuition.monthlyFee)}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={tuition.approvalStatus} />
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                          tuition.isActive
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                            : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
                        )}
                      >
                        {tuition.isActive ? 'Active' : 'Closed'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500">
                      {formatDate(tuition.createdAt)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {tuition.approvalStatus === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleModerate(tuition._id, 'approved')}
                            disabled={isModerating}
                            className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 text-xs transition-colors shadow-xs disabled:opacity-50"
                            title="Approve tuition"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleModerate(tuition._id, 'rejected')}
                            disabled={isModerating}
                            className="inline-flex items-center gap-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1.5 text-xs transition-colors shadow-xs disabled:opacity-50"
                            title="Reject tuition"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          {tuition.approvalStatus === 'approved' ? (
                            <button
                              type="button"
                              onClick={() => handleModerate(tuition._id, 'rejected')}
                              disabled={isModerating}
                              className="rounded-lg px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-500/10 transition-colors"
                              title="Revoke approval"
                            >
                              Revoke
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleModerate(tuition._id, 'approved')}
                              disabled={isModerating}
                              className="rounded-lg px-2.5 py-1 text-xs font-semibold text-emerald-600 hover:bg-emerald-500/10 transition-colors"
                              title="Reinstate approval"
                            >
                              Reinstate
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
