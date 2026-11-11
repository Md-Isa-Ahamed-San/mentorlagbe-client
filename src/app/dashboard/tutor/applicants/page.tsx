'use client';

import React from 'react';
import { useTutorApplicants, useRespondApplication } from '@/hooks/useApplications';
import StatusBadge from '@/components/StatusBadge';
import { formatDate } from '@/lib/utils';
import {
  Users,
  Check,
  X,
  Mail,
  Phone,
  Clock,
  FileText,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function TutorApplicantsPage() {
  const { data: applicants, isLoading } = useTutorApplicants();
  const { mutate: respondApplication, isPending: isResponding } = useRespondApplication();

  const handleStatusUpdate = (id: string, status: 'accepted' | 'rejected') => {
    respondApplication({ id, status });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-52 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 w-full rounded-xl bg-slate-100 dark:bg-slate-800/40" />
          ))}
        </div>
      </div>
    );
  }

  const list = applicants || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Manage Applicants
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Review candidate applications submitted to your courses and approve or decline students.
        </p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-4">
            <Users className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No applicants yet
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Your tuitions will attract students soon! Ensure your listings have descriptive syllabi and competitive rates.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">Student</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Contact Info</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Tuition Course</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Schedule & Note</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {list.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(app.studentName)}&background=0d9488&color=fff`}
                            alt={app.studentName}
                            className="h-9 w-9 rounded-full object-cover shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">
                              {app.studentName}
                            </p>
                            <span className="text-xs text-slate-400">
                              Applied {formatDate(app.appliedAt)}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-0.5 text-xs">
                          <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                            <a href={`mailto:${app.studentEmail}`} className="hover:underline">
                              {app.studentEmail}
                            </a>
                          </p>
                          {app.studentPhone && (
                            <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                              <Phone className="h-3.5 w-3.5 text-slate-400" />
                              <a href={`tel:${app.studentPhone}`} className="hover:underline">
                                {app.studentPhone}
                              </a>
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 block max-w-xs truncate">
                          {app.tuitionTitle}
                        </span>
                        <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                          {app.subject}
                        </span>
                      </td>

                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-xs space-y-1">
                          <p className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                            <Clock className="h-3 w-3 text-slate-400 shrink-0" />
                            <span>{app.preferredSchedule || 'Flexible timing'}</span>
                          </p>
                          {app.studentNote && (
                            <p className="text-slate-500 italic line-clamp-2">
                              "{app.studentNote}"
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={app.status} />
                      </td>

                      <td className="px-6 py-4 text-right">
                        {app.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(app._id, 'accepted')}
                              disabled={isResponding}
                              className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 text-xs transition-colors shadow-xs disabled:opacity-50"
                              title="Accept application"
                            >
                              <Check className="h-3.5 w-3.5" />
                              <span>Accept</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(app._id, 'rejected')}
                              disabled={isResponding}
                              className="inline-flex items-center gap-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1.5 text-xs transition-colors shadow-xs disabled:opacity-50"
                              title="Reject application"
                            >
                              <X className="h-3.5 w-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Responded</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card Grid View */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {list.map((app) => (
              <div
                key={app._id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(app.studentName)}&background=0d9488&color=fff`}
                      alt={app.studentName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {app.studentName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {formatDate(app.appliedAt)}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 text-xs space-y-1.5">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Course: {app.tuitionTitle}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span>{app.studentEmail}</span>
                  </p>
                  {app.studentPhone && (
                    <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span>{app.studentPhone}</span>
                    </p>
                  )}
                  <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{app.preferredSchedule || 'Flexible'}</span>
                  </p>
                  {app.studentNote && (
                    <p className="mt-2 text-slate-500 italic pt-1 border-t border-slate-200 dark:border-slate-700">
                      Note: "{app.studentNote}"
                    </p>
                  )}
                </div>

                {app.status === 'pending' && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(app._id, 'accepted')}
                      disabled={isResponding}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 text-xs transition-colors shadow-xs disabled:opacity-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Accept</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(app._id, 'rejected')}
                      disabled={isResponding}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 text-xs transition-colors shadow-xs disabled:opacity-50"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Reject</span>
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
