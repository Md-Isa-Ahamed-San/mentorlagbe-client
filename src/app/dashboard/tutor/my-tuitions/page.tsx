'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  useMyTuitions,
  useUpdateTuition,
  useDeleteTuition,
  useToggleTuitionActive,
} from '@/hooks/useTuitions';
import { Tuition } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import { formatCurrency, cn } from '@/lib/utils';
import { uploadToCloudinary } from '@/lib/upload';
import { toast } from 'sonner';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Power,
  X,
  Upload,
  Check,
  AlertTriangle,
  Globe,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
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

export default function MyTuitionsPage() {
  const { data: tuitions, isLoading } = useMyTuitions();
  const { mutateAsync: updateTuition, isPending: isUpdating } = useUpdateTuition();
  const { mutate: deleteTuition, isPending: isDeleting } = useDeleteTuition();
  const { mutate: toggleActive, isPending: isToggling } = useToggleTuitionActive();

  // Modal States
  const [editingTuition, setEditingTuition] = useState<Tuition | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Edit Form Fields
  const [editTitle, setEditTitle] = useState('');
  const [editSubject, setEditSubject] = useState(SUBJECTS[0]);
  const [editClassLevel, setEditClassLevel] = useState(CLASS_LEVELS[0]);
  const [editMode, setEditMode] = useState<'Online' | 'Offline'>('Online');
  const [editLocation, setEditLocation] = useState('');
  const [editMonthlyFee, setEditMonthlyFee] = useState<string>('');
  const [editDaysPerWeek, setEditDaysPerWeek] = useState<string>('3');
  const [editDescription, setEditDescription] = useState('');
  const [editBannerImage, setEditBannerImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const openEditModal = (tuition: Tuition) => {
    setEditingTuition(tuition);
    setEditTitle(tuition.title || '');
    setEditSubject(tuition.subject || SUBJECTS[0]);
    setEditClassLevel(tuition.classLevel || CLASS_LEVELS[0]);
    setEditMode(tuition.mode === 'Offline' ? 'Offline' : 'Online');
    setEditLocation(tuition.location || (tuition.mode === 'Offline' ? '' : 'Online'));
    setEditMonthlyFee(String(tuition.monthlyFee || ''));
    setEditDaysPerWeek(String(tuition.daysPerWeek || '3'));
    setEditDescription(tuition.description || '');
    setEditBannerImage(tuition.bannerImage || (tuition as any).image || '');
  };

  const closeEditModal = () => {
    setEditingTuition(null);
  };

  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WebP)');
      return;
    }

    setIsUploading(true);
    try {
      const displayUrl = await uploadToCloudinary(file);
      setEditBannerImage(displayUrl);
      toast.success('New banner image uploaded!');
    } catch (err: any) {
      toast.error(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTuition) return;

    const feeNum = Number(editMonthlyFee);
    if (!editMonthlyFee || isNaN(feeNum) || feeNum <= 0) {
      toast.error('Please enter a valid monthly fee');
      return;
    }

    if (editMode === 'Offline' && !editLocation.trim()) {
      toast.error('Location is required for offline tuition');
      return;
    }

    if (editDescription.trim().length < 50) {
      toast.error('Description must be at least 50 characters');
      return;
    }

    try {
      await updateTuition({
        id: editingTuition._id,
        data: {
          title: editTitle.trim(),
          subject: editSubject,
          classLevel: editClassLevel,
          mode: editMode,
          location: editMode === 'Online' ? 'Online' : editLocation.trim(),
          monthlyFee: feeNum,
          daysPerWeek: Number(editDaysPerWeek) || 3,
          description: editDescription.trim(),
          bannerImage: editBannerImage.trim(),
          image: editBannerImage.trim(),
        } as any,
      });

      closeEditModal();
    } catch {
      // toast is triggered by mutation hook
    }
  };

  const handleDelete = (id: string) => {
    deleteTuition(id, {
      onSettled: () => setDeleteConfirmId(null),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-72 rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
          </div>
          <div className="h-10 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 w-full rounded-xl bg-slate-100 dark:bg-slate-800/40" />
          ))}
        </div>
      </div>
    );
  }

  const list = tuitions || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            My Tuitions
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your created tuition listings, toggle availability, or make updates.
          </p>
        </div>

        <Link
          href="/dashboard/tutor/post-tuition"
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-4 py-2.5 text-sm transition-all shadow-xs active:scale-[0.99] w-fit"
        >
          <Plus className="h-4 w-4" />
          <span>Post New Tuition</span>
        </Link>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Delete Tuition Post?
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Are you sure you want to permanently delete this tuition? All associated applicant references will be removed.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={isDeleting}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition-colors shadow-xs disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tuition Modal */}
      {editingTuition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative my-8 w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Edit Tuition Post
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Update details for: {editingTuition.title}
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateSubmit} className="mt-5 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Subject
                  </label>
                  <select
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Class Level
                  </label>
                  <select
                    value={editClassLevel}
                    onChange={(e) => setEditClassLevel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden"
                  >
                    {CLASS_LEVELS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Mode
                  </label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="editMode"
                        value="Online"
                        checked={editMode === 'Online'}
                        onChange={() => {
                          setEditMode('Online');
                          setEditLocation('Online');
                        }}
                      />
                      <span>Online</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="editMode"
                        value="Offline"
                        checked={editMode === 'Offline'}
                        onChange={() => {
                          setEditMode('Offline');
                          setEditLocation('');
                        }}
                      />
                      <span>Offline</span>
                    </label>
                  </div>
                </div>

                {editMode === 'Offline' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      placeholder="e.g. Dhanmondi, Dhaka"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Monthly Fee ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editMonthlyFee}
                    onChange={(e) => setEditMonthlyFee(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Days Per Week
                  </label>
                  <select
                    value={editDaysPerWeek}
                    onChange={(e) => setEditDaysPerWeek(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                      <option key={d} value={d}>{d} days / week</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Banner Image Change */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Banner Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors">
                    <Upload className="h-3.5 w-3.5 text-teal-600" />
                    <span>{isUploading ? 'Uploading...' : 'Replace Image (ImgBB)'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      disabled={isUploading}
                      className="sr-only"
                    />
                  </label>

                  {editBannerImage && (
                    <img
                      src={editBannerImage}
                      alt="Banner thumbnail"
                      className="h-10 w-16 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Description ({editDescription.trim().length} chars, min 50)
                </label>
                <textarea
                  rows={4}
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isUpdating}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating || isUploading || editDescription.trim().length < 50}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-2 text-sm transition-all shadow-xs disabled:opacity-50"
                >
                  {isUpdating ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tuition Listing Grid/Table */}
      {list.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-4">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No tuitions created yet
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            You haven't posted any tuitions yet. Create your first offering to start getting student applicants!
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/tutor/post-tuition"
              prefetch={false}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold px-5 py-2.5 text-sm transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              <span>Post Your First Tuition</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Tuition</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Subject & Level</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Monthly Fee</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Approval Status</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Active Status</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {list.map((tuition) => {
                  const img =
                    tuition.bannerImage ||
                    (tuition as any).image ||
                    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60';

                  return (
                    <tr
                      key={tuition._id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={img}
                            alt={tuition.title}
                            className="h-12 w-16 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                          />
                          <div className="min-w-0 max-w-xs">
                            <Link
                              href={`/tuitions/${tuition._id}`}
                              prefetch={false}
                              className="font-bold text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors truncate block"
                            >
                              {tuition.title}
                            </Link>
                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              {tuition.mode === 'Online' ? (
                                <Globe className="h-3 w-3 text-teal-500" />
                              ) : (
                                <MapPin className="h-3 w-3 text-amber-500" />
                              )}
                              <span>{tuition.location || tuition.mode}</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="inline-flex items-center rounded-md bg-teal-500/10 px-2 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
                            {tuition.subject}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Class {tuition.classLevel}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                        {formatCurrency(tuition.monthlyFee)}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={tuition.approvalStatus} />
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => toggleActive(tuition._id)}
                          disabled={isToggling}
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all border',
                            tuition.isActive
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 hover:bg-slate-500/20'
                          )}
                          title="Click to toggle Active/Closed status"
                        >
                          <Power className="h-3 w-3" />
                          <span>{tuition.isActive ? 'Active' : 'Closed'}</span>
                        </button>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/tuitions/${tuition._id}`}
                            prefetch={false}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-500/10 transition-colors"
                            title="Preview Public Page"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => openEditModal(tuition)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-500/10 transition-colors"
                            title="Edit Tuition"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(tuition._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                            title="Delete Tuition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
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
