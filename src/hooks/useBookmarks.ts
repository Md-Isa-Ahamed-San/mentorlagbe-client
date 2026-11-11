import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetcher } from '@/lib/api-fetcher';
import { Tuition } from '@/types';
import { toggleBookmarkAction } from '@/actions/bookmark.actions';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

export function useSavedTuitions() {
  const { isAuthenticated } = useAuth();

  return useQuery<Tuition[]>({
    queryKey: ['savedTuitions'],
    queryFn: () => apiFetcher<Tuition[]>('/users/saved-tuitions'),
    enabled: isAuthenticated,
  });
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: (tuitionId: string) => toggleBookmarkAction(tuitionId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Bookmarks updated');
        queryClient.invalidateQueries({ queryKey: ['savedTuitions'] });
        queryClient.invalidateQueries({ queryKey: ['tuitions'] });
        refreshUser();
      } else {
        toast.error(result.message || 'Failed to update bookmark');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
