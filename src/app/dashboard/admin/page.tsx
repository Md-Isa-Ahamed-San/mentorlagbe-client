'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdminStats } from '@/hooks/useAdmin';
import { useAuth } from '@/lib/auth-context';
import StatsCard from '@/components/StatsCard';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  GraduationCap,
  Clock,
  DollarSign,
  BookOpen,
  CreditCard,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

export default function AdminOverviewPage() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useAdminStats();
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-80" />
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-80" />
        </div>
      </div>
    );
  }

  const totalUsers = stats?.totalUsers ?? 0;
  const totalTutors = stats?.totalTutors ?? 0;
  const totalStudents = stats?.totalStudents ?? 0;
  const pendingTuitions = stats?.pendingTuitions ?? 0;
  const approvedTuitions = stats?.approvedTuitions ?? 0;
  const rejectedTuitions = stats?.rejectedTuitions ?? 0;
  const totalRevenue = stats?.totalRevenue ?? 0;

  // Chart Data 1: Tuitions By Status
  const tuitionStatusData = [
    { name: 'Approved', count: approvedTuitions, color: '#10b981' },
    { name: 'Pending', count: pendingTuitions, color: '#f59e0b' },
    { name: 'Rejected', count: rejectedTuitions, color: '#f43f5e' },
  ];

  // Chart Data 2: User Role Breakdown
  const userRoleData = [
    { name: 'Students', count: totalStudents, color: '#3b82f6' },
    { name: 'Tutors', count: totalTutors, color: '#0d9488' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            System Administration
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Platform metrics, tuition moderation queue, user roles, and payment volume.
          </p>
        </div>

        {pendingTuitions > 0 && (
          <Link
            href="/dashboard/admin/tuitions"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 px-4 py-2 text-sm font-semibold hover:bg-amber-500/20 transition-colors w-fit"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>{pendingTuitions} Tuitions Awaiting Approval</span>
          </Link>
        )}
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Users"
          value={totalUsers}
          icon={<Users className="h-5 w-5" />}
          description="Registered students and mentors"
        />
        <StatsCard
          title="Total Tutors"
          value={totalTutors}
          icon={<GraduationCap className="h-5 w-5" />}
          description={`${totalStudents} active students enrolled`}
        />
        <StatsCard
          title="Pending Tuitions"
          value={pendingTuitions}
          icon={<Clock className="h-5 w-5" />}
          description="Awaiting moderation checks"
          trend={pendingTuitions > 0 ? 'Requires Action' : 'All Clear'}
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<DollarSign className="h-5 w-5" />}
          description="Cumulative Stripe subscription volume"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tuition Moderation Status Chart */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Tuitions by Moderation Status
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Breakdown of submitted courses across the system
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                Total: {approvedTuitions + pendingTuitions + rejectedTuitions}
              </span>
            </div>

            <div className="h-64 mt-4">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tuitionStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-lg">
                              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                {data.name}
                              </p>
                              <p className="text-sm font-bold font-mono text-teal-600 dark:text-teal-400 mt-1">
                                {data.count} tuitions
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {tuitionStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Approved: <strong className="font-mono text-emerald-600">{approvedTuitions}</strong></span>
            <span>Pending: <strong className="font-mono text-amber-600">{pendingTuitions}</strong></span>
            <span>Rejected: <strong className="font-mono text-rose-600">{rejectedTuitions}</strong></span>
          </div>
        </div>

        {/* User Breakdown Chart */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  User Population by Role
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Platform member composition
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                Total: {totalUsers}
              </span>
            </div>

            <div className="h-64 mt-4">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userRoleData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-lg">
                              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                {data.name}
                              </p>
                              <p className="text-sm font-bold font-mono text-teal-600 dark:text-teal-400 mt-1">
                                {data.count} registered
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {userRoleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Students: <strong className="font-mono text-blue-600">{totalStudents}</strong></span>
            <span>Tutors: <strong className="font-mono text-teal-600">{totalTutors}</strong></span>
          </div>
        </div>
      </div>

      {/* Admin Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/dashboard/admin/users"
          prefetch={false}
          className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                User Management
              </h4>
              <p className="text-xs text-slate-500">Manage roles & access</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/admin/tuitions"
          prefetch={false}
          className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Tuition Moderation
              </h4>
              <p className="text-xs text-slate-500">{pendingTuitions} pending review</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/admin/transactions"
          prefetch={false}
          className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Transactions
              </h4>
              <p className="text-xs text-slate-500">Stripe payment logs</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
