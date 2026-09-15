import React from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  GraduationCap, 
  Lock, 
  ArrowUpRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { appStore } from '../services/store';

interface FooterProps {
  onOpenAdmin: () => void;
  onSelectService: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onSelectService,
}) => {
  const whatsAppUrl = appStore.getWhatsAppUrl();

  const servicesList = [
    'Home automotion (Smarthome)',
    'Electrical works',
    'Automatic change over (ATS)',
    'Solar and Inverter System',
    'Smart gate',
    'Electric fence',
    'Home Cinema',
    'IP-PABX / PABX',
    'Customized Electronics solution and products',
    'Digital Signage',
    'Digital Securities',
    'Hotels door locks',
    'Smart Furnitures',
    'Access Controls',
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" showTagline={true} />
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mt-3">
              Ebentrick Global Services delivers high-precision turnkey electrical engineering, intelligent home and building automation, commercial digital security, and accredited vocational technical training.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>Victoria Island / Lekki Industrial Corridor, Lagos</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <a href="tel:+2348032458901" className="hover:text-blue-600 dark:hover:text-white font-mono font-medium">
                  +234 803 245 8901 (24/7 Hotline)
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <a href="mailto:inquiries@ebentrick.com" className="hover:text-blue-600 dark:hover:text-white">
                  inquiries@ebentrick.com
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>Direct WhatsApp Desk</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={onOpenAdmin}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
                title="Operations Management Console"
              >
                <Lock className="w-3 h-3 text-red-500 dark:text-red-400" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

          {/* Col 3: Engineering Services 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono mb-3">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesList.slice(0, 7).map((s, idx) => (
                <li key={idx}>
                  <a
                    href="#services-section"
                    onClick={() => onSelectService(s)}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Engineering Services 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono mb-3">
              Specialized Divisions
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesList.slice(7).map((s, idx) => (
                <li key={idx}>
                  <a
                    href="#services-section"
                    onClick={() => onSelectService(s)}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                  >
                    {s}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                <a
                  href="#videos-section"
                  className="hover:text-red-600 dark:hover:text-red-400 text-slate-700 dark:text-slate-300 font-medium transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Project Videos Gallery</span>
                </a>
              </li>
              <li>
                <a
                  href="#testimonials-section"
                  className="hover:text-amber-600 dark:hover:text-amber-400 text-slate-700 dark:text-slate-300 font-medium transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Client Testimonials</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Technical Academy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-red-500 dark:text-red-400" />
              <span>Vocational Academy</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              Certified hands-on bench lab programs in smart home architecture, solar sizing, ATS wiring, and digital security.
            </p>
            <a
              href="#training-section"
              className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-500"
            >
              <span>Explore Cohort Schedules</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="mt-4 p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 shadow-xs">
              <span className="text-slate-900 dark:text-white font-semibold block">Quality Assurance</span>
              ISO & COREN aligned technical standard implementations.
            </div>
          </div>
        </div>

        {/* Bottom Credits & Trademark */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Ebentrick Global Services Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>RC: 1894402</span>
            <span>•</span>
            <span className="text-slate-500 dark:text-slate-400">"Light makes the difference"</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
