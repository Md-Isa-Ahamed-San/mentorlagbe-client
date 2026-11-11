import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetcher } from '@/lib/api-fetcher';
import { Application } from '@/types';
import {
  createApplicationAction,
  cancelApplicationAction,
  updateApplicationStatusAction,
} from '@/actions/application.actions';
import { toast } from 'sonner';

export function useMyApplications() {
  return useQuery<Application[]>({
    queryKey: ['applications', 'student'],
    queryFn: () => apiFetcher<Application[]>('/applications/student'),
  });
}

export function useTutorApplicants() {
  return useQuery<Application[]>({
    queryKey: ['applications', 'tutor'],
    queryFn: () => apiFetcher<Application[]>('/applications/tutor'),
  });
}

export function useApplyTuition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplicationAction,
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Application submitted successfully!');
        queryClient.invalidateQueries({ queryKey: ['applications'] });
        queryClient.invalidateQueries({ queryKey: ['studentStats'] });
      } else {
        toast.error(result.message || 'Failed to submit application');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useCancelApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelApplicationAction(id),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Application cancelled successfully!');
        queryClient.invalidateQueries({ queryKey: ['applications'] });
        queryClient.invalidateQueries({ queryKey: ['studentStats'] });
      } else {
        toast.error(result.message || 'Failed to cancel application');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useRespondApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'accepted' | 'rejected' }) =>
      updateApplicationStatusAction(id, status),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Application status updated!');
        queryClient.invalidateQueries({ queryKey: ['applications'] });
        queryClient.invalidateQueries({ queryKey: ['tutorStats'] });
      } else {
        toast.error(result.message || 'Failed to update application');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
