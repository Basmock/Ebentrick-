import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sun, 
  Home, 
  GraduationCap, 
  PhoneCall, 
  Award, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { appStore } from '../services/store';

interface HeroProps {
  onOpenBooking?: (serviceId?: string) => void;
  onBookConsultation?: (serviceId?: string) => void;
  onExploreServices?: () => void;
  onExploreTraining?: () => void;
  onViewAcademy?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onBookConsultation,
  onExploreServices,
  onExploreTraining,
  onViewAcademy,
}) => {
  const handleBooking = (serviceId?: string) => {
    if (onOpenBooking) {
      onOpenBooking(serviceId);
    } else if (onBookConsultation) {
      onBookConsultation(serviceId);
    }
  };

  const handleTraining = () => {
    if (onExploreTraining) {
      onExploreTraining();
    } else if (onViewAcademy) {
      onViewAcademy();
    }
  };

  const handleServices = () => {
    onExploreServices?.();
  };

  const whatsAppUrl = appStore.getWhatsAppUrl(
    "Hello Ebentrick Global Services! I want to request a site survey and technical consultation."
  );

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-transparent transition-colors duration-200">
      {/* Background Subtle Tech Matrix Effect */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/5 dark:bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>EBENTRICK GLOBAL SERVICES</span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="text-blue-600 dark:text-blue-400 font-mono">ISO & IEE COMPLIANT</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Engineering Tomorrow's Smart World.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-red-600 dark:from-blue-400 dark:via-sky-300 dark:to-red-400">
              Light Makes The Difference.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Specialized engineering in <strong className="text-slate-900 dark:text-white font-semibold">Home Automation</strong>, <strong className="text-slate-900 dark:text-white font-semibold">Solar & Inverter Systems</strong>, <strong className="text-slate-900 dark:text-white font-semibold">Automatic Change Over (ATS)</strong>, <strong className="text-slate-900 dark:text-white font-semibold">Digital Securities</strong>, and premier <strong className="text-blue-600 dark:text-blue-400 font-semibold">Hands-On Technical Training Academy</strong>.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="hero-book-now-btn"
              onClick={() => handleBooking()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 shadow-lg shadow-blue-600/30 border border-blue-400/30 flex items-center justify-center gap-2 transition-all active:scale-95 group"
            >
              <span>Book Service / Instant Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-training-btn"
              onClick={handleTraining}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-red-500 dark:text-red-400" />
              <span>Vocational Training Academy</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/30 font-semibold">
                Enroll
              </span>
            </button>

            <a
              id="hero-whatsapp-btn"
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Hotline</span>
            </a>
          </div>

          {/* Guarantee Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Certified Field Engineers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>2-Year Hardware Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Same-Day Site Inspection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Accredited Certification</span>
            </div>
          </div>
        </div>

        {/* Corporate Metrics Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/90 shadow-lg dark:shadow-xl backdrop-blur-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/50 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-display">1,450+</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Turnkey Installations
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Residential & Commercial</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/50 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">99.9%</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Power & ATS Uptime
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Zero-Downtime Guarantee</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/50 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400 font-display">480+</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Engineers Certified
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">In-Person & Hybrid Labs</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/50 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display">&lt; 25 Min</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Emergency Response
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">24/7 Rapid Mobile Squad</div>
          </div>
        </div>

        {/* Quick Service Category Navigator Bar */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-3 p-3 rounded-xl bg-slate-100/90 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Zap className="w-4 h-4 text-amber-500 dark:text-yellow-400" />
            <span>Popular Disciplines:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Smart Homes', id: 'srv-home-automation' },
              { label: 'Solar & Inverters', id: 'srv-solar-inverter-system' },
              { label: 'Automatic Change Over (ATS)', id: 'srv-automatic-change-over' },
              { label: 'Electric Fence', id: 'srv-electric-fence' },
              { label: 'IP-PABX Telecom', id: 'srv-ip-pabx' },
              { label: 'Hotel Smart Locks', id: 'srv-hotels-door-locks' },
              { label: 'Smart Gate', id: 'srv-smart-gate' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleBooking(item.id)}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-blue-600/80 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1 shadow-sm"
              >
                <span>{item.label}</span>
                <span className="text-slate-400 dark:text-slate-500 group-hover:text-blue-600">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
