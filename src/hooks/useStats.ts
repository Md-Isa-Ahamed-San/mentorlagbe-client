import { useQuery } from '@tanstack/react-query';
import { apiFetcher } from '@/lib/api-fetcher';
import { StudentStats, TutorStats } from '@/types';

export function useStudentStats() {
  return useQuery<StudentStats>({
    queryKey: ['studentStats'],
    queryFn: () => apiFetcher<StudentStats>('/stats/student'),
  });
}

export function useTutorStats() {
  return useQuery<TutorStats>({
    queryKey: ['tutorStats'],
    queryFn: () => apiFetcher<TutorStats>('/stats/tutor'),
  });
}
