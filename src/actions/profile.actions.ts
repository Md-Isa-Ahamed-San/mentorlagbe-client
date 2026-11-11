'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ActionResponse, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('mentorlagbe-token')?.value;
}

export async function updateProfileAction(data: {
  name?: string;
  phone?: string;
  bio?: string;
  image?: string;
}): Promise<ActionResponse<User>> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update profile');
    revalidatePath('/dashboard/profile');
    revalidatePath('/dashboard/student');
    revalidatePath('/dashboard/tutor');
    return {
      success: true,
      data: result.user || result,
      message: 'Profile updated successfully!',
    };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update profile' };
  }
}
