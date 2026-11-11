'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ActionResponse, Tuition } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('mentorlagbe-token')?.value;
}

export async function createTuitionAction(data: {
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  monthlyFee: number;
  daysPerWeek: number | string;
  bannerImage: string;
  description: string;
}): Promise<ActionResponse<Tuition>> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/tuitions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to create tuition');
    revalidatePath('/tuitions');
    revalidatePath('/dashboard/tutor/my-tuitions');
    return { success: true, data: result.tuition || result, message: 'Tuition created successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to create tuition' };
  }
}

export async function updateTuitionAction(
  id: string,
  data: Partial<Tuition>
): Promise<ActionResponse<Tuition>> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/tuitions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update tuition');
    revalidatePath('/tuitions');
    revalidatePath(`/tuitions/${id}`);
    revalidatePath('/dashboard/tutor/my-tuitions');
    return { success: true, data: result.tuition || result, message: 'Tuition updated successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update tuition' };
  }
}

export async function deleteTuitionAction(id: string): Promise<ActionResponse> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/tuitions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to delete tuition');
    revalidatePath('/tuitions');
    revalidatePath('/dashboard/tutor/my-tuitions');
    return { success: true, message: 'Tuition deleted successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to delete tuition' };
  }
}

export async function toggleTuitionStatusAction(id: string): Promise<ActionResponse> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/tuitions/${id}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to toggle status');
    revalidatePath('/tuitions');
    revalidatePath('/dashboard/tutor/my-tuitions');
    return { success: true, data: result, message: 'Tuition status updated!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to toggle status' };
  }
}

export async function addTuitionReviewAction(
  tuitionId: string,
  review: { rating: number; comment: string }
): Promise<ActionResponse> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/tuitions/${tuitionId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify(review),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to add review');
    revalidatePath(`/tuitions/${tuitionId}`);
    return { success: true, data: result, message: 'Review added successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to add review' };
  }
}
