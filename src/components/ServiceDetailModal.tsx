import React from 'react';
import { ServiceItem } from '../types';
import { formatNaira } from '../utils/currency';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  GraduationCap, 
  PhoneCall, 
  Cpu,
  Layers,
  Wrench,
  Sparkles,
  Award
} from 'lucide-react';
import { appStore } from '../services/store';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
  onViewTraining: (courseId?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
  onViewTraining,
}) => {
  if (!service) return null;

  const whatsAppUrl = appStore.getWhatsAppUrl(
    `Hello Ebentrick! I am inquiring about technical specifications for: ${service.name}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
              {service.category.replace('-', ' ')}
            </span>
            {service.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-300 border border-red-500/30 uppercase tracking-wider">
                {service.badge}
              </span>
            )}
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 ml-auto">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Timeline: {service.completionTimeline}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
            {service.name}
          </h2>
          <p className="text-sm sm:text-base text-blue-300 font-medium">
            {service.tagline}
          </p>
        </div>

        {/* Detailed Scope Description */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Engineering Scope & Architecture
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Technical Specifications Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              Technical Specifications
            </h4>
            <ul className="space-y-2">
              {service.specifications.map((spec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Key Deliverables & Standards
            </h4>
            <ul className="space-y-2">
              {service.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hardware Brands Certified */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Original Equipment Manufacturer (OEM) Hardware Used:
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.hardwareBrands.map((brand, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-800 text-slate-200 border border-slate-700"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Warranties & Training Callout */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">2-Year Ebentrick Warranty</div>
              <div className="text-[11px] text-slate-400">Includes 6 months complimentary preventive maintenance inspection.</div>
            </div>
          </div>

          {service.hasTrainingCourse && (
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-red-400 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Learn to Install This!</div>
                <div className="text-[11px] text-slate-400">
                  Hands-on certified academy course available for this discipline.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Investment and Action CTAs */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 uppercase font-mono">Estimated Base Investment</div>
            <div className="text-2xl font-bold text-white font-mono">
              {formatNaira(service.basePriceEstimate)} <span className="text-xs font-normal text-slate-400">+ Materials</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {service.hasTrainingCourse && (
              <button
                onClick={() => {
                  onClose();
                  onViewTraining(service.trainingCourseId);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-red-300 bg-red-950/60 border border-red-500/30 hover:bg-red-900/40 transition-colors flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>View Academy Course</span>
              </button>
            )}

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 hover:bg-emerald-900/50 transition-colors flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Service Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
