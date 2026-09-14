import React, { useState, useEffect } from 'react';
import { 
  ServiceItem, 
  ServiceBooking 
} from '../types';
import { formatNaira } from '../utils/currency';
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  Building, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  CreditCard,
  FileText
} from 'lucide-react';
import { appStore } from '../services/store';

interface BookingModalProps {
  initialServiceId?: string;
  onClose: () => void;
  onBookingSuccess: (booking: ServiceBooking, triggerPayment: boolean) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  initialServiceId,
  onClose,
  onBookingSuccess,
}) => {
  const services = appStore.getServices();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || services[0]?.id || ''
  );
  const [premisesType, setPremisesType] = useState<ServiceBooking['premisesType']>('Residential Villa');
  const [urgency, setUrgency] = useState<ServiceBooking['urgency']>('standard');
  const [preferredDate, setPreferredDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<ServiceBooking['preferredTimeSlot']>('morning');
  
  // Client details
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lagos');
  const [stateOrRegion, setStateOrRegion] = useState('Lagos State');
  const [notes, setNotes] = useState('');

  const [payOnlineNow, setPayOnlineNow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  // Dynamic cost calculation
  const calculateEstimatedQuote = () => {
    if (!selectedService) return 1000;
    let base = selectedService.basePriceEstimate;
    
    // Premises adjustment
    if (premisesType === 'Commercial Office') base *= 1.35;
    else if (premisesType === 'Hotel / Hospitality') base *= 1.6;
    else if (premisesType === 'Industrial Facility') base *= 1.8;
    else if (premisesType === 'Apartment') base *= 0.9;

    // Urgency adjustment
    if (urgency === 'priority') base *= 1.15;
    if (urgency === 'emergency_24_7') base *= 1.3;

    return Math.round(base);
  };

  const estimatedTotal = calculateEstimatedQuote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !phone || !address) {
      alert('Please complete all required fields (Name, Email, Phone, Address).');
      return;
    }

    setIsSubmitting(true);
    try {
      const newBooking = appStore.createBooking({
        customerName,
        email,
        phone,
        companyName: companyName || undefined,
        address,
        city,
        stateOrRegion,
        serviceId: selectedServiceId,
        premisesType,
        urgency,
        preferredDate,
        preferredTimeSlot,
        estimatedCost: estimatedTotal,
        notes: notes || undefined,
        paymentImmediate: payOnlineNow,
      });

      setIsSubmitting(false);
      onBookingSuccess(newBooking, payOnlineNow);
    } catch (err) {
      setIsSubmitting(false);
      alert('Failed to process booking. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Interactive Engineering Booking & Quote Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Schedule Engineering Deployment
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure your technical requirements. We assign a lead certified engineer and generate an instant itemized estimate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Choose Service */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              1. Select Engineering Discipline
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 font-medium"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (from ${s.basePriceEstimate} USD)
                </option>
              ))}
            </select>
            {selectedService && (
              <p className="text-xs text-blue-300 mt-1.5 font-medium">
                {selectedService.tagline}
              </p>
            )}
          </div>

          {/* Section 2: Premises & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                2. Premises Classification
              </label>
              <select
                value={premisesType}
                onChange={(e) => setPremisesType(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Residential Villa">Residential Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial Office">Commercial Office</option>
                <option value="Hotel / Hospitality">Hotel / Hospitality</option>
                <option value="Industrial Facility">Industrial Facility</option>
                <option value="Retail Space">Retail Space</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                3. Dispatch Urgency
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="standard">Standard (Next 3-5 Business Days)</option>
                <option value="priority">Priority Inspection (Within 24-48 Hours)</option>
                <option value="emergency_24_7">24/7 Emergency Dispatch (Immediate)</option>
              </select>
            </div>
          </div>

          {/* Section 3: Date & Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Preferred Inspection Date
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Preferred Time Window
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['morning', 'afternoon', 'evening'] as const).map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setPreferredTimeSlot(slot)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-colors ${
                      preferredTimeSlot === slot
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Customer Details */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              4. Contact & Site Coordinates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Engr. Adeola Adeleke"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Company / Facility (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Hospital / Private Villa"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="client@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  placeholder="+234 803 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Street Address & Landmark *</label>
              <input
                type="text"
                placeholder="Plot 12, Victoria Island or specific street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">State / Province</label>
                <input
                  type="text"
                  value={stateOrRegion}
                  onChange={(e) => setStateOrRegion(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Project Notes / Existing Equipment</label>
              <textarea
                rows={2}
                placeholder="Tell our engineers about room count, existing generator capacity, or specific automation goals..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Section 5: Dynamic Estimate Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 block">
                  Estimated Turnkey Investment
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  {formatNaira(estimatedTotal)}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Includes preliminary site inspection, engineering labor, and baseline hardware allocation.
                </span>
              </div>

              {/* Payment toggle */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <input
                  type="checkbox"
                  id="pay-now-toggle"
                  checked={payOnlineNow}
                  onChange={(e) => setPayOnlineNow(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500"
                />
                <label htmlFor="pay-now-toggle" className="text-xs text-slate-300 select-none cursor-pointer">
                  <span className="font-bold text-white block">Pay & Confirm Online Now</span>
                  <span className="text-[10px] text-slate-400">Secure card / instant transfer checkout</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
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
              className="w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              {payOnlineNow ? (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed To Secure Payment ({formatNaira(estimatedTotal)})</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Submit Booking & Request Engineering Survey</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
