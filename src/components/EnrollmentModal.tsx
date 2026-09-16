import React, { useState } from 'react';
import { TrainingCourse, TrainingEnrollment } from '../types';
import { formatNaira } from '../utils/currency';
import { 
  X, 
  GraduationCap, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { appStore } from '../services/store';

interface EnrollmentModalProps {
  courseId: string;
  initialCohortId?: string;
  onClose: () => void;
  onEnrollmentSuccess: (enrollment: TrainingEnrollment, triggerPayment: boolean) => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  courseId,
  initialCohortId,
  onClose,
  onEnrollmentSuccess,
}) => {
  const course = appStore.getCourseById(courseId);
  const [selectedCohortId, setSelectedCohortId] = useState<string>(
    initialCohortId || course?.nextCohorts[0]?.id || ''
  );
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'two_installments'>('full');
  const [payNow, setPayNow] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!course) return null;

  const selectedCohort = course.nextCohorts.find(c => c.id === selectedCohortId) || course.nextCohorts[0];
  const totalTuition = course.tuitionFee;
  const amountToPayNow = paymentPlan === 'full' ? totalTuition : Math.round(totalTuition / 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !email || !phone) {
      alert('Please fill in your full name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const enrollment = appStore.enrollStudent({
        studentName,
        email,
        phone,
        courseId: course.id,
        cohortId: selectedCohortId,
        paymentPlan,
      });

      setIsSubmitting(false);
      // Direct online payment is disabled for now; reserve seat directly
      onEnrollmentSuccess(enrollment, false);
    } catch (err: any) {
      setIsSubmitting(false);
      alert(err.message || 'Enrollment failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Technical Academy Student Registration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            {course.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Program Code: <span className="font-mono text-blue-400">{course.code}</span> • Duration: {course.durationWeeks} Weeks Hands-on Lab
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Cohort Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Select Cohort Schedule & Lab Location
            </label>
            <div className="space-y-2">
              {course.nextCohorts.map((coh) => (
                <label
                  key={coh.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    selectedCohortId === coh.id
                      ? 'bg-red-950/40 border-red-500/60 text-white'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="cohort"
                      value={coh.id}
                      checked={selectedCohortId === coh.id}
                      onChange={() => setSelectedCohortId(coh.id)}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <div className="text-xs font-bold">{coh.startDate} — {coh.endDate}</div>
                      <div className="text-[11px] text-slate-400">{coh.format} • Instructor: {coh.instructor}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {coh.maxSeats - coh.enrolledSeats} seats left
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Student Contact Info */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Student Information
            </h4>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Legal Name (For Certification) *</label>
              <input
                type="text"
                placeholder="e.g. Emmanuel Chukwuemeka"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Plan Selection */}
          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tuition Settlement Plan
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <label
                className={`p-3.5 rounded-xl border cursor-pointer text-center ${
                  paymentPlan === 'full'
                    ? 'bg-blue-950/40 border-blue-500/60 text-white'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  checked={paymentPlan === 'full'}
                  onChange={() => setPaymentPlan('full')}
                  className="hidden"
                />
                <div className="text-xs font-bold text-white">Full Tuition Payment</div>
                <div className="text-lg font-bold font-mono text-blue-400 mt-1">{formatNaira(totalTuition)}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Includes full hardware kit upfront</div>
              </label>

              <label
                className={`p-3.5 rounded-xl border cursor-pointer text-center ${
                  paymentPlan === 'two_installments'
                    ? 'bg-blue-950/40 border-blue-500/60 text-white'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  checked={paymentPlan === 'two_installments'}
                  onChange={() => setPaymentPlan('two_installments')}
                  className="hidden"
                />
                <div className="text-xs font-bold text-white">50% Two Installments</div>
                <div className="text-lg font-bold font-mono text-amber-400 mt-1">{formatNaira(Math.round(totalTuition / 2))} Now</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Balance due by Week 3 of course</div>
              </label>
            </div>
          </div>

          {/* Direct payment paused notice */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Online checkout paused. Tuition invoice and orientation packet will be issued to your email.</span>
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">No Card Required</span>
          </div>

          {/* Guarantee pill */}
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Admission includes official student kit, laboratory access & certificate processing.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Submit Application & Reserve Seat</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
