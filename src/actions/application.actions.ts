'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ActionResponse, Application } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('mentorlagbe-token')?.value;
}

export async function createApplicationAction(data: {
  tuitionId: string;
  studentPhone?: string;
  preferredSchedule?: string;
  studentNote?: string;
}): Promise<ActionResponse<Application>> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to submit application');
    revalidatePath('/dashboard/student/my-applications');
    revalidatePath('/dashboard/tutor/applicants');
    return { success: true, data: result.application || result, message: 'Application submitted successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to submit application' };
  }
}

export async function cancelApplicationAction(id: string): Promise<ActionResponse> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/applications/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to cancel application');
    revalidatePath('/dashboard/student/my-applications');
    revalidatePath('/dashboard/tutor/applicants');
    return { success: true, message: 'Application cancelled successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to cancel application' };
  }
}

export async function updateApplicationStatusAction(
  id: string,
  status: 'pending' | 'accepted' | 'rejected'
): Promise<ActionResponse<Application>> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update application status');
    revalidatePath('/dashboard/student/my-applications');
    revalidatePath('/dashboard/tutor/applicants');
    return { success: true, data: result.application || result, message: `Application ${status} successfully!` };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update application status' };
  }
}
