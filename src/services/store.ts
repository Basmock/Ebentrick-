import {
  ServiceItem,
  TrainingCourse,
  ServiceBooking,
  TrainingEnrollment,
  Inquiry,
  EmailNotification,
  ChatMessage,
  AdminUser,
  BookingStatus,
  PaymentStatus,
  TestimonialItem,
  ProjectVideo
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_TRAINING_COURSES,
  INITIAL_BOOKINGS,
  INITIAL_ENROLLMENTS,
  INITIAL_INQUIRIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ADMIN_USERS,
  INITIAL_TESTIMONIALS,
  INITIAL_PROJECT_VIDEOS
} from '../data/mockData';
import { extractYouTubeId } from '../utils/youtube';

const STORAGE_KEYS = {
  SERVICES: 'ebentrick_services_v1',
  BOOKINGS: 'ebentrick_bookings_v1',
  ENROLLMENTS: 'ebentrick_enrollments_v1',
  INQUIRIES: 'ebentrick_inquiries_v1',
  NOTIFICATIONS: 'ebentrick_notifications_v1',
  CHAT_MESSAGES: 'ebentrick_chat_messages_v1',
  ADMIN_USERS: 'ebentrick_admin_users_v1',
  COURSES: 'ebentrick_courses_v1',
  TESTIMONIALS: 'ebentrick_testimonials_v1',
  VIDEOS: 'ebentrick_videos_v1',
};

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to persist to localStorage', err);
  }
}

// Global in-memory + local storage backed store
class AppStore {
  private services: ServiceItem[] = loadStorage<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  private courses: TrainingCourse[] = loadStorage<TrainingCourse[]>(STORAGE_KEYS.COURSES, INITIAL_TRAINING_COURSES);
  private bookings: ServiceBooking[] = loadStorage<ServiceBooking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  private enrollments: TrainingEnrollment[] = loadStorage<TrainingEnrollment[]>(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
  private inquiries: Inquiry[] = loadStorage<Inquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  private notifications: EmailNotification[] = loadStorage<EmailNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  private adminUsers: AdminUser[] = loadStorage<AdminUser[]>(STORAGE_KEYS.ADMIN_USERS, INITIAL_ADMIN_USERS);
  private testimonials: TestimonialItem[] = loadStorage<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  private videos: ProjectVideo[] = loadStorage<ProjectVideo[]>(STORAGE_KEYS.VIDEOS, INITIAL_PROJECT_VIDEOS);
  private chatMessages: ChatMessage[] = loadStorage<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES, [
    {
      id: 'msg-001',
      sessionId: 'sess-default',
      sender: 'bot',
      senderName: 'Ebentrick Concierge',
      message: 'Hello and welcome to Ebentrick Global Services! "Light makes the difference." How can we engineer your smart home, solar power, or technical training project today?',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      channel: 'live_chat'
    }
  ]);

  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // SERVICES
  public getServices(): ServiceItem[] {
    return [...this.services];
  }

  public getServiceById(id: string): ServiceItem | undefined {
    return this.services.find(s => s.id === id || s.slug === id);
  }

  public createService(serviceData: Omit<ServiceItem, 'id'>): ServiceItem {
    const id = `srv-${serviceData.slug || Date.now()}`;
    const newService: ServiceItem = {
      ...serviceData,
      id,
      currency: serviceData.currency || 'NGN',
      basePriceEstimate: Number(serviceData.basePriceEstimate) || 500000,
      specifications: serviceData.specifications?.length ? serviceData.specifications : ['Standard engineering specification'],
      keyFeatures: serviceData.keyFeatures?.length ? serviceData.keyFeatures : ['Certified engineering deployment'],
      hardwareBrands: serviceData.hardwareBrands?.length ? serviceData.hardwareBrands : ['Enterprise Certified']
    };

    this.services.unshift(newService);
    saveStorage(STORAGE_KEYS.SERVICES, this.services);
    this.notify();
    return newService;
  }

  public updateService(id: string, serviceData: Partial<ServiceItem>): ServiceItem {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Service not found');

    this.services[index] = {
      ...this.services[index],
      ...serviceData,
      id: this.services[index].id // preserve ID
    };

    saveStorage(STORAGE_KEYS.SERVICES, this.services);
    this.notify();
    return this.services[index];
  }

  public deleteService(id: string): void {
    this.services = this.services.filter(s => s.id !== id);
    saveStorage(STORAGE_KEYS.SERVICES, this.services);
    this.notify();
  }

  // TRAINING
  public getCourses(): TrainingCourse[] {
    return [...this.courses];
  }

  public getCourseById(id: string): TrainingCourse | undefined {
    return this.courses.find(c => c.id === id);
  }

  public createCourse(courseData: Omit<TrainingCourse, 'id'>): TrainingCourse {
    const id = `trn-${courseData.code?.toLowerCase().replace(/[^a-z0-9]/g, '-') || Date.now()}`;
    const newCourse: TrainingCourse = {
      ...courseData,
      id,
      tuitionFee: Number(courseData.tuitionFee) || 250000,
      durationWeeks: Number(courseData.durationWeeks) || 4,
      hoursPerWeek: Number(courseData.hoursPerWeek) || 12,
      syllabus: courseData.syllabus?.length ? courseData.syllabus : [
        {
          week: 1,
          moduleTitle: 'Foundation & Principles',
          description: 'Core concepts, engineering safety, and industry standard tools.',
          handsOnLab: 'Lab bench setup and component testing.'
        }
      ],
      prerequisites: courseData.prerequisites?.length ? courseData.prerequisites : ['Basic technical interest'],
      hardwareProvided: courseData.hardwareProvided?.length ? courseData.hardwareProvided : ['Ebentrick Starter Lab Kit'],
      nextCohorts: courseData.nextCohorts?.length ? courseData.nextCohorts : [
        {
          id: `coh-${Date.now()}`,
          startDate: 'Next Month',
          endDate: '4 Weeks Later',
          format: 'In-Person Hands-on Lab',
          maxSeats: 16,
          enrolledSeats: 0,
          instructor: courseData.instructorName || 'Engr. Gabriel Adebayo',
          status: 'open'
        }
      ]
    };

    this.courses.unshift(newCourse);
    saveStorage(STORAGE_KEYS.COURSES, this.courses);
    this.notify();
    return newCourse;
  }

  public updateCourse(id: string, courseData: Partial<TrainingCourse>): TrainingCourse {
    const index = this.courses.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Course not found');

    this.courses[index] = {
      ...this.courses[index],
      ...courseData,
      id: this.courses[index].id
    };

    saveStorage(STORAGE_KEYS.COURSES, this.courses);
    this.notify();
    return this.courses[index];
  }

  public deleteCourse(id: string): void {
    this.courses = this.courses.filter(c => c.id !== id);
    saveStorage(STORAGE_KEYS.COURSES, this.courses);
    this.notify();
  }

  // TESTIMONIALS
  public getTestimonials(): TestimonialItem[] {
    return [...this.testimonials];
  }

  public addTestimonial(data: Omit<TestimonialItem, 'id'>): TestimonialItem {
    const newTestimonial: TestimonialItem = {
      ...data,
      id: `test-${Date.now()}`
    };
    this.testimonials.unshift(newTestimonial);
    saveStorage(STORAGE_KEYS.TESTIMONIALS, this.testimonials);
    this.notify();
    return newTestimonial;
  }

  public deleteTestimonial(id: string): void {
    this.testimonials = this.testimonials.filter(t => t.id !== id);
    saveStorage(STORAGE_KEYS.TESTIMONIALS, this.testimonials);
    this.notify();
  }

  // PROJECT VIDEOS
  public getVideos(): ProjectVideo[] {
    return [...this.videos];
  }

  public addVideo(data: Omit<ProjectVideo, 'id' | 'youtubeId'> & { youtubeUrl: string; youtubeId?: string }): ProjectVideo {
    const youtubeId = data.youtubeId || extractYouTubeId(data.youtubeUrl) || 'dQw4w9WgXcQ';
    const newVideo: ProjectVideo = {
      ...data,
      id: `vid-${Date.now()}`,
      youtubeId,
      dateAdded: data.dateAdded || new Date().toISOString().split('T')[0]
    };
    this.videos.unshift(newVideo);
    saveStorage(STORAGE_KEYS.VIDEOS, this.videos);
    this.notify();
    return newVideo;
  }

  public updateVideo(id: string, data: Partial<ProjectVideo>): ProjectVideo {
    const index = this.videos.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Video not found');

    if (data.youtubeUrl && !data.youtubeId) {
      const extracted = extractYouTubeId(data.youtubeUrl);
      if (extracted) data.youtubeId = extracted;
    }

    this.videos[index] = {
      ...this.videos[index],
      ...data,
      id: this.videos[index].id
    };

    saveStorage(STORAGE_KEYS.VIDEOS, this.videos);
    this.notify();
    return this.videos[index];
  }

  public deleteVideo(id: string): void {
    this.videos = this.videos.filter(v => v.id !== id);
    saveStorage(STORAGE_KEYS.VIDEOS, this.videos);
    this.notify();
  }

  public getEnrollments(): TrainingEnrollment[] {
    return [...this.enrollments];
  }

  public enrollStudent(data: {
    studentName: string;
    email: string;
    phone: string;
    courseId: string;
    cohortId: string;
    paymentPlan: 'full' | 'two_installments';
  }): TrainingEnrollment {
    const course = this.getCourseById(data.courseId);
    if (!course) throw new Error('Course not found');
    const cohort = course.nextCohorts.find(c => c.id === data.cohortId) || course.nextCohorts[0];
    
    // Increment seat count in cohort
    cohort.enrolledSeats += 1;
    if (cohort.enrolledSeats >= cohort.maxSeats) {
      cohort.status = 'closed';
    } else if (cohort.enrolledSeats >= cohort.maxSeats * 0.75) {
      cohort.status = 'filling_fast';
    }

    const regNumber = `EBT-ENR-${Math.floor(100 + Math.random() * 900)}`;
    const fee = course.tuitionFee;
    const amountPaid = data.paymentPlan === 'full' ? fee : Math.round(fee / 2);

    const enrollment: TrainingEnrollment = {
      id: `enr-${Date.now()}`,
      registrationNumber: regNumber,
      studentName: data.studentName,
      email: data.email,
      phone: data.phone,
      courseId: course.id,
      courseTitle: course.title,
      cohortId: cohort.id,
      cohortStartDate: cohort.startDate,
      format: cohort.format,
      tuitionFee: fee,
      amountPaid,
      paymentPlan: data.paymentPlan,
      paymentStatus: data.paymentPlan === 'full' ? 'paid_in_full' : 'deposit_paid',
      paymentReference: `TRN-PAY-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'enrolled',
      certificateIssued: false,
      enrolledAt: new Date().toISOString()
    };

    this.enrollments.unshift(enrollment);
    saveStorage(STORAGE_KEYS.ENROLLMENTS, this.enrollments);
    saveStorage(STORAGE_KEYS.COURSES, this.courses);

    // Automated Admission Email Notification
    this.createEmailNotification({
      recipientEmail: enrollment.email,
      recipientName: enrollment.studentName,
      type: 'training_enrollment',
      subject: `Official Admission: ${course.title} (Reg: ${regNumber})`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 6px;">
            <h2 style="color: #ffffff; margin: 0;">EBENTRICK TECHNICAL ACADEMY</h2>
            <p style="color: #60a5fa; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">LIGHT MAKES THE DIFFERENCE</p>
          </div>
          <div style="padding: 24px 0;">
            <h3 style="color: #0f172a;">Cohort Admission Confirmed</h3>
            <p>Dear ${enrollment.studentName},</p>
            <p>Congratulations! You have been successfully registered for the <strong>${course.title}</strong> program.</p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #10b981; margin: 16px 0;">
              <p style="margin: 4px 0;"><strong>Student Reg Number:</strong> ${regNumber}</p>
              <p style="margin: 4px 0;"><strong>Cohort Start Date:</strong> ${cohort.startDate}</p>
              <p style="margin: 4px 0;"><strong>Format:</strong> ${cohort.format}</p>
              <p style="margin: 4px 0;"><strong>Lead Instructor:</strong> ${cohort.instructor}</p>
              <p style="margin: 4px 0;"><strong>Tuition Paid:</strong> ₦${amountPaid.toLocaleString()} NGN (${data.paymentPlan === 'full' ? 'Full Settlement' : 'First Installment'})</p>
            </div>
            <p>Your hardware lab workbench and course syllabus pack are reserved. Orientation details will follow.</p>
          </div>
        </div>
      `,
      textContent: `Admission Confirmed: ${enrollment.studentName} for ${course.title}. Reg: ${regNumber}. Starts ${cohort.startDate}.`,
      metadata: { enrollmentId: enrollment.id }
    });

    this.notify();
    return enrollment;
  }

  public updateEnrollmentStatus(
    enrollmentId: string, 
    status: TrainingEnrollment['status'], 
    certificateIssued?: boolean
  ): TrainingEnrollment {
    const enrollment = this.enrollments.find(e => e.id === enrollmentId);
    if (!enrollment) throw new Error('Enrollment not found');

    enrollment.status = status;
    if (typeof certificateIssued === 'boolean') {
      enrollment.certificateIssued = certificateIssued;
      if (certificateIssued && !enrollment.certificateId) {
        enrollment.certificateId = `CERT-EBT-${Math.floor(10000 + Math.random() * 90000)}`;
      }
    }

    saveStorage(STORAGE_KEYS.ENROLLMENTS, this.enrollments);
    this.notify();
    return enrollment;
  }

  public addCohort(courseId: string, cohortData: {
    startDate: string;
    endDate: string;
    format: string;
    maxSeats: number;
    instructor: string;
    status: 'open' | 'filling_fast' | 'closed';
  }) {
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Course not found');

    const newCohort = {
      id: `coh-${Date.now()}`,
      startDate: cohortData.startDate,
      endDate: cohortData.endDate,
      format: cohortData.format as any,
      maxSeats: cohortData.maxSeats,
      enrolledSeats: 0,
      instructor: cohortData.instructor,
      status: cohortData.status,
    };

    course.nextCohorts.push(newCohort);
    saveStorage(STORAGE_KEYS.COURSES, this.courses);
    this.notify();
    return newCohort;
  }

  // BOOKINGS
  public getBookings(): ServiceBooking[] {
    return [...this.bookings];
  }

  public getBookingById(id: string): ServiceBooking | undefined {
    return this.bookings.find(b => b.id === id || b.referenceCode === id);
  }

  public createBooking(data: {
    customerName: string;
    email: string;
    phone: string;
    companyName?: string;
    address: string;
    city: string;
    stateOrRegion: string;
    serviceId: string;
    premisesType: ServiceBooking['premisesType'];
    urgency: ServiceBooking['urgency'];
    preferredDate: string;
    preferredTimeSlot: ServiceBooking['preferredTimeSlot'];
    estimatedCost: number;
    notes?: string;
    paymentImmediate?: boolean;
  }): ServiceBooking {
    const service = this.getServiceById(data.serviceId);
    const serviceName = service ? service.name : 'Engineering & Automation Consultation';
    const refCode = `EBT-BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: ServiceBooking = {
      id: `bk-${Date.now()}`,
      referenceCode: refCode,
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      address: data.address,
      city: data.city,
      stateOrRegion: data.stateOrRegion,
      serviceId: data.serviceId,
      serviceName,
      premisesType: data.premisesType,
      urgency: data.urgency,
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot,
      estimatedCost: data.estimatedCost,
      notes: data.notes,
      status: data.paymentImmediate ? 'confirmed' : 'pending',
      paymentStatus: data.paymentImmediate ? 'paid_in_full' : 'unpaid',
      paymentReference: data.paymentImmediate ? `PAY-REF-${Math.floor(100000 + Math.random() * 900000)}` : undefined,
      timeline: [
        {
          id: `tm-${Date.now()}`,
          status: data.paymentImmediate ? 'confirmed' : 'pending',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          note: data.paymentImmediate 
            ? 'Booking placed with immediate online payment confirmed.' 
            : 'Service booking request submitted by client.',
          author: 'Customer Web Portal'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.bookings.unshift(newBooking);
    saveStorage(STORAGE_KEYS.BOOKINGS, this.bookings);

    // Automated Email Dispatch
    this.createEmailNotification({
      recipientEmail: newBooking.email,
      recipientName: newBooking.customerName,
      type: 'booking_confirmation',
      subject: `Booking Confirmed: Ebentrick ${serviceName} (Ref: ${refCode})`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 6px;">
            <h2 style="color: #ffffff; margin: 0;">EBENTRICK GLOBAL SERVICES</h2>
            <p style="color: #60a5fa; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">LIGHT MAKES THE DIFFERENCE</p>
          </div>
          <div style="padding: 24px 0;">
            <h3 style="color: #0f172a;">Service Booking Received</h3>
            <p>Dear ${newBooking.customerName},</p>
            <p>Thank you for engaging Ebentrick Global Services. Your engineering inquiry and booking <strong>${refCode}</strong> is logged in our central dispatch system.</p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 16px 0;">
              <p style="margin: 4px 0;"><strong>Service:</strong> ${serviceName}</p>
              <p style="margin: 4px 0;"><strong>Scheduled Date:</strong> ${newBooking.preferredDate} (${newBooking.preferredTimeSlot.toUpperCase()} slot)</p>
              <p style="margin: 4px 0;"><strong>Location:</strong> ${newBooking.address}, ${newBooking.city}</p>
              <p style="margin: 4px 0;"><strong>Estimated Investment:</strong> ₦${newBooking.estimatedCost.toLocaleString()} NGN</p>
              <p style="margin: 4px 0;"><strong>Status:</strong> ${newBooking.status.toUpperCase()} (${newBooking.paymentStatus.replace('_', ' ').toUpperCase()})</p>
            </div>
            <p>A certified field lead engineer will contact you shortly for technical verification. You can reply to this email or chat via our WhatsApp hotline.</p>
          </div>
        </div>
      `,
      textContent: `Booking Confirmed for ${newBooking.customerName}: ${serviceName} on ${newBooking.preferredDate}. Reference: ${refCode}`,
      metadata: { bookingId: newBooking.id }
    });

    this.notify();
    return newBooking;
  }

  public updateBookingStatus(
    bookingId: string, 
    newStatus: BookingStatus, 
    note = `Status updated to ${newStatus}`, 
    author = 'Operations Lead'
  ): ServiceBooking {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    booking.status = newStatus;
    booking.updatedAt = new Date().toISOString();
    booking.timeline.push({
      id: `tm-${Date.now()}`,
      status: newStatus,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      note,
      author
    });

    saveStorage(STORAGE_KEYS.BOOKINGS, this.bookings);

    // Automated update email
    this.createEmailNotification({
      recipientEmail: booking.email,
      recipientName: booking.customerName,
      type: 'system_update',
      subject: `Status Update: Booking ${booking.referenceCode} is now ${newStatus.replace('_', ' ').toUpperCase()}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 6px;">
            <h2 style="color: #ffffff; margin: 0;">EBENTRICK GLOBAL SERVICES</h2>
            <p style="color: #60a5fa; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">LIGHT MAKES THE DIFFERENCE</p>
          </div>
          <div style="padding: 24px 0;">
            <h3 style="color: #0f172a;">Service Status Update</h3>
            <p>Dear ${booking.customerName},</p>
            <p>Your service booking <strong>${booking.referenceCode}</strong> (${booking.serviceName}) has progressed to: <strong>${newStatus.replace('_', ' ').toUpperCase()}</strong>.</p>
            <p style="background: #f1f5f9; padding: 12px; border-radius: 4px;"><strong>Update Note:</strong> ${note}</p>
          </div>
        </div>
      `,
      textContent: `Status update for ${booking.referenceCode}: ${newStatus}. Note: ${note}`,
      metadata: { bookingId: booking.id, newStatus }
    });

    this.notify();
    return booking;
  }

  public assignTechnician(
    bookingId: string, 
    tech: { id: string; name: string; role: string; phone: string }
  ): ServiceBooking {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    booking.assignedTechnician = tech;
    booking.updatedAt = new Date().toISOString();
    booking.timeline.push({
      id: `tm-${Date.now()}`,
      status: booking.status,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      note: `Field technician assigned: ${tech.name} (${tech.role}). Contact: ${tech.phone}`,
      author: 'Operations Lead'
    });

    saveStorage(STORAGE_KEYS.BOOKINGS, this.bookings);

    // Automated dispatch notification
    this.createEmailNotification({
      recipientEmail: booking.email,
      recipientName: booking.customerName,
      type: 'technician_assigned',
      subject: `Engineer Assigned: ${tech.name} for Booking ${booking.referenceCode}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 6px;">
            <h2 style="color: #ffffff; margin: 0;">EBENTRICK GLOBAL SERVICES</h2>
          </div>
          <div style="padding: 24px 0;">
            <h3>Lead Engineer Dispatched</h3>
            <p>Dear ${booking.customerName},</p>
            <p><strong>${tech.name}</strong> (${tech.role}) has been assigned as the lead technical engineer for your ${booking.serviceName} deployment.</p>
            <p>You may contact the engineer directly at <strong>${tech.phone}</strong> for coordinate access or site specifics.</p>
          </div>
        </div>
      `,
      textContent: `Engineer ${tech.name} assigned to your booking ${booking.referenceCode}. Phone: ${tech.phone}`,
      metadata: { bookingId: booking.id }
    });

    this.notify();
    return booking;
  }

  public updatePaymentStatus(
    bookingId: string, 
    paymentStatus: PaymentStatus, 
    paymentReference?: string
  ): ServiceBooking {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    booking.paymentStatus = paymentStatus;
    if (paymentReference) {
      booking.paymentReference = paymentReference;
    }
    booking.updatedAt = new Date().toISOString();
    booking.timeline.push({
      id: `tm-${Date.now()}`,
      status: booking.status,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      note: `Payment status updated to ${paymentStatus.replace('_', ' ').toUpperCase()} (Ref: ${paymentReference || 'N/A'})`,
      author: 'Finance Gateway'
    });

    saveStorage(STORAGE_KEYS.BOOKINGS, this.bookings);
    this.notify();
    return booking;
  }

  // INQUIRIES
  public getInquiries(): Inquiry[] {
    return [...this.inquiries];
  }

  public submitInquiry(data: {
    fullName: string;
    email: string;
    phone: string;
    organization?: string;
    inquiryType: Inquiry['inquiryType'];
    serviceInterest?: string;
    subject: string;
    message: string;
    urgency?: Inquiry['urgency'];
  }): Inquiry {
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      referenceId: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      inquiryType: data.inquiryType,
      serviceInterest: data.serviceInterest,
      subject: data.subject,
      message: data.message,
      urgency: data.urgency || 'medium',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    this.inquiries.unshift(newInquiry);
    saveStorage(STORAGE_KEYS.INQUIRIES, this.inquiries);

    // Acknowledgment email
    this.createEmailNotification({
      recipientEmail: newInquiry.email,
      recipientName: newInquiry.fullName,
      type: 'inquiry_response',
      subject: `Inquiry Received: ${newInquiry.subject} (Ref: ${newInquiry.referenceId})`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 6px;">
            <h2 style="color: #ffffff; margin: 0;">EBENTRICK GLOBAL SERVICES</h2>
            <p style="color: #60a5fa; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">LIGHT MAKES THE DIFFERENCE</p>
          </div>
          <div style="padding: 24px 0;">
            <h3>Inquiry Logged</h3>
            <p>Dear ${newInquiry.fullName},</p>
            <p>Thank you for contacting Ebentrick Global Services. Your inquiry regarding <strong>"${newInquiry.serviceInterest || newInquiry.subject}"</strong> has been queued for our technical response team.</p>
            <p>Reference Ticket: <strong>${newInquiry.referenceId}</strong>. We typically respond within 30 minutes during working hours.</p>
          </div>
        </div>
      `,
      textContent: `Inquiry Received (${newInquiry.referenceId}): We have received your inquiry and will respond shortly.`,
      metadata: { inquiryId: newInquiry.id }
    });

    this.notify();
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status: Inquiry['status'], adminNotes?: string): Inquiry {
    const inquiry = this.inquiries.find(i => i.id === id);
    if (!inquiry) throw new Error('Inquiry not found');
    inquiry.status = status;
    if (adminNotes) inquiry.adminNotes = adminNotes;
    saveStorage(STORAGE_KEYS.INQUIRIES, this.inquiries);
    this.notify();
    return inquiry;
  }

  // NOTIFICATIONS
  public getNotifications(): EmailNotification[] {
    return [...this.notifications];
  }

  public getEmailNotifications(): EmailNotification[] {
    return [...this.notifications];
  }

  public createEmailNotification(data: Omit<EmailNotification, 'id' | 'trackingId' | 'dispatchedAt' | 'status'>): EmailNotification {
    const newNotif: EmailNotification = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      trackingId: `EML-TRK-${Math.floor(1000 + Math.random() * 9000)}`,
      recipientEmail: data.recipientEmail,
      recipientName: data.recipientName,
      type: data.type,
      subject: data.subject,
      htmlContent: data.htmlContent,
      textContent: data.textContent,
      status: 'delivered',
      dispatchedAt: new Date().toISOString(),
      metadata: data.metadata
    };

    this.notifications.unshift(newNotif);
    saveStorage(STORAGE_KEYS.NOTIFICATIONS, this.notifications);
    return newNotif;
  }

  // CHAT / MESSAGES
  public getChatMessages(): ChatMessage[] {
    return [...this.chatMessages];
  }

  public sendChatMessage(
    text: string, 
    sender: 'client' | 'agent' | 'bot' = 'client', 
    senderName = 'Client',
    channel: 'live_chat' | 'whatsapp' = 'live_chat'
  ): ChatMessage {
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sessionId: 'sess-default',
      sender,
      senderName,
      message: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      channel
    };

    this.chatMessages.push(msg);
    saveStorage(STORAGE_KEYS.CHAT_MESSAGES, this.chatMessages);

    // Auto-reply bot if client sent
    if (sender === 'client') {
      setTimeout(() => {
        const lower = text.toLowerCase();
        let reply = "Thank you for reaching out to Ebentrick Global Services! An engineer has been alerted and will join this live channel momentarily. For instant direct messaging, tap 'Chat via WhatsApp'.";
        
        if (lower.includes('solar') || lower.includes('inverter') || lower.includes('battery')) {
          reply = "Our Solar & Inverter engineers provide 3kVA to 50kVA+ hybrid installations with Tier-1 bifacial panels and LiFePO4 storage. Would you like a load calculation or site survey scheduled?";
        } else if (lower.includes('smart home') || lower.includes('automation') || lower.includes('curtain')) {
          reply = "Ebentrick specializes in Zigbee 3.0, Matter & KNX smart home installations with zero-latency local control. You can calculate a quote using our booking tool or schedule a consultation.";
        } else if (lower.includes('training') || lower.includes('course') || lower.includes('academy')) {
          reply = "Our technical training academy offers certified hands-on masterclasses in Smart Homes, Solar PV, CCTV AI, and ATS automation. Upcoming cohorts start next month with limited seats!";
        } else if (lower.includes('ats') || lower.includes('changeover') || lower.includes('generator')) {
          reply = "Ebentrick ATS systems offer zero-downtime automatic generator and solar power transfer switches with phase protection. We can deploy within 24-48 hours.";
        }

        const botMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sessionId: 'sess-default',
          sender: 'agent',
          senderName: 'Engr. Bassey (Ebentrick Dispatch)',
          message: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
          channel: 'live_chat'
        };
        this.chatMessages.push(botMsg);
        saveStorage(STORAGE_KEYS.CHAT_MESSAGES, this.chatMessages);
        this.notify();
      }, 1000);
    }

    this.notify();
    return msg;
  }

  // ADMIN & PERMISSIONS
  public getAdminUsers(): AdminUser[] {
    return [...this.adminUsers];
  }

  public updateAdminPermissions(userId: string, permissions: AdminUser['permissions']): void {
    const user = this.adminUsers.find(u => u.id === userId);
    if (!user) return;
    user.permissions = { ...permissions };
    saveStorage(STORAGE_KEYS.ADMIN_USERS, this.adminUsers);
    this.notify();
  }

  // ANALYTICS
  public getAnalytics() {
    const totalBookings = this.bookings.length;
    const pendingBookings = this.bookings.filter(b => b.status === 'pending').length;
    const completedBookings = this.bookings.filter(b => b.status === 'completed').length;
    const confirmedBookings = this.bookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress' || b.status === 'completed').length;
    
    const settledPayments = this.bookings.reduce((sum, b) => {
      if (b.paymentStatus === 'paid_in_full') return sum + b.estimatedCost;
      if (b.paymentStatus === 'deposit_paid') return sum + Math.round(b.estimatedCost * 0.7);
      return sum;
    }, 0) + this.enrollments.reduce((sum, e) => sum + e.amountPaid, 0);

    const totalRevenue = this.bookings.reduce((sum, b) => sum + b.estimatedCost, 0) + 
      this.enrollments.reduce((sum, e) => sum + e.tuitionFee, 0);

    const totalStudents = this.enrollments.length;
    const totalInquiries = this.inquiries.length;
    const openInquiries = this.inquiries.filter(i => i.status === 'new' || i.status === 'in_progress').length;

    const activeCohorts = this.courses.reduce((sum, c) => {
      return sum + c.nextCohorts.filter(co => co.status !== 'closed').length;
    }, 0);

    // Service category breakdown
    const categoryCount: Record<string, number> = {};
    this.bookings.forEach(b => {
      const srv = this.getServiceById(b.serviceId);
      const cat = srv ? srv.category : 'other';
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    return {
      totalBookings,
      pendingBookings,
      completedBookings,
      confirmedBookings,
      totalRevenue,
      settledPayments,
      totalStudents,
      totalTrainees: totalStudents,
      activeCohorts,
      totalInquiries,
      openInquiries,
      pendingInquiries: openInquiries,
      averageResponseMinutes: 14,
      systemUptimePercent: 99.94,
      categoryDistribution: categoryCount
    };
  }

  // WhatsApp Link Helper
  public getWhatsAppUrl(customMessage?: string): string {
    const defaultText = customMessage || "Hello Ebentrick Global Services! I saw your services online (Light Makes The Difference). I would like to make an inquiry about your smart automation and technical training.";
    const encoded = encodeURIComponent(defaultText);
    // Corporate WhatsApp hotline number
    return `https://wa.me/2348032458901?text=${encoded}`;
  }
}

export const appStore = new AppStore();
