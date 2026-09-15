export type ServiceCategory = 
  | 'smart-living'
  | 'power-energy'
  | 'security-access'
  | 'enterprise-telecom'
  | 'electronics-design';

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  specifications: string[];
  keyFeatures: string[];
  hardwareBrands: string[];
  basePriceEstimate: number; // in Nigerian Naira (NGN / ₦)
  currency: string;
  completionTimeline: string;
  hasTrainingCourse: boolean;
  trainingCourseId?: string;
  iconName: string;
  badge?: string;
  // Aliases for admin and legacy components
  title?: string;
  icon?: string;
  shortDescription?: string;
  detailedDescription?: string;
  typicalTimeline?: string;
}

export type BookingStatus = 
  | 'pending'
  | 'quote_sent'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'unpaid' | 'deposit_paid' | 'paid_in_full' | 'refunded';

export interface BookingTimelineEvent {
  id: string;
  status: BookingStatus;
  timestamp: string;
  note: string;
  author: string;
}

export interface ServiceBooking {
  id: string;
  referenceCode: string; // e.g. EBT-BK-2026-904
  customerName: string;
  email: string;
  phone: string;
  companyName?: string;
  address: string;
  city: string;
  stateOrRegion: string;
  serviceId: string;
  serviceName: string;
  premisesType: 'Residential Villa' | 'Apartment' | 'Commercial Office' | 'Hotel / Hospitality' | 'Industrial Facility' | 'Retail Space';
  urgency: 'standard' | 'priority' | 'emergency_24_7';
  preferredDate: string;
  preferredTimeSlot: 'morning' | 'afternoon' | 'evening';
  estimatedCost: number;
  notes?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  assignedTechnician?: {
    id: string;
    name: string;
    role: string;
    phone: string;
  };
  timeline: BookingTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface TrainingCohort {
  id: string;
  startDate: string;
  endDate: string;
  format: string;
  maxSeats: number;
  enrolledSeats: number;
  instructor: string;
  status: 'open' | 'filling_fast' | 'closed';
}

export interface TrainingCourse {
  id: string;
  title: string;
  code: string; // e.g. EBT-TRN-101
  category: ServiceCategory;
  level: 'Beginner / Foundation' | 'Intermediate / Field Tech' | 'Advanced / Lead Engineer' | 'Masterclass & Certification';
  durationWeeks: number;
  hoursPerWeek: number;
  tuitionFee: number;
  syllabus: any;
  prerequisites: any;
  certificationAwarded?: string;
  certificationTitle?: string;
  hardwareProvided?: string[];
  hardwareKitIncluded?: any;
  nextCohorts: TrainingCohort[];
  instructorName?: string;
  instructorRole?: string;
  description?: string;
}

export interface TrainingEnrollment {
  id: string;
  registrationNumber: string; // e.g. EBT-ENR-408
  studentName: string;
  email: string;
  phone: string;
  courseId: string;
  courseTitle: string;
  cohortId: string;
  cohortStartDate: string;
  format: string;
  tuitionFee: number;
  amountPaid: number;
  paymentPlan: 'full' | 'two_installments';
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  status: 'enrolled' | 'in_training' | 'completed' | 'deferred';
  certificateIssued: boolean;
  certificateId?: string;
  enrolledAt: string;
}

export interface Inquiry {
  id: string;
  referenceId: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  inquiryType: 'service_request' | 'training_admission' | 'corporate_partnership' | 'emergency_repair' | 'general';
  serviceInterest?: string;
  subject: string;
  message: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'in_progress' | 'responded' | 'converted';
  assignedTo?: string;
  adminNotes?: string;
  createdAt: string;
}

export type UserInquiry = Inquiry;

export interface EmailNotification {
  id: string;
  trackingId: string;
  recipientEmail: string;
  recipientName: string;
  type: 
    | 'booking_confirmation'
    | 'quote_dispatched'
    | 'technician_assigned'
    | 'payment_receipt'
    | 'training_enrollment'
    | 'schedule_reminder'
    | 'inquiry_response'
    | 'system_update';
  subject: string;
  htmlContent: string;
  textContent: string;
  status: 'sent' | 'delivered' | 'pending' | 'failed';
  dispatchedAt: string;
  metadata?: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: 'client' | 'agent' | 'bot';
  senderName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  channel: 'live_chat' | 'whatsapp';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'operations_manager' | 'lead_engineer' | 'academy_director' | 'support_specialist';
  roleTitle: string;
  avatar: string;
  permissions: {
    canManageBookings: boolean;
    canAssignTechnicians: boolean;
    canManageTraining: boolean;
    canIssueCertificates: boolean;
    canManageInquiries: boolean;
    canSendNotifications: boolean;
    canManagePayments: boolean;
    canManageUsers: boolean;
  };
  lastActive: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  servicesSupplied: string[];
  summary: string;
  highlights: string[];
  metrics: string;
  year: string;
  category: ServiceCategory;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  companyOrLocation: string;
  avatar: string;
  rating: number;
  serviceCategory: ServiceCategory;
  serviceOrCourse: string;
  content: string;
  verifiedProject: boolean;
  date: string;
}

export interface ProjectVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  category: ServiceCategory;
  clientOrLocation: string;
  description: string;
  duration?: string;
  tags: string[];
  dateAdded?: string;
  dateCompleted?: string;
  featured?: boolean;
  thumbnailUrl?: string;
}

