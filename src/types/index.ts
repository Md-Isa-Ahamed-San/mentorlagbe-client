export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: 'student' | 'tutor' | 'admin';
  phone: string;
  bio: string;
  plan: 'free' | 'pro';
  savedTuitions: string[];
  createdAt: string;
}

export interface Review {
  studentName: string;
  studentEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Tuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: 'Online' | 'Offline';
  location: string;
  monthlyFee: number;
  daysPerWeek: number | string;
  bannerImage: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  isActive: boolean;
  reviews: Review[];
  createdAt: string;
}

export interface TuitionsResponse {
  tuitions: Tuition[];
  total: number;
  page: number;
  totalPages: number;
}

export interface Application {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  tutorName: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface Payment {
  _id: string;
  userEmail: string;
  userName: string;
  userRole: 'student' | 'tutor' | 'admin';
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paymentStatus: 'paid';
  paidAt: string;
}

export interface StudentStats {
  totalApplied: number;
  accepted: number;
  pending: number;
  rejected: number;
  plan: string;
}

export interface TutorStats {
  totalTuitions: number;
  activeTuitions: number;
  totalApplicants: number;
  plan: string;
  applicantsPerTuition: {
    tuitionId: string;
    title: string;
    subject: string;
    applicantsCount: number;
  }[];
}

export interface AdminStats {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  pendingTuitions: number;
  approvedTuitions: number;
  rejectedTuitions: number;
  totalRevenue: number;
}

export interface TuitionFilters {
  search?: string;
  subject?: string;
  classLevel?: string;
  mode?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface ActionResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  url?: string;
}
