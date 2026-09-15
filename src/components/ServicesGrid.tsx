import React, { useState } from 'react';
import { 
  ServiceItem, 
  ServiceCategory 
} from '../types';
import { formatNaira } from '../utils/currency';
import { 
  Home, 
  Zap, 
  RefreshCw, 
  Sun, 
  Shield, 
  ShieldAlert, 
  Film, 
  PhoneCall, 
  Cpu, 
  Tv, 
  Camera, 
  Key, 
  Layers, 
  Fingerprint, 
  Search, 
  ArrowUpRight, 
  GraduationCap, 
  Check, 
  Wrench,
  Clock,
  Sparkles
} from 'lucide-react';

interface ServicesGridProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onBookService: (serviceId: string) => void;
  onViewTraining: (courseId?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  services,
  onSelectService,
  onBookService,
  onViewTraining,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-5 h-5 text-blue-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5 text-emerald-400" />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'Film': return <Film className="w-5 h-5 text-purple-400" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-rose-400" />;
      case 'Tv': return <Tv className="w-5 h-5 text-sky-400" />;
      case 'Camera': return <Camera className="w-5 h-5 text-emerald-400" />;
      case 'Key': return <Key className="w-5 h-5 text-amber-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Fingerprint': return <Fingerprint className="w-5 h-5 text-red-400" />;
      default: return <Wrench className="w-5 h-5 text-blue-400" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Services (14)' },
    { id: 'smart-living', label: 'Smart Living & Cinema' },
    { id: 'power-energy', label: 'Power, Solar & ATS' },
    { id: 'security-access', label: 'Security & Access' },
    { id: 'enterprise-telecom', label: 'Telecom & Displays' },
    { id: 'electronics-design', label: 'Custom Electronics' },
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchesSearch = 
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.hardwareBrands.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services-section" className="py-16 bg-white dark:bg-slate-900/50 relative border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <span>Full Capabilities Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Turnkey Engineering Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-1.5">
              From residential automated villas to heavy-duty industrial ATS switches and commercial video telecom, our engineering division delivers end-to-end precision.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services or hardware..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 dark:hover:shadow-blue-900/20"
            >
              {/* Top Row: Icon, Badge & Timeline */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform">
                    {getServiceIcon(srv.iconName)}
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    {srv.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                        {srv.badge}
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      {srv.completionTimeline}
                    </span>
                  </div>
                </div>

                {/* Service Name & Tagline */}
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {srv.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {srv.tagline}
                </p>

                {/* Key Features List */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Key Highlights:
                  </div>
                  {srv.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Hardware Brands */}
                <div className="mt-4 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono">Brands:</span>
                  {srv.hardwareBrands.slice(0, 3).map((brand, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {brand}
                    </span>
                  ))}
                  {srv.hardwareBrands.length > 3 && (
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                      +{srv.hardwareBrands.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions & Training Link */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono block">Base Investment</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                      From {formatNaira(srv.basePriceEstimate)}
                    </span>
                  </div>

                  {srv.hasTrainingCourse && (
                    <button
                      onClick={() => onViewTraining(srv.trainingCourseId)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-lg border border-red-200 dark:border-red-500/20 hover:border-red-300 dark:hover:border-red-500/40 transition-colors"
                      title="Learn hands-on installation of this service at our Academy"
                    >
                      <GraduationCap className="w-3 h-3" />
                      <span>Training Available</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectService(srv)}
                    className="py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Full Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onBookService(srv.id)}
                    className="py-2 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-sm shadow-blue-600/30 transition-all flex items-center justify-center gap-1 active:scale-95"
                  >
                    <span>Book Service</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-slate-400 text-sm">No engineering services found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-blue-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
