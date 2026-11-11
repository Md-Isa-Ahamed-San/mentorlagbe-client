'use client';

import React from 'react';
import { useAdminTransactions } from '@/hooks/useAdmin';
import StatusBadge from '@/components/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  CreditCard,
  DollarSign,
  Calendar,
  Mail,
  User,
  Shield,
  GraduationCap,
  Crown,
} from 'lucide-react';

export default function AdminTransactionsPage() {
  const { data: transactions, isLoading } = useAdminTransactions();

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-full rounded-xl bg-slate-100 dark:bg-slate-800/40" />
          ))}
        </div>
      </div>
    );
  }

  const list = transactions || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Transaction History
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Audit trail of Pro subscription upgrades processed through Stripe checkout.
        </p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-4">
            <CreditCard className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No transactions found
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Payment logs will automatically appear here once users purchase Pro subscriptions.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">User</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Role</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Plan Purchased</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Amount</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Transaction ID</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Paid Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {list.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          {tx.userName}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3" />
                          <span>{tx.userEmail}</span>
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300 border border-teal-500/20 capitalize">
                        {tx.userRole}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
                        <Crown className="h-4 w-4" />
                        <span className="capitalize">{tx.planName || 'PRO'}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {formatCurrency(tx.amount)}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md select-all">
                        {tx.transactionId || tx.stripeSessionId?.slice(0, 16) || tx._id}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={tx.paymentStatus || 'paid'} />
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500 text-right">
                      {formatDate(tx.paidAt)}
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
