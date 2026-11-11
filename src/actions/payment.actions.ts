'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ActionResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('mentorlagbe-token')?.value;
}

export async function createStripeCheckoutAction(data: {
  planName: string;
  amount: number;
  userEmail: string;
  userName: string;
  userRole: string;
}): Promise<ActionResponse<{ url: string }>> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/payments/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to create Stripe checkout session');
    return {
      success: true,
      url: result.url,
      data: result,
      message: 'Checkout session created successfully',
    };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to initiate checkout' };
  }
}

export async function verifyStripeSessionAction(sessionId: string): Promise<ActionResponse> {
  try {
    const token = await getToken();
    const res = await fetch(`${API_URL}/payments/verify-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({ sessionId }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Payment verification failed');
    revalidatePath('/dashboard/student');
    revalidatePath('/dashboard/tutor');
    revalidatePath('/dashboard/admin/transactions');
    return {
      success: true,
      data: result,
      message: result.message || 'Payment verified successfully!',
    };
  } catch (error: any) {
    return { success: false, message: error.message || 'Payment verification failed' };
  }
}
