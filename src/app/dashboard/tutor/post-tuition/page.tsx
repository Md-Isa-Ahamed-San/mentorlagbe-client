'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTutorStats } from '@/hooks/useStats';
import { useCreateTuition } from '@/hooks/useTuitions';
import { uploadToCloudinary } from '@/lib/upload';
import { toast } from 'sonner';
import {
  Upload,
  Image as ImageIcon,
  Crown,
  AlertCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  DollarSign,
  MapPin,
  Calendar,
  Check,
} from 'lucide-react';

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Programming',
  'IELTS',
  'Accounting',
];

const CLASS_LEVELS = [
  'SSC',
  'HSC',
  'O-Level',
  'A-Level',
  'University',
  'Professional',
];

export default function PostTuitionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useTutorStats();
  const { mutateAsync: createTuition, isPending: isSubmitting } = useCreateTuition();

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [classLevel, setClassLevel] = useState(CLASS_LEVELS[0]);
  const [mode, setMode] = useState<'Online' | 'Offline'>('Online');
  const [location, setLocation] = useState('');
  const [monthlyFee, setMonthlyFee] = useState<string>('');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('3');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  // Free Plan Limit Check
  const isFreePlan = (stats?.plan || user?.plan || 'free') === 'free';
  const totalTuitions = stats?.totalTuitions ?? 0;
  const isLimitReached = isFreePlan && totalTuitions >= 2;

  // Handle Image Upload to ImgBB
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const displayUrl = await uploadToCloudinary(file);
      setBannerImage(displayUrl);
      toast.success('Banner image uploaded successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a tuition title');
      return;
    }

    const feeNum = Number(monthlyFee);
    if (!monthlyFee || isNaN(feeNum) || feeNum <= 0) {
      toast.error('Please enter a valid positive monthly fee');
      return;
    }

    if (mode === 'Offline' && !location.trim()) {
      toast.error('Please specify a location for offline tuition');
      return;
    }

    if (description.trim().length < 50) {
      toast.error(`Description must be at least 50 characters (currently ${description.trim().length})`);
      return;
    }

    const defaultFallbackImage =
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60';

    try {
      const res = await createTuition({
        title: title.trim(),
        subject,
        classLevel,
        mode,
        location: mode === 'Online' ? 'Online' : location.trim(),
        monthlyFee: feeNum,
        daysPerWeek: Number(daysPerWeek) || 3,
        description: description.trim(),
        bannerImage: bannerImage.trim() || defaultFallbackImage,
      });

      if (res.success) {
        router.push('/dashboard/tutor/my-tuitions');
      }
    } catch {
      // toast is already fired by mutation hook
    }
  };

  if (statsLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-60 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 h-96" />
      </div>
    );
  }

  // If free plan limit reached, show Upgrade Prompt
  if (isLimitReached) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Post a New Tuition
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create an engaging tuition post to connect with prospective students.
          </p>
        </div>

        <div className="rounded-3xl border border-amber-500/30 bg-white dark:bg-slate-900 p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-6">
            <Crown className="h-8 w-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Free Plan Limit Reached (2 / 2 Posts)
          </span>

          <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Ready to teach more students?
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Free accounts can publish up to 2 active tuition posts. Upgrade to <strong>MentorLagbe PRO</strong> to enjoy unlimited postings, verified tutor badge, and top-tier search visibility.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              prefetch={false}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99] w-full sm:w-auto"
            >
              <Crown className="h-4 w-4" />
              <span>Upgrade to Pro Plan</span>
            </Link>
            <Link
              href="/dashboard/tutor/my-tuitions"
              prefetch={false}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto"
            >
              <BookOpen className="h-4 w-4" />
              <span>Manage Existing Tuitions</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Post a New Tuition
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Fill in details about the subject, class level, mode, and fees. Tuitions will be reviewed by admin prior to publication.
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6"
      >
        {/* Tuition Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
            Tuition Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Master HSC Higher Mathematics & Calculus"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        {/* 2-col Subject & Class Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
              Subject <span className="text-rose-500">*</span>
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
              Class Level <span className="text-rose-500">*</span>
            </label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
            >
              {CLASS_LEVELS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mode Radio */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">
            Tuition Mode <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tuitionMode"
                value="Online"
                checked={mode === 'Online'}
                onChange={() => {
                  setMode('Online');
                  setLocation('Online');
                }}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Online (Zoom / Meet)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tuitionMode"
                value="Offline"
                checked={mode === 'Offline'}
                onChange={() => {
                  setMode('Offline');
                  setLocation('');
                }}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Offline (In-Person / Home Visit)
              </span>
            </label>
          </div>
        </div>

        {/* Location (conditional if Offline) */}
        {mode === 'Offline' && (
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
              Specific Location / Area <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Dhanmondi, Dhaka or Uttara Sector 4"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>
        )}

        {/* 2-col Monthly Fee & Days Per Week */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
              Monthly Fee ($ USD) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="number"
                min="1"
                step="1"
                required
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                placeholder="e.g., 150"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 pl-10 pr-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
              Days Per Week <span className="text-rose-500">*</span>
            </label>
            <select
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d}>
                  {d} {d === 1 ? 'day' : 'days'} / week
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Banner Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
            Banner Image
          </label>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="relative inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer transition-colors">
              <Upload className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span>{isUploading ? 'Uploading to ImgBB...' : 'Upload Image (ImgBB)'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                disabled={isUploading}
                className="sr-only"
              />
            </label>

            {bannerImage && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <Check className="h-3.5 w-3.5" />
                Image uploaded
              </span>
            )}
          </div>

          {/* Preview */}
          {bannerImage && (
            <div className="mt-3 relative aspect-[16/8] max-w-md overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
              <img
                src={bannerImage}
                alt="Banner preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200">
              Tuition Description <span className="text-rose-500">*</span>
            </label>
            <span
              className={`text-xs ${
                description.trim().length >= 50
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-400'
              }`}
            >
              {description.trim().length} / min 50 chars
            </span>
          </div>
          <textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what students will learn, your teaching methodology, prerequisites, and expected outcomes..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <Link
            href="/dashboard/tutor/my-tuitions"
            prefetch={false}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting || isUploading || description.trim().length < 50}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-6 py-2.5 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Submitting Tuition...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Submit Tuition Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
