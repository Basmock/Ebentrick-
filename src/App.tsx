import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { TrainingAcademy } from './components/TrainingAcademy';
import { BookingModal } from './components/BookingModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { PaymentModal } from './components/PaymentModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AuthModal } from './components/AuthModal';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ProjectVideoGallery } from './components/ProjectVideoGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppChatWidget } from './components/WhatsAppChatWidget';
import { AdminDashboard } from './components/AdminDashboard';
import { appStore } from './services/store';
import { 
  ServiceItem, 
  ServiceBooking, 
  TrainingEnrollment, 
  TrainingCourse,
  ProjectVideo,
  TestimonialItem
} from './types';

export default function App() {
  // Navigation & View State
  const [isAdminView, setIsAdminView] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'training' | 'projects' | 'videos' | 'testimonials' | 'contact' | 'admin'>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Store data
  const [services, setServices] = useState<ServiceItem[]>(appStore.getServices());
  const [courses, setCourses] = useState<TrainingCourse[]>(appStore.getCourses());
  const [videos, setVideos] = useState<ProjectVideo[]>(appStore.getVideos());
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(appStore.getTestimonials());

  // Modal States
  const [selectedServiceForSpecs, setSelectedServiceForSpecs] = useState<ServiceItem | null>(null);
  
  // Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);

  // Enrollment Modal
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  const [enrollmentCourseId, setEnrollmentCourseId] = useState<string>(courses[0]?.id || 'smart-home-course');
  const [enrollmentCohortId, setEnrollmentCohortId] = useState<string | undefined>(undefined);

  // Payment Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<{
    amount: number;
    description: string;
    referenceId: string;
    referenceCode: string;
    customerEmail: string;
    customerName: string;
  } | null>(null);

  // Invoice Modal
  const [invoiceData, setInvoiceData] = useState<any | null>(null);

  // Authentication Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const unsub = appStore.subscribe(() => {
      setServices(appStore.getServices());
      setCourses(appStore.getCourses());
      setVideos(appStore.getVideos());
      setTestimonials(appStore.getTestimonials());
    });
    return unsub;
  }, []);

  // Handlers for Services
  const handleOpenSpecs = (service: ServiceItem) => {
    setSelectedServiceForSpecs(service);
  };

  const handleStartBooking = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleNavigate = (view: 'home' | 'services' | 'training' | 'projects' | 'videos' | 'testimonials' | 'contact' | 'admin') => {
    if (view === 'admin') {
      setIsAdminView(true);
      return;
    }
    setIsAdminView(false);
    setCurrentView(view);
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const elem = document.getElementById(`${view}-section`);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleViewTraining = (courseId?: string) => {
    if (courseId) {
      setEnrollmentCourseId(courseId);
    }
    const elem = document.getElementById('training-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handlers for Enrollment
  const handleStartEnrollment = (courseId: string, cohortId?: string) => {
    setEnrollmentCourseId(courseId);
    setEnrollmentCohortId(cohortId);
    setIsEnrollmentModalOpen(true);
  };

  // When a booking completes
  const handleBookingSuccess = (booking: ServiceBooking, triggerPayment: boolean) => {
    setIsBookingModalOpen(false);

    if (triggerPayment) {
      setPaymentData({
        amount: booking.estimatedCost,
        description: `Deployment Booking: ${booking.serviceName} (${booking.premisesType})`,
        referenceId: booking.id,
        referenceCode: booking.referenceCode,
        customerEmail: booking.email,
        customerName: booking.customerName,
      });
      setIsPaymentModalOpen(true);
    } else {
      // Build and show the formal invoice/quote document immediately
      buildAndShowInvoiceForBooking(booking);
    }
  };

  // When an enrollment completes
  const handleEnrollmentSuccess = (enrollment: TrainingEnrollment, triggerPayment: boolean) => {
    setIsEnrollmentModalOpen(false);
    const amountToPay = enrollment.paymentPlan === 'full' 
      ? enrollment.tuitionFee 
      : Math.round(enrollment.tuitionFee / 2);

    if (triggerPayment) {
      setPaymentData({
        amount: amountToPay,
        description: `Academy Tuition: ${enrollment.courseTitle} (${enrollment.paymentPlan.replace('_', ' ')})`,
        referenceId: enrollment.id,
        referenceCode: enrollment.registrationNumber,
        customerEmail: enrollment.email,
        customerName: enrollment.studentName,
      });
      setIsPaymentModalOpen(true);
    }
  };

  // When payment is processed
  const handlePaymentComplete = (paymentRef: string) => {
    if (!paymentData) return;

    // Check if this reference is a booking or enrollment
    const booking = appStore.getBookingById(paymentData.referenceId);
    if (booking) {
      appStore.updateBookingStatus(booking.id, 'confirmed', `Online payment verified (${paymentRef})`, 'Payment Gateway');
    }

    // Refresh invoice data to show paid status
    if (booking) {
      buildAndShowInvoiceForBooking(booking, paymentRef);
    }
  };

  // Build invoice data from a booking
  const buildAndShowInvoiceForBooking = (booking: ServiceBooking, paymentRef?: string) => {
    const subtotal = Math.round(booking.estimatedCost / 1.075);
    const vat = booking.estimatedCost - subtotal;
    const isPaid = Boolean(paymentRef) || booking.status === 'confirmed' || booking.status === 'completed';

    setInvoiceData({
      invoiceNumber: `INV-${booking.referenceCode}`,
      referenceCode: booking.referenceCode,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dueDate: booking.preferredDate,
      customerName: booking.customerName,
      customerEmail: booking.email,
      customerPhone: booking.phone,
      customerAddress: `${booking.address}, ${booking.city}, ${booking.stateOrRegion}`,
      serviceName: booking.serviceName,
      items: [
        {
          description: `${booking.serviceName} Turnkey Implementation & Labor`,
          qty: 1,
          unitPrice: Math.round(subtotal * 0.45),
          total: Math.round(subtotal * 0.45),
        },
        {
          description: `Certified Hardware Allocation & Equipment Rigging (${booking.premisesType})`,
          qty: 1,
          unitPrice: Math.round(subtotal * 0.45),
          total: Math.round(subtotal * 0.45),
        },
        {
          description: `Preliminary On-Site Electrical Feasibility Survey & Testing`,
          qty: 1,
          unitPrice: Math.round(subtotal * 0.1),
          total: Math.round(subtotal * 0.1),
        }
      ],
      subtotal,
      vat,
      totalAmount: booking.estimatedCost,
      isPaid,
      paymentRef: paymentRef || (isPaid ? 'PAY-REF-VERIFIED' : undefined),
    });
  };

  if (isAdminView) {
    return (
      <AdminDashboard
        onExitAdmin={() => setIsAdminView(false)}
        onViewInvoice={(b) => buildAndShowInvoiceForBooking(b)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={(srvId) => handleStartBooking(srvId)}
        onOpenAdmin={() => setIsAdminView(true)}
        onOpenLiveChat={() => setIsChatOpen(true)}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode || 'signin');
          setIsAuthModalOpen(true);
        }}
        unreadCount={appStore.getInquiries().filter(i => i.status === 'new').length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={(srvId) => handleStartBooking(srvId)}
          onBookConsultation={(srvId) => handleStartBooking(srvId)}
          onExploreServices={() => {
            document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreTraining={() => {
            document.getElementById('training-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewAcademy={() => {
            document.getElementById('training-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 14 Turnkey Engineering Services Directory */}
        <ServicesGrid
          services={services}
          onSelectService={handleOpenSpecs}
          onBookService={(srvId) => handleStartBooking(srvId)}
          onViewTraining={handleViewTraining}
        />

        {/* Technical Academy & Hands-on Training Section */}
        <TrainingAcademy
          courses={courses}
          onEnroll={handleStartEnrollment}
          onRequestCustomTraining={() => {
            const elem = document.getElementById('contact-section');
            elem?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Real Executed Projects & Case Studies */}
        <ProjectsShowcase
          onBookService={() => handleStartBooking()}
        />

        {/* Turnkey Project Video Showcase (YouTube Drop-in & Play) */}
        <ProjectVideoGallery
          videos={videos}
          onBookService={(srvTitle) => handleStartBooking()}
          onOpenAdmin={() => setIsAdminView(true)}
        />

        {/* Client & Academy Graduate Verified Reviews */}
        <TestimonialsSection
          testimonials={testimonials}
          onBookService={() => handleStartBooking()}
          onExploreTraining={() => {
            const elem = document.getElementById('training-section');
            elem?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Corporate Inquiries, Emergency Dispatch & Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminView(true)}
        onSelectService={() => {
          document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* WhatsApp & Live Chat Floating Widget */}
      <WhatsAppChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Technical Specs Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForSpecs}
        onClose={() => setSelectedServiceForSpecs(null)}
        onBookService={(srvId) => {
          setSelectedServiceForSpecs(null);
          handleStartBooking(srvId);
        }}
        onViewTraining={(cId) => {
          setSelectedServiceForSpecs(null);
          handleViewTraining(cId);
        }}
      />

      {/* Interactive Booking & Quote Engine Modal */}
      {isBookingModalOpen && (
        <BookingModal
          initialServiceId={bookingServiceId}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Student Academy Enrollment Modal */}
      {isEnrollmentModalOpen && (
        <EnrollmentModal
          courseId={enrollmentCourseId}
          initialCohortId={enrollmentCohortId}
          onClose={() => setIsEnrollmentModalOpen(false)}
          onEnrollmentSuccess={handleEnrollmentSuccess}
        />
      )}

      {/* Secure Payment Modal */}
      {isPaymentModalOpen && paymentData && (
        <PaymentModal
          amount={paymentData.amount}
          currency="NGN"
          description={paymentData.description}
          referenceId={paymentData.referenceId}
          referenceCode={paymentData.referenceCode}
          customerEmail={paymentData.customerEmail}
          customerName={paymentData.customerName}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentComplete={handlePaymentComplete}
          onViewInvoice={() => {
            setIsPaymentModalOpen(false);
          }}
        />
      )}

      {/* Printable / Downloadable Official Invoice & Receipt */}
      <InvoiceModal
        invoiceData={invoiceData}
        onClose={() => setInvoiceData(null)}
      />

      {/* User Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          if (user.role === 'admin') {
            setIsAdminView(true);
          }
        }}
      />
    </div>
  );
}
