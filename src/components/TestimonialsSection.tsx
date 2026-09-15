import React, { useState } from 'react';
import { TestimonialItem } from '../types';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Building, 
  GraduationCap, 
  Sparkles, 
  MessageSquarePlus, 
  X, 
  Send, 
  ChevronRight,
  ShieldCheck,
  ThumbsUp
} from 'lucide-react';
import { appStore } from '../services/store';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  onBookService?: () => void;
  onExploreTraining?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onBookService,
  onExploreTraining,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  // Submit testimonial state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newServiceOrCourse, setNewServiceOrCourse] = useState('');
  const [newCategory, setNewCategory] = useState<'smart-living' | 'power-energy' | 'security-access' | 'enterprise-telecom'>('smart-living');
  const [newRating, setNewRating] = useState<number>(5);
  const [newContent, setNewContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'smart-living', label: 'Smart Living & Automation' },
    { id: 'power-energy', label: 'Solar & ATS Systems' },
    { id: 'security-access', label: 'Security & Access Gates' },
    { id: 'enterprise-telecom', label: 'Telecom & IP-PBX' },
  ];

  const filtered = selectedCategory === 'all'
    ? testimonials
    : testimonials.filter(t => t.serviceCategory === selectedCategory);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newContent || !newServiceOrCourse) {
      alert('Please enter your name, service/course, and review text.');
      return;
    }

    appStore.addTestimonial({
      name: newName,
      role: newRole || 'Client',
      companyOrLocation: newCompany || 'Lagos, Nigeria',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      rating: newRating,
      serviceCategory: newCategory,
      serviceOrCourse: newServiceOrCourse,
      content: newContent,
      verifiedProject: true,
      date: 'Recent'
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowSubmitModal(false);
      setNewName('');
      setNewRole('');
      setNewCompany('');
      setNewServiceOrCourse('');
      setNewContent('');
    }, 1500);
  };

  return (
    <section id="testimonials-section" className="py-20 bg-white dark:bg-slate-900/60 relative border-t border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Client & Academy Alumni Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              What Clients & Students Say
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              From high-capacity hospital solar installations and smart villa automations to hands-on certified graduates thriving in the engineering industry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80 shadow-sm transition-all"
            >
              <MessageSquarePlus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Share Your Review</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 dark:from-blue-500/15 to-transparent rounded-bl-full pointer-events-none" />

              <div>
                {/* Rating and Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {item.verifiedProject && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Deployment</span>
                    </span>
                  )}
                </div>

                {/* Service Tag */}
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-700/60 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-600/40">
                    {item.serviceOrCourse}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-600"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                    {item.companyOrLocation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-700/30">
          <div>
            <h3 className="text-xl font-bold font-display">Experience the Ebentrick Engineering Standard</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              "Light makes the difference." Request a technical consultation in Naira with guaranteed 24-month warranties.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {onBookService && (
              <button
                onClick={onBookService}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all"
              >
                Book Engineering Service
              </button>
            )}
            {onExploreTraining && (
              <button
                onClick={onExploreTraining}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                Enroll In Academy
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thank You!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your review has been successfully published to our testimonials directory.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Share Your Experience</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Review our service engineering or academy training course.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Kunle Adeleke"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Designation / Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Managing Director"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Victoria Island, Lagos"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="smart-living">Smart Living</option>
                      <option value="power-energy">Solar & Power ATS</option>
                      <option value="security-access">Security & Gates</option>
                      <option value="enterprise-telecom">Telecom & VoIP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Great Work</option>
                      <option value={3}>3 Stars - Satisfactory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Service or Course Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15kVA Solar Installation or Smart Home Mastery"
                    value={newServiceOrCourse}
                    onChange={(e) => setNewServiceOrCourse(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Review Feedback *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your satisfaction with Ebentrick's engineering standards, punctuality, and equipment..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
