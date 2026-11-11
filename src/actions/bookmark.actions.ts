'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ActionResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('mentorlagbe-token')?.value;
}

export async function toggleBookmarkAction(tuitionId: string): Promise<ActionResponse<{ savedTuitions: string[] }>> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/users/bookmarks`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({ tuitionId }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to toggle bookmark');
    revalidatePath('/dashboard/student/bookmarks');
    revalidatePath('/tuitions');
    revalidatePath(`/tuitions/${tuitionId}`);
    return {
      success: true,
      data: result,
      message: result.message || 'Bookmark updated successfully!',
    };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to toggle bookmark' };
  }
}
