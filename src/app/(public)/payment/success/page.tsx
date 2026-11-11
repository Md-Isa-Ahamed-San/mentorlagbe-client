'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { verifyStripeSessionAction } from '@/actions/payment.actions';
import { useAuth } from '@/lib/auth-context';
import { formatCurrency } from '@/lib/utils';
import {
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Mail,
} from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { user, refreshUser } = useAuth();

  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<{
    planName?: string;
    amount?: number;
    transactionId?: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;

    async function verify() {
      if (!sessionId) {
        if (mounted) {
          setError('No session ID found in request. Please check your payment confirmation.');
          setIsVerifying(false);
        }
        return;
      }

      try {
        const res = await verifyStripeSessionAction(sessionId);
        if (mounted) {
          if (res.success) {
            setPaymentData(res.data?.payment || res.data || {});
            await refreshUser();
          } else {
            setError(res.message || 'Payment verification could not be completed.');
          }
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Payment verification encountered an unexpected error.');
        }
      } finally {
        if (mounted) {
          setIsVerifying(false);
        }
      }
    }

    verify();

    return () => {
      mounted = false;
    };
  }, [sessionId, refreshUser]);

  const dashboardHref =
    user?.role === 'admin'
      ? '/dashboard/admin'
      : user?.role === 'tutor'
      ? '/dashboard/tutor'
      : '/dashboard/student';

  if (isVerifying) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent mb-4" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
          Verifying Your Payment...
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Syncing transaction details and upgrading your MentorLagbe account.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="rounded-2xl border border-rose-500/20 bg-white dark:bg-slate-900 p-8 shadow-lg text-center space-y-5">
          <div className="h-14 w-14 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Verification Issue
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {error}
          </p>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="mailto:mentorlagbe@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Support</span>
            </a>
            <Link
              prefetch={false}
              href={dashboardHref}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="rounded-2xl border border-emerald-500/20 bg-white dark:bg-slate-900 p-8 shadow-xl text-center space-y-6">
        {/* Success Icon */}
        <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
          <CheckCircle className="h-8 w-8" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-2">
            Payment Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Payment Successful!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Thank you for subscribing. Your PRO membership benefits are now active.
          </p>
        </div>

        {/* Transaction Details Card */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-2.5 text-left text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Plan</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 uppercase">
              {paymentData?.planName || 'PRO Plan'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Amount Paid</span>
            <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-slate-100">
              {paymentData?.amount ? formatCurrency(paymentData.amount) : '$15.00'}
            </span>
          </div>

          {paymentData?.transactionId && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400">Transaction ID</span>
              <span className="font-mono text-[10px] text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                {paymentData.transactionId}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-500 dark:text-slate-400">Status</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified & Active
            </span>
          </div>
        </div>

        {/* CTA to Dashboard */}
        <div className="pt-2">
          <Link
            prefetch={false}
            href={dashboardHref}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md"
          >
            <span>Proceed to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
