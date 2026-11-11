import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileAction } from '@/actions/profile.actions';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: (data: { name?: string; phone?: string; bio?: string; image?: string }) =>
      updateProfileAction(data),
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(result.message || 'Profile updated successfully!');
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
        await refreshUser();
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
