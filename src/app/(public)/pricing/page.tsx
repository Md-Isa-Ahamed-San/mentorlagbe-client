'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { createStripeCheckoutAction } from '@/actions/payment.actions';
import SectionHeading from '@/components/SectionHeading';
import {
  Check,
  X as CrossIcon,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  GraduationCap,
  Users,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function PricingPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'tutor' | 'student'>('tutor');
  const [isUpgrading, setIsUpgrading] = useState(false);

  const isUserPro = user?.plan === 'pro';

  const handleUpgrade = async (role: 'tutor' | 'student', amount: number) => {
    if (!isAuthenticated || !user) {
      toast.error('Please sign in or create an account to upgrade');
      router.push('/sign-in?redirect=/pricing');
      return;
    }

    if (isUserPro) {
      toast.info('You are already subscribed to the PRO plan!');
      return;
    }

    setIsUpgrading(true);
    try {
      const res = await createStripeCheckoutAction({
        planName: 'pro',
        amount,
        userEmail: user.email,
        userName: user.name || 'MentorLagbe Member',
        userRole: user.role || role,
      });

      if (res.success && (res.url || res.data?.url)) {
        window.location.href = (res.url || res.data?.url) as string;
      } else {
        toast.error(res.message || 'Unable to initiate checkout. Please try again.');
        setIsUpgrading(false);
      }
    } catch (err: any) {
      toast.error(err.message || 'Checkout failed');
      setIsUpgrading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <SectionHeading
          center
          eyebrow="Subscription Plans"
          title="Simple, Transparent Pricing"
          subtitle="Choose the right plan to power your tuition journey. Whether you are finding the best mentors or expanding your tutoring reach, we have you covered."
        />

        {/* Tab Switcher: For Tutors / For Students */}
        <div className="mt-8 inline-flex p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('tutor')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'tutor'
                ? 'bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>For Tutors</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'student'
                ? 'bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>For Students</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {/* FREE CARD */}
        <div className="h-full flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {activeTab === 'tutor' ? 'Free Tutor' : 'Free Student'}
              </h3>
              <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                Free Forever
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              {activeTab === 'tutor'
                ? 'Essential tools to test the platform and publish initial tuitions.'
                : 'Search and connect with verified mentors across Bangladesh.'}
            </p>

            <div className="mb-6">
              <span className="font-mono tabular-nums text-4xl font-bold text-slate-900 dark:text-slate-50">
                $0
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">/ month</span>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
              {activeTab === 'tutor' ? (
                <>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Up to 2 tuition posts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Standard tutor profile & bio</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Receive student application alerts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Standard support</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Up to 5 tuition bookmarks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Direct tuition applications</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Basic student profile</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Submit post-class reviews</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            {isAuthenticated && !isUserPro ? (
              <button
                type="button"
                disabled
                className="w-full inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold px-5 py-2.5 text-sm cursor-default"
              >
                Current Plan
              </button>
            ) : (
              <Link
                prefetch={false}
                href="/sign-up"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-5 py-2.5 text-sm transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        {/* PRO CARD */}
        <div className="h-full flex flex-col justify-between rounded-2xl border-2 border-teal-500 bg-white dark:bg-slate-900 p-8 shadow-lg relative">
          <div className="absolute -top-3.5 right-6 inline-flex items-center gap-1 rounded-full bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            Recommended
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {activeTab === 'tutor' ? 'Pro Tutor' : 'Pro Student'}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-3 py-1 text-xs font-bold uppercase">
                <Sparkles className="h-3 w-3" />
                PRO
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              {activeTab === 'tutor'
                ? 'Unlimited reach, verified credential badges, and prioritized tuition listings.'
                : 'Unlimited bookmarks, priority badge, and expedited application responses.'}
            </p>

            <div className="mb-6">
              <span className="font-mono tabular-nums text-4xl font-bold text-teal-600 dark:text-teal-400">
                ${activeTab === 'tutor' ? '15' : '10'}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">/ month</span>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
              {activeTab === 'tutor' ? (
                <>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Unlimited tuition posts
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Golden Verified PRO Badge</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Featured listings in search & homepage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>24/7 Priority tutor support</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Unlimited tuition bookmarks
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Golden Student PRO Badge</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Priority application status for mentors</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Priority student customer care</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            {isUserPro ? (
              <button
                type="button"
                disabled
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold px-5 py-2.5 text-sm cursor-default"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Active PRO Member</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={isUpgrading}
                onClick={() =>
                  handleUpgrade(activeTab, activeTab === 'tutor' ? 15 : 10)
                }
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-2.5 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99] disabled:opacity-50"
              >
                <span>{isUpgrading ? 'Redirecting to Checkout...' : 'Upgrade Now'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Comprehensive Feature Matrix
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare our Free and PRO tiers side by side.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <tr>
                <th className="py-4 px-6">Feature</th>
                <th className="py-4 px-6">Free Tier</th>
                <th className="py-4 px-6 text-teal-600 dark:text-teal-400">PRO Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-4 px-6 font-medium">Tuition Post Limit (Tutors)</td>
                <td className="py-4 px-6 font-mono">2 Tuitions</td>
                <td className="py-4 px-6 font-semibold text-teal-600 dark:text-teal-400">Unlimited</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium">Bookmark Limit (Students)</td>
                <td className="py-4 px-6 font-mono">5 Bookmarks</td>
                <td className="py-4 px-6 font-semibold text-teal-600 dark:text-teal-400">Unlimited</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium">Verified PRO Golden Badge</td>
                <td className="py-4 px-6 text-slate-400">No</td>
                <td className="py-4 px-6 text-emerald-600 dark:text-emerald-400 font-semibold">Included</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium">Search Ranking Priority</td>
                <td className="py-4 px-6 text-slate-400">Standard</td>
                <td className="py-4 px-6 text-emerald-600 dark:text-emerald-400 font-semibold">High Priority</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium">Application Response Visibility</td>
                <td className="py-4 px-6 text-slate-400">Standard</td>
                <td className="py-4 px-6 text-emerald-600 dark:text-emerald-400 font-semibold">Instant Alert</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium">Customer Support</td>
                <td className="py-4 px-6 text-slate-400">Standard Email</td>
                <td className="py-4 px-6 text-emerald-600 dark:text-emerald-400 font-semibold">24/7 Priority Support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
