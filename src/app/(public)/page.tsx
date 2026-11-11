'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFeaturedTuitions } from '@/hooks/useTuitions';
import TuitionCard from '@/components/TuitionCard';
import SectionHeading from '@/components/SectionHeading';
import StarRating from '@/components/StarRating';
import {
  Search,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Shield,
  Zap,
  Code,
  Calculator,
  Atom,
  Languages,
  DollarSign,
  Compass,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: featuredTuitions, isLoading } = useFeaturedTuitions();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tuitions?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/tuitions');
    }
  };

  const topSubjects = [
    { name: 'Mathematics', icon: Calculator, count: '120+ Tuitions' },
    { name: 'Physics', icon: Atom, count: '85+ Tuitions' },
    { name: 'Programming', icon: Code, count: '95+ Tuitions' },
    { name: 'IELTS', icon: Languages, count: '60+ Tuitions' },
    { name: 'Chemistry', icon: Compass, count: '70+ Tuitions' },
    { name: 'Accounting', icon: DollarSign, count: '45+ Tuitions' },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description:
        'Sign up as a Student to find mentors or as a Tutor to offer your academic expertise.',
      icon: Users,
    },
    {
      number: '02',
      title: 'Browse & Discover',
      description:
        'Explore verified tuitions filtered by subject, class level, location, and learning mode.',
      icon: Search,
    },
    {
      number: '03',
      title: 'Apply & Connect',
      description:
        'Submit applications with your preferred schedule and communicate directly with tutors.',
      icon: Zap,
    },
    {
      number: '04',
      title: 'Start Learning',
      description:
        'Begin your personalized tuition sessions and achieve your academic goals with confidence.',
      icon: Award,
    },
  ];

  const stats = [
    { label: 'Active Tutors', value: '500+', icon: GraduationCap },
    { label: 'Happy Students', value: '2,000+', icon: Users },
    { label: 'Approved Tuitions', value: '1,000+', icon: BookOpen },
    { label: 'Success Rate', value: '98%', icon: TrendingUp },
  ];

  const testimonials = [
    {
      name: 'Tanvir Ahmed',
      role: 'HSC Candidate, Dhaka College',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      quote:
        'MentorLagbe helped me find a BUET mathematics mentor within two days. The direct scheduling and verified tutor badges made the entire process safe and effortless.',
    },
    {
      name: 'Nusrat Jahan',
      role: 'IELTS Student, Score 8.0',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      quote:
        'I needed focused writing and speaking practice for IELTS. My mentor provided structured feedback, and I managed to increase my overall band from 6.5 to 8.0!',
    },
    {
      name: 'Rakin Hasan',
      role: 'Computer Science Undergrad',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      quote:
        'As a programming mentor, MentorLagbe Pro gave my tuition posts premium visibility. Managing applicant requests from the dashboard is extremely smooth.',
    },
  ];

  return (
    <div className="space-y-24 lg:space-y-32 pb-20">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & Search */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="lg:col-span-7 space-y-8"
            >
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300 border border-teal-500/20">
                  <Sparkles className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                  Bangladesh’s Premier Tuition Marketplace
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15]"
              >
                Find Your Ideal Tutor or{' '}
                <span className="text-teal-600 dark:text-teal-400">
                  Mentorship Batch
                </span>{' '}
                Today
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed"
              >
                Connect with verified tutors for personalized learning in Mathematics, Physics,
                Programming, IELTS & more across Bangladesh.
              </motion.p>

              {/* Search Bar */}
              <motion.form
                variants={itemVariants}
                onSubmit={handleSearchSubmit}
                className="p-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md flex flex-col sm:flex-row items-center gap-2 max-w-xl"
              >
                <div className="flex items-center gap-3 px-3 w-full sm:flex-1">
                  <Search className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by subject, class level, or keyword..."
                    className="w-full bg-transparent py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-6 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md shrink-0"
                >
                  <span>Search Tuitions</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.form>

              {/* Trust Metrics */}
              <motion.div
                variants={itemVariants}
                className="pt-2 grid grid-cols-3 gap-4 border-t border-slate-200/80 dark:border-slate-800/80 max-w-lg"
              >
                <div>
                  <p className="font-mono tabular-nums text-2xl font-bold text-slate-900 dark:text-slate-50">
                    2,500+
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Verified Tutors</p>
                </div>
                <div>
                  <p className="font-mono tabular-nums text-2xl font-bold text-slate-900 dark:text-slate-50">
                    15,000+
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Active Students</p>
                </div>
                <div>
                  <p className="font-mono tabular-nums text-2xl font-bold text-slate-900 dark:text-slate-50">
                    98%
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Satisfaction</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Abstract Teal Visual Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                {/* Abstract decorative backdrop shapes */}
                <div className="absolute inset-0 rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-3xl" />
                <div className="absolute w-72 h-72 rounded-full border border-teal-500/20 dark:border-teal-400/20 animate-pulse" />
                <div className="absolute w-56 h-56 rounded-full border-2 border-dashed border-teal-500/30 dark:border-teal-400/30" />

                {/* Central Card Graphic */}
                <div className="relative z-10 w-80 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                        Top Rated Mentor
                      </p>
                      <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                        Verified BUET Graduate
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Subjects</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        Math & Physics
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Class Level</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        HSC / A-Level
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Batch Rate</span>
                      <span className="font-mono tabular-nums font-bold text-teal-600 dark:text-teal-400">
                        $120 / month
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <StarRating rating={5} size="sm" showNumber />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold">
                      <CheckCircle className="h-3 w-3" />
                      Approved
                    </span>
                  </div>
                </div>

                {/* Floating mini badge */}
                <div className="absolute -bottom-2 -left-2 z-20 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 shadow-lg flex items-center gap-2.5">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    New requests live
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED TUITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Featured Tuitions"
            title="Latest Approved Tuitions"
            subtitle="Discover top-rated home and online tuition opportunities verified by academic administrators."
          />
          <Link
            prefetch={false}
            href="/tuitions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors shrink-0"
          >
            <span>Browse All Tuitions</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs animate-pulse flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full rounded-xl bg-slate-200 dark:bg-slate-800 mb-4" />
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-3" />
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Tuitions Grid */}
        {!isLoading && featuredTuitions && featuredTuitions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {featuredTuitions.slice(0, 6).map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>
        )}

        {/* Empty state fallback */}
        {!isLoading && (!featuredTuitions || featuredTuitions.length === 0) && (
          <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
            <BookOpen className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No featured tuitions yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Check back soon or explore our comprehensive catalog.
            </p>
            <div className="mt-5">
              <Link
                prefetch={false}
                href="/tuitions"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
              >
                Explore All Tuitions
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3: PRICING / SUBSCRIPTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Pricing"
          title="Choose Your Plan"
          subtitle="Simple, transparent plans designed for committed students and ambitious academic tutors."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* FREE PLAN */}
          <div className="h-full flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  Starter Plan
                </h3>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Free Forever
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Perfect for students and tutors looking to test the platform.
              </p>

              <div className="mb-6">
                <span className="font-mono tabular-nums text-4xl font-bold text-slate-900 dark:text-slate-50">
                  $0
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">/ month</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>Up to 2 tuition posts (Tutor)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>Up to 5 tuition bookmarks (Student)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>Direct tuition applications</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>Basic profile & search filters</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                prefetch={false}
                href="/sign-up"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-5 py-2.5 text-sm transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="h-full flex flex-col justify-between rounded-2xl border-2 border-teal-500 bg-white dark:bg-slate-900 p-8 shadow-md relative">
            <div className="absolute -top-3.5 right-6 inline-flex items-center gap-1 rounded-full bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Recommended
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  MentorLagbe PRO
                </h3>
                <span className="rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-3 py-1 text-xs font-semibold">
                  PRO Badge
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Unlimited reach, verified credential badges, and priority matching.
              </p>

              <div className="mb-6 flex items-baseline gap-2">
                <div>
                  <span className="font-mono tabular-nums text-4xl font-bold text-teal-600 dark:text-teal-400">
                    $15
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-sans">
                    /mo for Tutors
                  </span>
                </div>
                <span className="text-slate-400 text-sm">or</span>
                <div>
                  <span className="font-mono tabular-nums text-2xl font-bold text-slate-800 dark:text-slate-200">
                    $10
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-sans">
                    /mo for Students
                  </span>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    Unlimited tuition posts & bookmarks
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>Golden PRO verification badge</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>Priority listing in search & category filters</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>Priority applicant notifications & reviews</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                prefetch={false}
                href="/pricing"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-2.5 text-sm transition-all duration-200 shadow-xs hover:shadow-md"
              >
                <span>Upgrade to Pro</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW MENTORLAGBE WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="How It Works"
          title="Start Learning in 4 Easy Steps"
          subtitle="From profile setup to your first live session, we make connecting with verified mentors seamless."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="h-full flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs relative group hover:border-teal-500/40 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono tabular-nums text-xs font-bold rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 px-3 py-1">
                      Step {step.number}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: TOP SUBJECTS + STATS + TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Part A: Popular Subjects */}
        <div>
          <SectionHeading
            eyebrow="Top Categories"
            title="Popular Subjects"
            subtitle="Browse vetted mentors across key academic fields, STEM tracks, and professional language programs."
          />

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topSubjects.map((sub) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={sub.name}
                  prefetch={false}
                  href={`/tuitions?subject=${encodeURIComponent(sub.name)}`}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 text-center shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all group flex flex-col items-center justify-center"
                >
                  <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {sub.name}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {sub.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Part B: Platform Stats */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 lg:p-12 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="h-10 w-10 mx-auto rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-mono tabular-nums text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part C: Testimonials */}
        <div>
          <SectionHeading
            center
            eyebrow="Student Feedback"
            title="Trusted by Thousands Across Bangladesh"
            subtitle="Read real stories from students and mentors accelerating their learning on MentorLagbe."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="h-full flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs"
              >
                <div>
                  <div className="mb-4">
                    <StarRating rating={t.rating} size="sm" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border border-teal-500/20"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-50">
                      {t.name}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-teal-500/30 bg-teal-500/10 dark:bg-teal-950/20 p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600/10 dark:bg-teal-400/10 px-3.5 py-1 text-xs font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
              Get Started Today
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
              Ready to Start Your Learning Journey?
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Join thousands of students and tutors across Bangladesh. Post tuitions, discover top
              academic mentors, and take the next step.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                prefetch={false}
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-6 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99]"
              >
                <span>Join as Student</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                prefetch={false}
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-6 py-3 text-sm transition-colors"
              >
                <span>Join as Tutor</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
