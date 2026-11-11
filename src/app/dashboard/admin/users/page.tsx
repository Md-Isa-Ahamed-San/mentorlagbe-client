'use client';

import React, { useState, useEffect } from 'react';
import { useAdminUsers, useUpdateUserRole } from '@/hooks/useAdmin';
import { User } from '@/types';
import { formatDate, cn } from '@/lib/utils';
import {
  Users,
  Search,
  Crown,
  Shield,
  GraduationCap,
  User as UserIcon,
  Mail,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: users, isLoading } = useAdminUsers(debouncedSearch);
  const { mutate: updateRole, isPending: isUpdating } = useUpdateUserRole();

  const handleRoleChange = (userId: string, newRole: 'student' | 'tutor' | 'admin') => {
    updateRole({ id: userId, role: newRole });
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

  const userList = users || [];

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            User Management
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage user accounts, assign system roles, and inspect active plans.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      {/* Users Table */}
      {userList.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-4">
            <Users className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No users found
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {searchTerm
              ? `No registered members match "${searchTerm}".`
              : 'There are currently no registered users on the platform.'}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">User</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Email</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Current Role</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Plan</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Joined Date</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {userList.map((u) => {
                  const avatar =
                    u.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'User')}&background=0d9488&color=fff`;

                  return (
                    <tr
                      key={u._id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={avatar}
                            alt={u.name}
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">
                              {u.name}
                            </p>
                            {u.phone && (
                              <p className="text-xs text-slate-400">{u.phone}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          <span>{u.email}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {u.role === 'admin' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-400 border border-purple-500/20">
                            <Shield className="h-3 w-3" />
                            Admin
                          </span>
                        )}
                        {u.role === 'tutor' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold text-teal-600 dark:text-teal-400 border border-teal-500/20">
                            <GraduationCap className="h-3 w-3" />
                            Tutor
                          </span>
                        )}
                        {u.role === 'student' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            <UserIcon className="h-3 w-3" />
                            Student
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {u.plan === 'pro' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Crown className="h-3 w-3" />
                            PRO
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-slate-500/10 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-500/20">
                            FREE
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-500">
                        {formatDate(u.createdAt)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <select
                          value={u.role}
                          disabled={isUpdating}
                          onChange={(e) =>
                            handleRoleChange(u._id, e.target.value as 'student' | 'tutor' | 'admin')
                          }
                          aria-label={`Change role for ${u.name}`}
                          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:border-teal-500 focus:outline-hidden disabled:opacity-50"
                        >
                          <option value="student">Student</option>
                          <option value="tutor">Tutor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
