import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  Phone, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  Menu, 
  X, 
  ExternalLink,
  Lock,
  Cpu,
  GraduationCap,
  Sparkles,
  Play,
  Film,
  Star
} from 'lucide-react';
import { appStore } from '../services/store';
import { ThemeToggle } from '../context/ThemeContext';

interface NavbarProps {
  currentView?: 'home' | 'services' | 'training' | 'projects' | 'videos' | 'testimonials' | 'contact' | 'admin';
  onNavigate?: (view: 'home' | 'services' | 'training' | 'projects' | 'videos' | 'testimonials' | 'contact' | 'admin') => void;
  onOpenBooking?: (serviceId?: string) => void;
  onOpenLiveChat?: () => void;
  onOpenAdmin?: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'home',
  onNavigate,
  onOpenBooking,
  onOpenLiveChat,
  onOpenAdmin,
  unreadCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBooking = (serviceId?: string) => {
    onOpenBooking?.(serviceId);
  };

  const handleNav = (view: 'home' | 'services' | 'training' | 'projects' | 'videos' | 'testimonials' | 'contact' | 'admin') => {
    setMobileMenuOpen(false);

    if (view === 'admin') {
      if (onOpenAdmin) {
        onOpenAdmin();
        return;
      }
      if (onNavigate) {
        onNavigate('admin');
        return;
      }
    }

    if (onNavigate) {
      onNavigate(view);
    } else {
      if (view === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.getElementById(`${view}-section`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const whatsAppUrl = appStore.getWhatsAppUrl();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-200 shadow-sm">
      {/* Top Corporate Status Bar */}
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800/50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            24/7 Emergency Dispatch Active
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Certified IEC / IEE Standard Installations
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="tel:+2348032458901"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-mono font-medium"
          >
            <Phone className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            +234 803 245 8901
          </a>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            WhatsApp Hotline
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          id="nav-brand-logo"
          onClick={() => handleNav('home')} 
          className="text-left focus:outline-none group"
        >
          <BrandLogo size="md" showTagline={true} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/40 p-1.5 rounded-full border border-slate-200 dark:border-slate-700/50 shadow-inner">
          <button
            id="nav-home-btn"
            onClick={() => handleNav('home')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              currentView === 'home'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            Overview
          </button>
          <button
            id="nav-services-btn"
            onClick={() => handleNav('services')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              currentView === 'services'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Services (14)
          </button>
          <button
            id="nav-training-btn"
            onClick={() => handleNav('training')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              currentView === 'training'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            Training Academy
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          <button
            id="nav-projects-btn"
            onClick={() => handleNav('projects')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              currentView === 'projects'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            Projects
          </button>
          <button
            id="nav-videos-btn"
            onClick={() => handleNav('videos')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              currentView === 'videos'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-red-500" />
            Videos
          </button>
          <button
            id="nav-testimonials-btn"
            onClick={() => handleNav('testimonials')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              currentView === 'testimonials'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
            Reviews
          </button>
          <button
            id="nav-contact-btn"
            onClick={() => handleNav('contact')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              currentView === 'contact'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle showLabel={false} />

          {/* WhatsApp Direct */}
          <a
            id="nav-whatsapp-direct-btn"
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>

          {/* Book Service CTA */}
          <button
            id="nav-book-service-btn"
            onClick={() => handleBooking()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30 shadow-md shadow-blue-600/20 transition-all active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Service</span>
          </button>

          {/* Admin Switcher */}
          <button
            id="nav-admin-portal-btn"
            onClick={() => handleNav('admin')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              currentView === 'admin'
                ? 'bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/50'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
            }`}
            title="Access Management Dashboard"
          >
            <Lock className="w-3 h-3 text-red-500 dark:text-red-400" />
            <span>Admin</span>
            {unreadCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-mono font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle variant="compact" />

          <button
            id="nav-mobile-book-btn"
            onClick={() => handleBooking()}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600"
          >
            Book
          </button>
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 space-y-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Appearance</span>
            <ThemeToggle variant="pill" />
          </div>

          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNav('services')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentView === 'services' ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Engineering Services</span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-transparent">14 Services</span>
          </button>
          <button
            onClick={() => handleNav('training')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentView === 'training' ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Training Academy</span>
            <span className="text-xs px-2 py-0.5 rounded bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-transparent">Cohorts Open</span>
          </button>
          <button
            onClick={() => handleNav('projects')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Executed Projects
          </button>
          <button
            onClick={() => handleNav('videos')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentView === 'videos' ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <Film className="w-4 h-4 text-red-500" />
              <span>Project Videos Showcase</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-300">YouTube</span>
          </button>
          <button
            onClick={() => handleNav('testimonials')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentView === 'testimonials' ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500/30" />
              <span>Client Reviews & Testimonials</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300">5.0 ★</span>
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'contact' ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Contact & Location
          </button>
          <button
            onClick={() => handleNav('admin')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
              currentView === 'admin' ? 'bg-red-500/20 text-red-700 dark:text-red-200' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Lock className="w-4 h-4 text-red-500 dark:text-red-400" />
            <span>Admin Management Panel</span>
          </button>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Chat on WhatsApp Directly
            </a>
            <button
              onClick={() => {
                handleBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Engineering Service Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
