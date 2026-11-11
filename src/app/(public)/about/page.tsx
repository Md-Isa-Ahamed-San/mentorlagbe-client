'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import {
  GraduationCap,
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Zap,
  Search,
} from 'lucide-react';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const steps = [
    {
      step: '01',
      title: 'Create Your Account',
      description:
        'Sign up in under 60 seconds as a Student looking for mentors, or as an academic Tutor eager to post tuition batches.',
      icon: Users,
    },
    {
      step: '02',
      title: 'Browse & Discover',
      description:
        'Filter verified postings across Bangladesh by syllabus (SSC, HSC, Cambridge, Edexcel, University), subject, and location.',
      icon: Search,
    },
    {
      step: '03',
      title: 'Apply & Schedule',
      description:
        'Students submit applications specifying preferred timing slots and syllabus notes. Tutors accept or respond directly.',
      icon: Zap,
    },
    {
      step: '04',
      title: 'Learn & Review',
      description:
        'Commence personalized online or in-person sessions. After completing tuition batches, students rate and review their tutors.',
      icon: Award,
    },
  ];

  const faqs = [
    {
      question: 'How does MentorLagbe verify tutors?',
      answer:
        'All tutors who submit tuition postings undergo an administrative verification process where credentials, university affiliations, and subject backgrounds are reviewed before tuitions are approved for public visibility.',
    },
    {
      question: 'Is MentorLagbe free to use?',
      answer:
        'Yes! Students can browse tuitions and apply for free, and tutors can post up to 2 tuitions on the Starter plan. Upgrading to MentorLagbe Pro unlocks unlimited postings, bookmarks, golden badges, and priority search visibility.',
    },
    {
      question: 'Can I choose between online and in-person tuitions?',
      answer:
        'Absolutely. Tutors clearly list their tuition delivery mode—either flexible Online sessions or In-Person offline tutoring with detailed neighborhood and district locations.',
    },
    {
      question: 'How do student reviews work?',
      answer:
        'To maintain honest, high-integrity feedback, only students whose applications have been officially accepted by the tutor can submit ratings and reviews for that specific tuition.',
    },
    {
      question: 'How does the Pro subscription billing work?',
      answer:
        'Pro subscriptions are billed monthly via our secure Stripe checkout. You can upgrade, manage your subscription, and view transaction receipts directly from your dashboard at any time.',
    },
  ];

  const values = [
    {
      title: 'Academic Integrity',
      description:
        'We vet educators rigorously so parents and students can learn with absolute trust and transparency.',
      icon: ShieldCheck,
    },
    {
      title: 'Equal Opportunity',
      description:
        'Bridging the geographical divide by enabling top mentors from capital universities to teach students in any district online.',
      icon: Target,
    },
    {
      title: 'Empowering Mentors',
      description:
        'Enabling university scholars and professional educators to share their knowledge, earn fair honorariums, and build teaching careers.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
      {/* HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300 border border-teal-500/20">
          About MentorLagbe
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
          Connecting Bangladesh’s Ambitious Students with{' '}
          <span className="text-teal-600 dark:text-teal-400">Exceptional Mentors</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Founded with a simple yet ambitious vision: to make quality, verified tuition and mentorship
          accessible to every student across Bangladesh, from primary school to university levels.
        </p>
      </section>

      {/* MISSION SECTION */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 lg:p-16 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Our Educational Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Personalized Mentorship That Transforms Academic Potential
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              In traditional classrooms, students often struggle to get individual feedback tailored to their
              pace. Meanwhile, passionate educators from premier institutions (BUET, Dhaka University, Medical
              Colleges) seek avenues to share their deep conceptual knowledge.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              MentorLagbe closes that gap. We provide a transparent platform where credentials are verified,
              schedules are organized, and learning milestones are achieved together.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-6 text-center">
              <p className="font-mono tabular-nums text-3xl font-bold text-teal-600 dark:text-teal-400">
                2,500+
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verified Tutors</p>
            </div>
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-6 text-center">
              <p className="font-mono tabular-nums text-3xl font-bold text-slate-900 dark:text-slate-100">
                15,000+
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Students Enrolled</p>
            </div>
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-6 text-center">
              <p className="font-mono tabular-nums text-3xl font-bold text-slate-900 dark:text-slate-100">
                64
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Districts Covered</p>
            </div>
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-6 text-center">
              <p className="font-mono tabular-nums text-3xl font-bold text-teal-600 dark:text-teal-400">
                98%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Positive Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="space-y-10">
        <SectionHeading
          center
          eyebrow="What We Stand For"
          title="Our Guiding Principles"
          subtitle="Every feature and policy on MentorLagbe is designed with student safety, educational excellence, and educator respect at the center."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs space-y-4"
              >
                <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS: EXPANDED 4 STEPS */}
      <section className="space-y-10">
        <SectionHeading
          center
          eyebrow="Workflow"
          title="How MentorLagbe Works"
          subtitle="A clear, structured path from your initial search to your first completed tuition batch."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono tabular-nums text-xs font-bold rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 px-3 py-1">
                      {s.step}
                    </span>
                    <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-2">
                    {s.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ SECTION (ACCORDION) */}
      <section className="space-y-8 max-w-3xl mx-auto">
        <SectionHeading
          center
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about finding tutors, posting tuitions, and managing subscriptions."
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-teal-600 dark:text-teal-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-3xl border border-teal-500/30 bg-teal-500/10 dark:bg-teal-950/20 p-8 sm:p-12 lg:p-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Join MentorLagbe Today
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Whether you want to accelerate your academic results or share your expertise with learners
            nationwide, your journey starts here.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              prefetch={false}
              href="/sign-up"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-6 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              prefetch={false}
              href="/tuitions"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-6 py-3 text-sm transition-colors"
            >
              <span>Browse Tuitions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
