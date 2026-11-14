'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStudentStats } from '@/hooks/useStats';
import { useAuth } from '@/lib/auth-context';
import StatsCard from '@/components/StatsCard';
import {
  FileText,
  CheckCircle,
  Clock,
  Crown,
  BookmarkIcon,
  Search,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const CHART_COLORS = ['#f59e0b', '#10b981', '#f43f5e']; // Pending, Accepted, Rejected

export default function StudentOverviewPage() {
  const { user } = useAuth();
  const { data: stats, isLoading, error } = useStudentStats();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-56 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-36"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="hidden lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-80" hidden />
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-80" />
        </div>
      </div>
    );
  }

  const totalApplied = stats?.totalApplied ?? 0;
  const accepted = stats?.accepted ?? 0;
  const pending = stats?.pending ?? 0;
  const rejected = stats?.rejected ?? 0;
  const currentPlan = (stats?.plan || user?.plan || 'free').toUpperCase();

  const chartData = [
    { name: 'Pending', value: pending },
    { name: 'Accepted', value: accepted },
    { name: 'Rejected', value: rejected },
  ].filter((item) => item.value > 0);

  const hasChartData = chartData.length > 0;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Welcome back, {user?.name || 'Student'}! 👋
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track your applied tuition applications, reviews, and learning journey.
          </p>
        </div>

        <Link
          href="/tuitions"
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-2.5 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99]"
        >
          <Search className="h-4 w-4" />
          <span>Browse Tuitions</span>
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Applied"
          value={totalApplied}
          icon={<FileText className="h-5 w-5" />}
          description="Total tuition posts applied for"
        />
        <StatsCard
          title="Accepted"
          value={accepted}
          icon={<CheckCircle className="h-5 w-5" />}
          description="Approved applications by tutors"
          trend={totalApplied > 0 ? `${Math.round((accepted / totalApplied) * 100)}% rate` : undefined}
        />
        <StatsCard
          title="Pending"
          value={pending}
          icon={<Clock className="h-5 w-5" />}
          description="Awaiting tutor review and confirmation"
        />
        <StatsCard
          title="Current Plan"
          value={currentPlan}
          icon={<Crown className="h-5 w-5 text-amber-500" />}
          description={currentPlan === 'PRO' ? 'Premium member access enabled' : 'Upgrade to Pro for priority perks'}
        />
      </div>

      {/* Main Grid: Application Breakdown Chart + Quick Actions */}
      <div className="grid grid-cols-1 gap-6">
        {/* Application Status Chart */}
        <div className="hidden lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between" hidden>
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Application Status Distribution
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Visual breakdown of your submitted applications
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                Total: {totalApplied}
              </span>
            </div>

            <div className="h-64 sm:h-72 mt-4 flex items-center justify-center">
              {mounted && hasChartData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => {
                        let fill = CHART_COLORS[0];
                        if (entry.name === 'Accepted') fill = CHART_COLORS[1];
                        if (entry.name === 'Rejected') fill = CHART_COLORS[2];
                        return <Cell key={`cell-${index}`} fill={fill} strokeWidth={2} />;
                      })}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          return (
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-lg">
                              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                {data.name}
                              </p>
                              <p className="text-sm font-bold font-mono text-teal-600 dark:text-teal-400 mt-1">
                                {data.value} {Number(data.value) === 1 ? 'application' : 'applications'}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      No application activity recorded yet
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
                      Once you apply for tuitions, their real-time approval status will be graphed right here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Pending: <strong className="font-mono text-amber-600 dark:text-amber-400">{pending}</strong></span>
            <span>Accepted: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{accepted}</strong></span>
            <span>Rejected: <strong className="font-mono text-rose-600 dark:text-rose-400">{rejected}</strong></span>
          </div>
        </div>

        {/* Quick Links & Shortcuts Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
              Quick Actions
            </h3>

            <div className="mt-4 space-y-3">
              <Link
                href="/dashboard/student/my-applications"
                prefetch={false}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      My Applications
                    </p>
                    <p className="text-xs text-slate-500">Track and manage submissions</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/dashboard/student/saved-tuitions"
                prefetch={false}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <BookmarkIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      Saved Tuitions
                    </p>
                    <p className="text-xs text-slate-500">Your bookmarked subjects</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/tuitions"
                prefetch={false}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Search className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      Explore Mentors
                    </p>
                    <p className="text-xs text-slate-500">Find experienced tutors</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-teal-900 dark:text-teal-200">
                  Boost your success rate
                </p>
                <p className="text-teal-700 dark:text-teal-400 mt-1">
                  Keep your student profile and contact details up-to-date so mentors can contact you quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
