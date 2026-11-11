'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useUpdateProfile } from '@/hooks/useProfile';
import { uploadToCloudinary } from '@/lib/upload';
import { toast } from 'sonner';
import {
  User as UserIcon,
  Mail,
  Phone,
  FileText,
  Upload,
  Crown,
  Shield,
  GraduationCap,
  Save,
  Check,
  Sparkles,
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateProfile();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [image, setImage] = useState(user?.image || '');
  const [isUploading, setIsUploading] = useState(false);

  // Sync state if user context updates
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setBio(user.bio || '');
      setImage(user.image || '');
    }
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setImage(displayUrl);
      toast.success('Avatar uploaded successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload avatar image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Full name cannot be empty');
      return;
    }

    try {
      await updateProfile({
        name: name.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        image: image.trim(),
      });
    } catch {
      // toast is handled by useUpdateProfile hook
    }
  };

  if (!user) {
    return null;
  }

  const role = user.role || 'student';
  const plan = user.plan || 'free';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Account Profile
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update your public bio, profile avatar, and verified contact numbers.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-8"
      >
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <img
              src={
                image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=0d9488&color=fff`
              }
              alt={name || 'Profile Avatar'}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-teal-500/20 shadow-md"
            />
            {plan === 'pro' && (
              <div
                title="PRO Subscriber"
                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-md ring-2 ring-white dark:ring-slate-900"
              >
                <Crown className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Profile Photo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Upload a clear portrait to build trust with students and guardians. Supports PNG, JPG, or WebP.
            </p>

            <div className="pt-1">
              <label className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 cursor-pointer transition-colors">
                <Upload className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                <span>{isUploading ? 'Uploading to ImgBB...' : 'Upload New Avatar'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Read-only Role and Plan Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4 border border-slate-200/80 dark:border-slate-800">
          <div>
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
              Account Role
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              {role === 'admin' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-bold text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  <Shield className="h-3.5 w-3.5" />
                  Admin
                </span>
              )}
              {role === 'tutor' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-bold text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Tutor
                </span>
              )}
              {role === 'student' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <UserIcon className="h-3.5 w-3.5" />
                  Student
                </span>
              )}
            </div>
          </div>

          <div>
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
              Subscription Plan
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              {plan === 'pro' ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Crown className="h-3.5 w-3.5" />
                  PRO Member
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-slate-500/10 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-500/20">
                  FREE Plan
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
              Email Address <span className="text-xs text-slate-400 font-normal">(Non-editable)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                readOnly
                disabled
                value={user.email || ''}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/30 pl-10 pr-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed select-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1700-000000"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5">
              Bio / Academic Background
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others about your university, major, teaching experience, or study goals..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving || isUploading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-6 py-2.5 text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Saving Profile...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
