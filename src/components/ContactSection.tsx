import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { appStore } from '../services/store';

export const ContactSection: React.FC = () => {
  const services = appStore.getServices();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [inquiryType, setInquiryType] = useState<any>('service_request');
  const [serviceInterest, setServiceInterest] = useState(services[0]?.name || 'Home Automation (Smart Home)');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState<any>('medium');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsAppUrl = appStore.getWhatsAppUrl(
    "Hello Ebentrick Global Services! I am sending an inquiry from your official website."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const inq = appStore.submitInquiry({
        fullName,
        email,
        phone,
        organization: organization || undefined,
        inquiryType,
        serviceInterest,
        subject: subject || `${inquiryType.replace('_', ' ').toUpperCase()} Inquiry`,
        message,
        urgency,
      });

      setSubmittedRef(inq.referenceId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact-section" className="py-16 bg-white dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-4 h-4" />
            <span>Direct Response Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Consult With Our Chief Engineers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Have a project blueprint, need a site feasibility survey, or want to register a group for our vocational academy? Reach out today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Headquarters Details & WhatsApp Card */}
          <div className="space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Corporate Headquarters
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Engineering Operations Base</strong>
                    <span>Plot 14B, Commercial Strip, Victoria Island / Lekki Expressway, Lagos, Nigeria.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">24/7 Field Dispatch Hotline</strong>
                    <a href="tel:+2348032458901" className="hover:text-blue-600 dark:hover:text-blue-400 font-mono text-slate-800 dark:text-slate-200">
                      +234 803 245 8901
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Electronic Mail</strong>
                    <a href="mailto:inquiries@ebentrick.com" className="hover:text-blue-600 dark:hover:text-blue-400 text-slate-800 dark:text-slate-200">
                      inquiries@ebentrick.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Working Hours</strong>
                    <span>Monday - Saturday: 8:00 AM – 6:00 PM</span>
                    <span className="block text-emerald-600 dark:text-emerald-400 text-xs mt-0.5 font-medium">
                      *Emergency response team operates 24/7
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Trigger */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Escalation</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Need a rapid quote or emergency support? Speak directly with an on-duty engineer right now on WhatsApp.
                </p>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 mt-2 shadow-md shadow-emerald-700/20"
                >
                  <span>Open WhatsApp Chat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right 2 Columns: Contact / RFP Form */}
          <div className="lg:col-span-2">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                    Submit Technical Inquiry or RFP
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Your inquiry is automatically recorded and routed to the corresponding department head.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Arc. Babatunde Sanwo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                        Organization / Company (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Greenfield Estates Ltd"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="contact@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 shadow-sm"
                      >
                        <option value="service_request">Turnkey Service Request</option>
                        <option value="training_admission">Academy Admission / Cohort</option>
                        <option value="corporate_partnership">Corporate Partnership</option>
                        <option value="emergency_repair">Emergency Maintenance / Repair</option>
                        <option value="general">General Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                        Service of Interest
                      </label>
                      <select
                        value={serviceInterest}
                        onChange={(e) => setServiceInterest(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 shadow-sm"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                        Priority Level
                      </label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 shadow-sm"
                      >
                        <option value="low">Routine (Within 48h)</option>
                        <option value="medium">Standard (Within 24h)</option>
                        <option value="high">High (Within 6h)</option>
                        <option value="critical">Critical / Emergency (Immediate)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Quotation for 10-bedroom villa smart automation & solar"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                      Project Specifications / Message *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your requirements, facility layout, generator ratings, or student count..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-sm"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Client privacy protected. No spam.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Logging Ticket...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Your reference ticket is <strong className="text-blue-600 dark:text-blue-400 font-mono">{submittedRef}</strong>. An automated confirmation receipt has been dispatched to <strong>{email}</strong>.
                  </p>
                  <p className="text-xs text-slate-500">
                    A technical coordinator will contact you directly via phone or WhatsApp.
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                      setSubject('');
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
