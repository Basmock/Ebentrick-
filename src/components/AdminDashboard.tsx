import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  GraduationCap, 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  ShieldAlert, 
  Printer, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  Filter, 
  Eye, 
  Send,
  Sparkles,
  Award,
  AlertTriangle,
  FileText,
  Plus,
  Wrench,
  Film,
  Star,
  BookOpen
} from 'lucide-react';
import { appStore } from '../services/store';
import { 
  ServiceBooking, 
  TrainingEnrollment, 
  UserInquiry, 
  EmailNotification,
  TrainingCohort,
  ChatMessage,
  ServiceItem,
  TrainingCourse,
  ProjectVideo,
  TestimonialItem
} from '../types';
import { formatNaira } from '../utils/currency';
import { AdminServicesManager } from './admin/AdminServicesManager';
import { AdminTrainingManager } from './admin/AdminTrainingManager';
import { AdminVideosManager } from './admin/AdminVideosManager';
import { AdminTestimonialsManager } from './admin/AdminTestimonialsManager';

interface AdminDashboardProps {
  onExitAdmin: () => void;
  onViewInvoice: (booking: ServiceBooking) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onExitAdmin,
  onViewInvoice,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'services' | 'courses' | 'training' | 'videos' | 'testimonials' | 'inquiries' | 'emails' | 'chat'
  >('overview');
  
  // State from store
  const [analytics, setAnalytics] = useState(appStore.getAnalytics());
  const [bookings, setBookings] = useState<ServiceBooking[]>(appStore.getBookings());
  const [enrollments, setEnrollments] = useState<TrainingEnrollment[]>(appStore.getEnrollments());
  const [inquiries, setInquiries] = useState<UserInquiry[]>(appStore.getInquiries());
  const [emails, setEmails] = useState<EmailNotification[]>(appStore.getEmailNotifications());
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(appStore.getChatMessages());
  const [courses, setCourses] = useState<TrainingCourse[]>(appStore.getCourses());
  const [services, setServices] = useState<ServiceItem[]>(appStore.getServices());
  const [videos, setVideos] = useState<ProjectVideo[]>(appStore.getVideos());
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(appStore.getTestimonials());

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Chat input
  const [adminReplyText, setAdminReplyText] = useState('');

  // Email preview modal state
  const [previewEmail, setPreviewEmail] = useState<EmailNotification | null>(null);

  // New cohort modal state
  const [showAddCohortModal, setShowAddCohortModal] = useState(false);
  const [cohortCourseId, setCohortCourseId] = useState(courses[0]?.id || '');
  const [cohortStartDate, setCohortStartDate] = useState('');
  const [cohortEndDate, setCohortEndDate] = useState('');
  const [cohortFormat, setCohortFormat] = useState('Full-Time Intensive (Mon-Fri Lab)');
  const [cohortMaxSeats, setCohortMaxSeats] = useState(15);
  const [cohortInstructor, setCohortInstructor] = useState('Engr. Ebenezer Trickson');

  useEffect(() => {
    const unsub = appStore.subscribe(() => {
      setAnalytics(appStore.getAnalytics());
      setBookings(appStore.getBookings());
      setEnrollments(appStore.getEnrollments());
      setInquiries(appStore.getInquiries());
      setEmails(appStore.getEmailNotifications());
      setChatMessages(appStore.getChatMessages());
      setCourses(appStore.getCourses());
      setServices(appStore.getServices());
      setVideos(appStore.getVideos());
      setTestimonials(appStore.getTestimonials());
    });
    return unsub;
  }, []);

  const refreshAll = () => {
    setAnalytics(appStore.getAnalytics());
    setBookings(appStore.getBookings());
    setEnrollments(appStore.getEnrollments());
    setInquiries(appStore.getInquiries());
    setEmails(appStore.getEmailNotifications());
    setChatMessages(appStore.getChatMessages());
    setCourses(appStore.getCourses());
    setServices(appStore.getServices());
    setVideos(appStore.getVideos());
    setTestimonials(appStore.getTestimonials());
  };

  const handleUpdateBookingStatus = (id: string, status: ServiceBooking['status']) => {
    appStore.updateBookingStatus(id, status);
  };

  const handleUpdateEnrollmentStatus = (id: string, status: TrainingEnrollment['status']) => {
    appStore.updateEnrollmentStatus(id, status);
  };

  const handleUpdateInquiryStatus = (id: string, status: UserInquiry['status']) => {
    appStore.updateInquiryStatus(id, status);
  };

  const handleSendAdminChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim()) return;
    appStore.sendChatMessage(adminReplyText.trim(), 'agent', 'Lead Operations Engineer (Admin)', 'live_chat');
    setAdminReplyText('');
  };

  const handleCreateCohort = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohortStartDate || !cohortEndDate) {
      alert('Please provide start and end dates.');
      return;
    }
    appStore.addCohort(cohortCourseId, {
      startDate: cohortStartDate,
      endDate: cohortEndDate,
      format: cohortFormat,
      maxSeats: Number(cohortMaxSeats),
      instructor: cohortInstructor,
      status: 'open'
    });
    setShowAddCohortModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs tracking-wider">
              EBT
            </div>
            <div>
              <span className="font-display font-bold text-white text-sm sm:text-base leading-none block">
                Central Operations Console
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Ebentrick Global Services Limited • Operations Desk
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live System Active
            </span>

            <button
              onClick={onExitAdmin}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
            >
              Exit to Public Site
            </button>
          </div>
        </div>

        {/* Tab Sub-bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5">
          {[
            { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
            { id: 'bookings', label: `Service Bookings (${bookings.length})`, icon: Calendar },
            { id: 'services', label: `Services Manager (${services.length})`, icon: Wrench },
            { id: 'courses', label: `Training Courses (${courses.length})`, icon: BookOpen },
            { id: 'training', label: `Student Rosters (${enrollments.length})`, icon: GraduationCap },
            { id: 'videos', label: `Project Videos (${videos.length})`, icon: Film },
            { id: 'testimonials', label: `Testimonials (${testimonials.length})`, icon: Star },
            { id: 'inquiries', label: `Inquiries & RFPs (${inquiries.length})`, icon: Mail },
            { id: 'emails', label: `Email Log (${emails.length})`, icon: Send },
            { id: 'chat', label: 'Live Chat Desk', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ======================= TAB 1: EXECUTIVE OVERVIEW ======================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase">Gross Contract Pipeline</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">₦</span>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {formatNaira(analytics.totalRevenue)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Settled payments: <span className="font-mono text-emerald-400">{formatNaira(analytics.settledPayments)}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase">Engineering Bookings</span>
                  <Calendar className="w-4 h-4 text-blue-400" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {analytics.totalBookings}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span className="text-amber-400 font-bold">{analytics.pendingBookings} pending review</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">{analytics.completedBookings} completed</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase">Academy Students</span>
                  <GraduationCap className="w-4 h-4 text-red-400" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {analytics.totalStudents}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {analytics.activeCohorts} active running cohort groups
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase">Client Inquiries & RFPs</span>
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {analytics.totalInquiries}
                  </div>
                  <div className="text-[11px] text-amber-400 mt-1 font-bold">
                    {analytics.openInquiries} require technical callback
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Operational Activity Feeds */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Bookings Queue */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Recent Engineering Deployments</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white">{b.referenceCode}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' :
                            b.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-amber-500/20 text-amber-300'
                          }`}>
                            {b.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-1">{b.serviceName}</div>
                        <div className="text-[11px] text-slate-400">{b.customerName} • {b.city}</div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-sm font-bold text-emerald-400">
                          ${b.estimatedCost.toLocaleString()}
                        </div>
                        <button
                          onClick={() => onViewInvoice(b)}
                          className="mt-1 text-[11px] text-slate-400 hover:text-white flex items-center gap-1 justify-end"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Invoice</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inquiries & Automated System Notifications */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-emerald-400" />
                      <span>Latest Automated System Emails</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('emails')}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Audit Log →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {emails.slice(0, 4).map((em) => (
                      <div
                        key={em.id}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-white line-clamp-1">{em.subject}</div>
                          <div className="text-[11px] text-slate-400">
                            To: {em.recipientEmail} • {em.timestamp}
                          </div>
                        </div>
                        <button
                          onClick={() => setPreviewEmail(em)}
                          className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                          title="Preview Email HTML"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Automated dispatch worker: Running</span>
                  <span className="text-emerald-400 font-mono font-bold">100% Delivery Success</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: SERVICE BOOKINGS ======================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Field Engineering Deployments
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Manage site surveys, confirm schedules, assign technicians, and monitor job statuses.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono font-bold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Ref Code</th>
                      <th className="py-3 px-4">Client & Contact</th>
                      <th className="py-3 px-4">Discipline</th>
                      <th className="py-3 px-4">Premises & Date</th>
                      <th className="py-3 px-4">Est. Quote</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {bookings
                      .filter(b => statusFilter === 'all' || b.status === statusFilter)
                      .map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                            {b.referenceCode}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{b.customerName}</div>
                            <div className="text-[11px] text-slate-400">{b.email} • {b.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-200">
                            {b.serviceName}
                          </td>
                          <td className="py-3.5 px-4">
                            <div>{b.premisesType}</div>
                            <div className="text-[11px] text-slate-400">{b.preferredDate} ({b.preferredTimeSlot})</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                            {formatNaira(b.estimatedCost)}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                              className={`px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-950 border ${
                                b.status === 'confirmed' ? 'text-emerald-400 border-emerald-500/40' :
                                b.status === 'completed' ? 'text-blue-400 border-blue-500/40' :
                                b.status === 'in_progress' ? 'text-purple-400 border-purple-500/40' :
                                'text-amber-400 border-amber-500/40'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={appStore.getWhatsAppUrl(`Hello ${b.customerName}! Regarding your Ebentrick booking ${b.referenceCode}...`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30"
                                title="Contact Client on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => onViewInvoice(b)}
                                className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                                title="Print Formal Invoice / Receipt"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 3: ACADEMY & COHORTS ======================= */}
        {activeTab === 'training' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Technical Academy & Student Registrations
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Manage student rosters, seat capacities, certification issuance, and open new cohorts.
                </p>
              </div>

              <button
                onClick={() => setShowAddCohortModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors flex items-center gap-1.5 shadow-md shadow-red-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Open New Cohort Schedule</span>
              </button>
            </div>

            {/* Student Registrations Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Student Enrollment Roster ({enrollments.length})
                </h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono font-bold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Reg Code</th>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Plan & Tuition</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Cert Issued</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {enrollments.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-800/40">
                        <td className="py-3.5 px-4 font-mono font-bold text-red-400">
                          {e.registrationNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{e.studentName}</div>
                          <div className="text-[11px] text-slate-400">{e.email} • {e.phone}</div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-200">
                          {e.courseTitle}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-white">{formatNaira(e.tuitionFee)}</div>
                          <div className="text-[10px] text-slate-400 uppercase">{e.paymentPlan.replace('_', ' ')}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={e.status}
                            onChange={(ev) => handleUpdateEnrollmentStatus(e.id, ev.target.value as any)}
                            className="px-2 py-1 rounded text-[11px] font-bold uppercase bg-slate-950 border border-slate-700 text-slate-300"
                          >
                            <option value="enrolled">Enrolled</option>
                            <option value="in_training">In Training</option>
                            <option value="completed">Completed</option>
                            <option value="deferred">Deferred</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => {
                              const newStatus = !e.certificateIssued;
                              appStore.updateEnrollmentStatus(e.id, e.status, newStatus);
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              e.certificateIssued
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                            }`}
                          >
                            {e.certificateIssued ? 'Issued' : 'Pending'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <a
                            href={appStore.getWhatsAppUrl(`Hello ${e.studentName}! Regarding your admission in Ebentrick Academy (${e.registrationNumber})...`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 inline-block rounded bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30"
                            title="Chat with Student on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Courses and Current Cohorts Roster */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-red-400">{c.code}</span>
                    <span className="text-xs font-mono text-slate-400">{c.durationWeeks} Weeks</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{c.title}</h4>
                  
                  <div className="space-y-2 mt-4 pt-3 border-t border-slate-800">
                    <div className="text-[11px] font-bold uppercase text-slate-400">Scheduled Cohorts:</div>
                    {c.nextCohorts.map((coh) => (
                      <div key={coh.id} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                        <div className="flex justify-between font-medium text-slate-200">
                          <span>{coh.startDate}</span>
                          <span className="font-mono text-blue-400">{coh.enrolledSeats}/{coh.maxSeats} seats</span>
                        </div>
                        <div className="text-[11px] text-slate-500">{coh.format}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= SERVICES MANAGEMENT ======================= */}
        {activeTab === 'services' && (
          <AdminServicesManager
            services={services}
            onRefresh={refreshAll}
          />
        )}

        {/* ======================= TRAINING COURSES MANAGEMENT ======================= */}
        {activeTab === 'courses' && (
          <AdminTrainingManager
            courses={courses}
            onRefresh={refreshAll}
          />
        )}

        {/* ======================= PROJECT VIDEOS SHOWCASE ======================= */}
        {activeTab === 'videos' && (
          <AdminVideosManager
            videos={videos}
            onRefresh={refreshAll}
          />
        )}

        {/* ======================= TESTIMONIALS MANAGEMENT ======================= */}
        {activeTab === 'testimonials' && (
          <AdminTestimonialsManager
            testimonials={testimonials}
            onRefresh={refreshAll}
          />
        )}

        {/* ======================= TAB 4: USER INQUIRIES & RFPS ======================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">
                Client Technical Inquiries & RFPs
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Incoming prospective client requests, corporate quotes, and emergency service calls.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono font-bold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Ticket</th>
                      <th className="py-3 px-4">Sender</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Subject & Message</th>
                      <th className="py-3 px-4">Urgency</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Direct Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-800/40">
                        <td className="py-3.5 px-4 font-mono font-bold text-purple-400">
                          {inq.referenceId}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{inq.fullName}</div>
                          <div className="text-[11px] text-slate-400">{inq.email} • {inq.phone}</div>
                          {inq.organization && (
                            <div className="text-[10px] text-slate-500 font-medium">{inq.organization}</div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="capitalize">{inq.inquiryType.replace('_', ' ')}</span>
                          <div className="text-[11px] text-slate-400">{inq.serviceInterest}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-bold text-white line-clamp-1">{inq.subject}</div>
                          <div className="text-slate-400 line-clamp-2 mt-0.5">{inq.message}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            inq.urgency === 'critical' ? 'bg-red-500/20 text-red-400' :
                            inq.urgency === 'high' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {inq.urgency}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="px-2 py-1 rounded text-[11px] font-bold uppercase bg-slate-950 border border-slate-700 text-slate-300"
                          >
                            <option value="new">New</option>
                            <option value="under_review">Reviewing</option>
                            <option value="quoted">Quoted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <a
                            href={appStore.getWhatsAppUrl(`Hello ${inq.fullName}! Regarding your inquiry ticket ${inq.referenceId} with Ebentrick...`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/30 text-[11px] font-semibold inline-flex items-center gap-1"
                          >
                            <span>WhatsApp</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 5: AUTOMATED EMAIL AUDIT LOG ======================= */}
        {activeTab === 'emails' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">
                Automated System Email Audit Trail
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Review automated booking confirmations, payment receipts, and enrollment admissions dispatched by Ebentrick's engine.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono font-bold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Recipient</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Delivery Status</th>
                      <th className="py-3 px-4 text-right">Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {emails.map((em) => (
                      <tr key={em.id} className="hover:bg-slate-800/40">
                        <td className="py-3.5 px-4 font-mono text-slate-400">
                          {em.timestamp}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{em.recipientName}</div>
                          <div className="text-[11px] text-blue-400">{em.recipientEmail}</div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-200">
                          {em.subject}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] uppercase font-mono text-slate-300 border border-slate-700">
                            {em.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono font-bold text-[11px]">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>DISPATCHED</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setPreviewEmail(em)}
                            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1 ml-auto"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 6: LIVE CHAT DESK ======================= */}
        {activeTab === 'chat' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">
                Live Customer Support Terminal
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Reply to clients browsing the website in real time. Messages update seamlessly across customer screens.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl max-w-3xl flex flex-col h-[560px]">
              {/* Message scroll */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {chatMessages.map((m) => {
                  const isAdmin = m.sender === 'admin';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-slate-400 font-mono mb-0.5">
                        <span>{m.senderName}</span> • <span>{m.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isAdmin
                            ? 'bg-red-600 text-white rounded-br-xs shadow-sm'
                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-xs'
                        }`}
                      >
                        {m.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Admin reply input */}
              <form onSubmit={handleSendAdminChat} className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type official engineering reply to customer..."
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Email Preview Modal */}
      {previewEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setPreviewEmail(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1"
            >
              ✕
            </button>
            <div className="border-b border-slate-200 pb-3 mb-4">
              <span className="text-xs uppercase font-mono text-slate-400">Automated Mail Preview</span>
              <h3 className="text-base font-bold text-slate-900">{previewEmail.subject}</h3>
              <p className="text-xs text-slate-500">To: {previewEmail.recipientEmail} • {previewEmail.timestamp}</p>
            </div>
            <div 
              className="email-render-container"
              dangerouslySetInnerHTML={{ __html: previewEmail.htmlContent }}
            />
          </div>
        </div>
      )}

      {/* Add Cohort Modal */}
      {showAddCohortModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
            <button
              onClick={() => setShowAddCohortModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white mb-3">Schedule New Academy Cohort</h3>
            
            <form onSubmit={handleCreateCohort} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Target Discipline Course</label>
                <select
                  value={cohortCourseId}
                  onChange={(e) => setCohortCourseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={cohortStartDate}
                    onChange={(e) => setCohortStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">End Date</label>
                  <input
                    type="date"
                    value={cohortEndDate}
                    onChange={(e) => setCohortEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Classroom / Lab Format</label>
                <input
                  type="text"
                  value={cohortFormat}
                  onChange={(e) => setCohortFormat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Seat Limit</label>
                  <input
                    type="number"
                    value={cohortMaxSeats}
                    onChange={(e) => setCohortMaxSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    min={5}
                    max={40}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Lead Instructor</label>
                  <input
                    type="text"
                    value={cohortInstructor}
                    onChange={(e) => setCohortInstructor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCohortModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 font-bold text-white"
                >
                  Confirm & Publish Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
