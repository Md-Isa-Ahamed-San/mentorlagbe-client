import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetcher } from '@/lib/api-fetcher';
import { TuitionsResponse, TuitionFilters, Tuition } from '@/types';
import {
  createTuitionAction,
  updateTuitionAction,
  deleteTuitionAction,
  toggleTuitionStatusAction,
  addTuitionReviewAction,
} from '@/actions/tuition.actions';
import { toast } from 'sonner';

export function useTuitions(filters: TuitionFilters = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.subject && filters.subject !== 'All') params.set('subject', filters.subject);
  if (filters.classLevel && filters.classLevel !== 'All') params.set('classLevel', filters.classLevel);
  if (filters.mode && filters.mode !== 'All') params.set('mode', filters.mode);
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));

  return useQuery<TuitionsResponse>({
    queryKey: ['tuitions', filters],
    queryFn: () => apiFetcher<TuitionsResponse>(`/tuitions?${params.toString()}`),
  });
}

export function useFeaturedTuitions() {
  return useQuery<Tuition[]>({
    queryKey: ['tuitions', 'featured'],
    queryFn: () => apiFetcher<Tuition[]>('/tuitions/featured'),
  });
}

export function useMyTuitions() {
  return useQuery<Tuition[]>({
    queryKey: ['tuitions', 'my-tuitions'],
    queryFn: () => apiFetcher<Tuition[]>('/tuitions/my-tuitions'),
  });
}

export function useTuitionDetails(id: string) {
  return useQuery<Tuition>({
    queryKey: ['tuition', id],
    queryFn: () => apiFetcher<Tuition>(`/tuitions/${id}`),
    enabled: !!id,
  });
}

export function useCreateTuition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTuitionAction,
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Tuition created successfully!');
        queryClient.invalidateQueries({ queryKey: ['tuitions'] });
        queryClient.invalidateQueries({ queryKey: ['tutorStats'] });
      } else {
        toast.error(result.message || 'Failed to create tuition');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUpdateTuition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Tuition> }) =>
      updateTuitionAction(id, data),
    onSuccess: (result, variables) => {
      if (result.success) {
        toast.success(result.message || 'Tuition updated successfully!');
        queryClient.invalidateQueries({ queryKey: ['tuitions'] });
        queryClient.invalidateQueries({ queryKey: ['tuition', variables.id] });
      } else {
        toast.error(result.message || 'Failed to update tuition');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteTuition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTuitionAction(id),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Tuition deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['tuitions'] });
        queryClient.invalidateQueries({ queryKey: ['tutorStats'] });
      } else {
        toast.error(result.message || 'Failed to delete tuition');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useToggleTuitionActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleTuitionStatusAction(id),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Status updated successfully!');
        queryClient.invalidateQueries({ queryKey: ['tuitions'] });
        queryClient.invalidateQueries({ queryKey: ['tutorStats'] });
      } else {
        toast.error(result.message || 'Failed to update status');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useAddReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tuitionId,
      review,
    }: {
      tuitionId: string;
      review: { rating: number; comment: string };
    }) => addTuitionReviewAction(tuitionId, review),
    onSuccess: (result, variables) => {
      if (result.success) {
        toast.success(result.message || 'Review added successfully!');
        queryClient.invalidateQueries({ queryKey: ['tuition', variables.tuitionId] });
      } else {
        toast.error(result.message || 'Failed to add review');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
