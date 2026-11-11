'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTuitionDetails, useAddReview } from '@/hooks/useTuitions';
import { useMyApplications, useApplyTuition } from '@/hooks/useApplications';
import { useToggleBookmark } from '@/hooks/useBookmarks';
import { useAuth } from '@/lib/auth-context';
import { formatCurrency, formatDate, getAverageRating } from '@/lib/utils';
import StarRating from '@/components/StarRating';
import {
  MapPin,
  Globe,
  Calendar,
  Clock,
  User as UserIcon,
  CheckCircle,
  AlertCircle,
  Bookmark,
  Share2,
  ChevronLeft,
  X,
  Send,
  MessageSquare,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

export default function TuitionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { user, isAuthenticated } = useAuth();
  const { data: tuition, isLoading, error } = useTuitionDetails(id);
  const { data: myApplications } = useMyApplications();
  const { mutate: applyTuition, isPending: isApplying } = useApplyTuition();
  const { mutate: addReview, isPending: isSubmittingReview } = useAddReview();
  const { mutate: toggleBookmark, isPending: isBookmarking } = useToggleBookmark();

  // Apply Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [studentPhone, setStudentPhone] = useState(user?.phone || '');
  const [preferredSchedule, setPreferredSchedule] = useState('Flexible');
  const [studentNote, setStudentNote] = useState('');

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const isBookmarked = Boolean(user?.savedTuitions?.includes(id));
  const isStudent = user?.role === 'student';
  const isTutorOrAdmin = user?.role === 'tutor' || user?.role === 'admin';

  // Check application status for current student
  const myApp = myApplications?.find((app) => app.tuitionId === id);
  const hasApplied = Boolean(myApp);
  const isAccepted = myApp?.status === 'accepted';

  // Check if student already left a review
  const hasReviewed = Boolean(
    tuition?.reviews?.some((r) => r.studentEmail === user?.email)
  );

  const avgRating = getAverageRating(tuition?.reviews);
  const reviewCount = tuition?.reviews?.length || 0;

  const handleBookmarkToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save tuitions');
      return;
    }
    toggleBookmark(id);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentPhone.trim()) {
      toast.error('Please provide a contact phone number');
      return;
    }

    applyTuition(
      {
        tuitionId: id,
        studentPhone: studentPhone.trim(),
        preferredSchedule,
        studentNote: studentNote.trim(),
      },
      {
        onSuccess: (result) => {
          if (result.success) {
            setIsApplyModalOpen(false);
            setStudentNote('');
          }
        },
      }
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Please write a review comment');
      return;
    }

    addReview(
      {
        tuitionId: id,
        review: {
          rating: newRating,
          comment: newComment.trim(),
        },
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            setNewComment('');
          }
        },
      }
    );
  };

  // Skeleton loading layout
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
          <div className="lg:col-span-8 space-y-6">
            <div className="aspect-[16/9] w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  // Error / Not found
  if (error || !tuition) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Tuition Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The tuition posting you are looking for may have been removed or is pending approval.
        </p>
        <div className="mt-6">
          <Link
            prefetch={false}
            href="/tuitions"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Tuitions</span>
          </Link>
        </div>
      </div>
    );
  }

  const isOnline = tuition.mode?.toLowerCase() === 'online';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Back breadcrumb */}
      <div className="mb-6">
        <Link
          prefetch={false}
          href="/tuitions"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to All Tuitions</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Main content & reviews */}
        <div className="lg:col-span-8 space-y-8">
          {/* Banner Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-xs">
            <img
              src={
                tuition.bannerImage ||
                'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80'
              }
              alt={tuition.title}
              className="h-full w-full object-cover"
            />
            {/* Overlay Mode badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {isOnline ? (
                  <>
                    <Globe className="h-3.5 w-3.5 text-teal-400" />
                    <span>Online Session</span>
                  </>
                ) : (
                  <>
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span>In-Person: {tuition.location || 'Offline'}</span>
                  </>
                )}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share tuition"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-md backdrop-blur-sm hover:scale-105 transition-transform"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleBookmarkToggle}
                disabled={isBookmarking}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark tuition'}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-md backdrop-blur-sm hover:scale-105 transition-transform"
              >
                <Bookmark
                  className={`h-4 w-4 ${
                    isBookmarked
                      ? 'fill-teal-600 text-teal-600 dark:fill-teal-400 dark:text-teal-400'
                      : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Heading info */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-700 dark:text-teal-300 border border-teal-500/20">
                {tuition.subject}
              </span>
              <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                Class {tuition.classLevel}
              </span>
              {tuition.approvalStatus === 'approved' && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-xs font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Tuition
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {tuition.title}
            </h1>

            {/* Quick meta row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <UserIcon className="h-4 w-4 text-slate-400" />
                <span>Mentor: </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {tuition.tutorName}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                <span>Schedule: </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {tuition.daysPerWeek} days / week
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>Posted: </span>
                <span>{formatDate(tuition.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
              About This Tuition
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {tuition.description}
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  Student Reviews & Feedback
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Real experiences from accepted tuition attendees.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono tabular-nums text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {avgRating > 0 ? avgRating.toFixed(1) : '0.0'}
                </span>
                <div>
                  <StarRating rating={avgRating} size="sm" />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              </div>
            </div>

            {/* If user is accepted student and hasn't reviewed yet: show form */}
            {isStudent && isAccepted && !hasReviewed && (
              <form
                onSubmit={handleReviewSubmit}
                className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-4 sm:p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <span>Leave a Review</span>
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Rating:</span>
                    <StarRating
                      rating={newRating}
                      interactive
                      onChange={(r) => setNewRating(r)}
                      size="md"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience with this tutor's teaching style, communication, and punctuality..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 text-xs transition-colors shadow-xs disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{isSubmittingReview ? 'Submitting...' : 'Post Review'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Note if user already reviewed */}
            {isStudent && hasReviewed && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>You have already submitted a review for this tuition.</span>
              </div>
            )}

            {/* Review List */}
            {tuition.reviews && tuition.reviews.length > 0 ? (
              <div className="space-y-4">
                {tuition.reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 flex items-center justify-center text-xs font-bold uppercase">
                          {rev.studentName ? rev.studentName.charAt(0) : 'S'}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {rev.studentName || 'Student'}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            {formatDate(rev.createdAt)}
                          </span>
                        </div>
                      </div>
                      <StarRating rating={rev.rating} size="sm" />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
                No reviews yet. Accepted students will be able to share feedback after their classes.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md space-y-6">
            {/* Fee Box */}
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                Monthly Tuition Fee
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-mono tabular-nums text-3xl font-bold text-slate-900 dark:text-slate-50">
                  {formatCurrency(tuition.monthlyFee)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/ month</span>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Subject</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {tuition.subject}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Class Level</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Class {tuition.classLevel}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Delivery Mode</span>
                <span
                  className={`font-semibold ${
                    isOnline
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {tuition.mode}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Location</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {tuition.location || 'Online Session'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Weekly Classes</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono">
                  {tuition.daysPerWeek} days / week
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Status</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold capitalize">
                  {tuition.approvalStatus}
                </span>
              </div>
            </div>

            {/* Tutor Profile Summary */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Tuition Mentor
              </span>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {tuition.tutorName ? tuition.tutorName.charAt(0) : 'T'}
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50 truncate">
                    {tuition.tutorName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {tuition.tutorEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA / Application Logic */}
            <div className="pt-2">
              {!isAuthenticated && (
                <div className="space-y-2">
                  <Link
                    prefetch={false}
                    href={`/sign-in?redirect=/tuitions/${id}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-3 text-sm transition-all shadow-xs"
                  >
                    <span>Sign In to Apply</span>
                  </Link>
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                    Students must log in to submit application requests.
                  </p>
                </div>
              )}

              {isAuthenticated && isStudent && (
                <>
                  {hasApplied ? (
                    <div className="space-y-2">
                      <button
                        type="button"
                        disabled
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold px-5 py-3 text-sm cursor-not-allowed opacity-90"
                      >
                        <Check className="h-4 w-4" />
                        <span>Already Applied ({myApp?.status})</span>
                      </button>
                      <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                        Check application status on your{' '}
                        <Link
                          prefetch={false}
                          href="/dashboard/student/my-applications"
                          className="text-teal-600 dark:text-teal-400 underline font-medium"
                        >
                          Dashboard
                        </Link>
                        .
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-3 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99]"
                    >
                      <span>Apply Now</span>
                    </button>
                  )}
                </>
              )}

              {isAuthenticated && isTutorOrAdmin && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-center text-xs font-medium text-amber-700 dark:text-amber-400">
                  Only students can apply for tuitions.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* APPLY MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-1">
              Apply for Tuition
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Send your application details directly to {tuition.tutorName}.
            </p>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Tuition
                </label>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-medium">
                  {tuition.title} ({tuition.subject} — Class {tuition.classLevel})
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  placeholder="+880 1700-000000"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Preferred Schedule
                </label>
                <select
                  value={preferredSchedule}
                  onChange={(e) => setPreferredSchedule(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
                >
                  <option value="Morning">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="Evening">Evening (4:00 PM - 8:00 PM)</option>
                  <option value="Flexible">Flexible / Discuss with Tutor</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Notes for the Mentor (Optional)
                </label>
                <textarea
                  rows={3}
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  placeholder="Share your current syllabus, target exam, specific chapters needing assistance..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isApplying}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-2.5 text-xs transition-all duration-200 shadow-xs disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isApplying ? 'Submitting Application...' : 'Confirm Application'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
