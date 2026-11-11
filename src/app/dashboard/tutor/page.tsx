'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTutorStats } from '@/hooks/useStats';
import { useAuth } from '@/lib/auth-context';
import StatsCard from '@/components/StatsCard';
import {
  BookOpen,
  CheckCircle,
  Users,
  Crown,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export default function TutorOverviewPage() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useTutorStats();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
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
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-80" />
      </div>
    );
  }

  const isPro = (stats?.plan || user?.plan || 'free') === 'pro';
  const totalTuitions = stats?.totalTuitions ?? 0;
  const activeTuitions = stats?.activeTuitions ?? 0;
  const totalApplicants = stats?.totalApplicants ?? 0;
  const planDisplay = isPro ? 'PRO' : 'FREE';
  const tuitionIndicator = isPro ? '∞ Pro' : `${totalTuitions}/2 Free`;

  const barData = stats?.applicantsPerTuition && stats.applicantsPerTuition.length > 0
    ? stats.applicantsPerTuition.map((item) => ({
        title: item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title,
        fullTitle: item.title,
        applicants: item.applicantsCount,
      }))
    : [];

  const hasChartData = barData.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Tutor Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Welcome back, {user?.name}! Track your tuition listings and incoming student applicants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/tutor/post-tuition"
            prefetch={false}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-4 py-2 text-sm transition-all shadow-xs active:scale-[0.99]"
          >
            <Plus className="h-4 w-4" />
            <span>Post New Tuition</span>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Tuitions"
          value={totalTuitions}
          icon={<BookOpen className="h-5 w-5" />}
          trend={tuitionIndicator}
          description={isPro ? 'Unlimited posts unlocked' : 'Free tier limited to 2 posts'}
        />
        <StatsCard
          title="Active & Approved"
          value={activeTuitions}
          icon={<CheckCircle className="h-5 w-5" />}
          description="Publicly listed and accepting students"
        />
        <StatsCard
          title="Total Applicants"
          value={totalApplicants}
          icon={<Users className="h-5 w-5" />}
          description="Interested students applied across all posts"
        />
        <StatsCard
          title="Current Plan"
          value={planDisplay}
          icon={<Crown className="h-5 w-5 text-amber-500" />}
          description={isPro ? 'Priority listing in searches' : 'Upgrade to Pro for unlimited posts'}
        />
      </div>

      {/* Main Grid: Bar Chart + Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicants Per Tuition Bar Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Applicants Per Tuition Post
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Comparison of demand across your tuition subjects
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                Total: {totalApplicants}
              </span>
            </div>

            <div className="h-72 mt-4 flex items-center justify-center">
              {mounted && hasChartData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis
                      dataKey="title"
                      tick={{ fontSize: 11 }}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-lg max-w-xs">
                              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                {data.fullTitle}
                              </p>
                              <p className="text-sm font-bold font-mono text-teal-600 dark:text-teal-400 mt-1">
                                {data.applicants} {Number(data.applicants) === 1 ? 'applicant' : 'applicants'}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="applicants"
                      fill="#0d9488"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      No applicant data available yet
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
                      When students apply to your approved tuition posts, your applicant response metrics will show up here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Listing count: <strong className="font-mono text-slate-800 dark:text-slate-200">{totalTuitions}</strong></span>
            <span>Active: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{activeTuitions}</strong></span>
          </div>
        </div>

        {/* Quick Actions & Pro Banner */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
              Tutor Controls
            </h3>

            <div className="mt-4 space-y-3">
              <Link
                href="/dashboard/tutor/post-tuition"
                prefetch={false}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      Post New Tuition
                    </p>
                    <p className="text-xs text-slate-500">Create a new course offering</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/dashboard/tutor/my-tuitions"
                prefetch={false}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      My Tuitions
                    </p>
                    <p className="text-xs text-slate-500">Edit, activate, or delete posts</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/dashboard/tutor/applicants"
                prefetch={false}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Manage Applicants
                    </p>
                    <p className="text-xs text-slate-500">Accept or reject students</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Upgrade Banner for Free Plan */}
          {!isPro ? (
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Upgrade to Pro Plan</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Free tutors are restricted to 2 tuition posts. Go Pro for unlimited listings, featured badge, and top search ranking.
              </p>
              <div className="mt-4">
                <Link
                  href="/pricing"
                  prefetch={false}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 text-xs transition-colors shadow-xs"
                >
                  <Crown className="h-3.5 w-3.5" />
                  <span>View Pro Pricing</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <Crown className="h-4 w-4 text-amber-500" />
                <span>Pro Member Active</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                You have unlimited tuition postings and verified tutor badge enabled across the platform.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
