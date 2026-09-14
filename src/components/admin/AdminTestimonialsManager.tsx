import React, { useState } from 'react';
import { TestimonialItem } from '../../types';
import { appStore } from '../../services/store';
import { 
  Star, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  MessageSquare, 
  Search, 
  CheckCircle2, 
  X,
  Building
} from 'lucide-react';

interface AdminTestimonialsManagerProps {
  testimonials: TestimonialItem[];
  onRefresh?: () => void;
}

export const AdminTestimonialsManager: React.FC<AdminTestimonialsManagerProps> = ({
  testimonials,
  onRefresh,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [companyOrLocation, setCompanyOrLocation] = useState('');
  const [serviceOrCourse, setServiceOrCourse] = useState('');
  const [serviceCategory, setServiceCategory] = useState<TestimonialItem['serviceCategory']>('smart-living');
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState('');
  const [verifiedProject, setVerifiedProject] = useState(true);

  const resetForm = () => {
    setName('');
    setRole('');
    setCompanyOrLocation('');
    setServiceOrCourse('');
    setServiceCategory('smart-living');
    setRating(5);
    setContent('');
    setVerifiedProject(true);
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim() || !serviceOrCourse.trim()) {
      alert('Please provide client name, review content, and service/course name.');
      return;
    }

    appStore.addTestimonial({
      name,
      role: role || 'Client',
      companyOrLocation: companyOrLocation || 'Lagos, Nigeria',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      rating,
      serviceCategory,
      serviceOrCourse,
      content,
      verifiedProject,
      date: 'Recent'
    });

    setShowAddModal(false);
    resetForm();
    if (onRefresh) onRefresh();
  };

  const handleDelete = (id: string, clientName: string) => {
    if (confirm(`Delete testimonial from ${clientName}?`)) {
      appStore.deleteTestimonial(id);
      if (onRefresh) onRefresh();
    }
  };

  const filtered = testimonials.filter(t =>
    searchQuery === '' ||
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.serviceOrCourse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-display font-bold text-white">
            Client & Student Testimonials ({testimonials.length})
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Curate verified client feedback and graduate reviews displayed on the website.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md shadow-amber-600/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search testimonials by client, company, or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {t.verifiedProject && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>

              <div className="mb-2">
                <span className="text-[11px] font-mono font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded">
                  {t.serviceOrCourse}
                </span>
              </div>

              <p className="text-xs text-slate-300 italic line-clamp-3 leading-relaxed mb-4">
                "{t.content}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-2">
                <div className="text-xs font-bold text-white truncate">{t.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{t.role} • {t.companyOrLocation}</div>
              </div>

              <button
                onClick={() => handleDelete(t.id, t.name)}
                className="p-1.5 rounded-lg text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition-colors"
                title="Delete Testimonial"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAddTestimonial} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold mb-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Add Verified Testimonial</span>
              </div>
              <h3 className="text-xl font-bold text-white">Record Client / Student Story</h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Client / Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Babatunde Fashola"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chief Medical Director"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Company / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Victoria Island, Lagos"
                    value={companyOrLocation}
                    onChange={(e) => setCompanyOrLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="smart-living">Smart Living</option>
                    <option value="power-energy">Solar & ATS Power</option>
                    <option value="security-access">Security & Gates</option>
                    <option value="enterprise-telecom">Enterprise Telecom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Great Work</option>
                    <option value={3}>3 Stars - Satisfactory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Service Or Academy Course *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 20kVA Hospital Solar Installation or Smart Home Course"
                  value={serviceOrCourse}
                  onChange={(e) => setServiceOrCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Client words detailing satisfaction, uptime, technical craftsmanship..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md shadow-amber-600/30"
                >
                  Publish Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
