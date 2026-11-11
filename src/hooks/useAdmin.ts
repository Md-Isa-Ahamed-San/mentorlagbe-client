import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetcher } from '@/lib/api-fetcher';
import { AdminStats, User, Tuition, Payment } from '@/types';
import { updateUserRoleAction, moderateTuitionAction } from '@/actions/admin.actions';
import { toast } from 'sonner';

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ['admin', 'stats'],
    queryFn: () => apiFetcher<AdminStats>('/admin/stats'),
  });
}

export function useAdminUsers(search?: string) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);

  return useQuery<User[]>({
    queryKey: ['admin', 'users', search],
    queryFn: () => apiFetcher<User[]>(`/admin/users?${params.toString()}`),
  });
}

export function useAdminTuitions() {
  return useQuery<Tuition[]>({
    queryKey: ['admin', 'tuitions'],
    queryFn: () => apiFetcher<Tuition[]>('/admin/tuitions'),
  });
}

export function useAdminTransactions() {
  return useQuery<Payment[]>({
    queryKey: ['admin', 'transactions'],
    queryFn: () => apiFetcher<Payment[]>('/admin/transactions'),
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: 'student' | 'tutor' | 'admin' }) =>
      updateUserRoleAction(id, role),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'User role updated!');
        queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
        queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      } else {
        toast.error(result.message || 'Failed to update user role');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useModerateTuition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      approvalStatus,
    }: {
      id: string;
      approvalStatus: 'approved' | 'rejected' | 'pending';
    }) => moderateTuitionAction(id, approvalStatus),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Tuition moderated!');
        queryClient.invalidateQueries({ queryKey: ['admin', 'tuitions'] });
        queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
        queryClient.invalidateQueries({ queryKey: ['tuitions'] });
      } else {
        toast.error(result.message || 'Failed to moderate tuition');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
