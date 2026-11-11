'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ActionResponse, Tuition, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('mentorlagbe-token')?.value;
}

export async function updateUserRoleAction(
  id: string,
  role: 'student' | 'tutor' | 'admin'
): Promise<ActionResponse<User>> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/admin/users/${id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({ role }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update user role');
    revalidatePath('/dashboard/admin/users');
    revalidatePath('/dashboard/admin');
    return { success: true, data: result.user || result, message: 'User role updated successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update user role' };
  }
}

export async function moderateTuitionAction(
  id: string,
  approvalStatus: 'pending' | 'approved' | 'rejected'
): Promise<ActionResponse<Tuition>> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/admin/tuitions/${id}/moderate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({ approvalStatus }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to moderate tuition');
    revalidatePath('/tuitions');
    revalidatePath('/dashboard/admin/tuitions');
    revalidatePath('/dashboard/admin');
    return { success: true, data: result.tuition || result, message: `Tuition ${approvalStatus} successfully!` };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to moderate tuition' };
  }
}
