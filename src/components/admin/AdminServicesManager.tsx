import React, { useState } from 'react';
import { ServiceItem } from '../../types';
import { appStore } from '../../services/store';
import { formatNaira } from '../../utils/currency';
import { 
  Wrench, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  X, 
  GraduationCap, 
  Layers, 
  Zap, 
  ShieldCheck,
  Tag
} from 'lucide-react';

interface AdminServicesManagerProps {
  services: ServiceItem[];
  onRefresh?: () => void;
}

export const AdminServicesManager: React.FC<AdminServicesManagerProps> = ({
  services,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceItem['category']>('smart-living');
  const [icon, setIcon] = useState('Home');
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [basePriceEstimate, setBasePriceEstimate] = useState<number>(1500000);
  const [typicalTimeline, setTypicalTimeline] = useState('3-5 Working Days');
  const [featuresInput, setFeaturesInput] = useState('');
  const [brandsInput, setBrandsInput] = useState('');
  const [hasTrainingCourse, setHasTrainingCourse] = useState(false);
  const [trainingCourseId, setTrainingCourseId] = useState('');

  const courses = appStore.getCourses();

  const resetForm = () => {
    setTitle('');
    setCategory('smart-living');
    setIcon('Home');
    setShortDescription('');
    setDetailedDescription('');
    setBasePriceEstimate(1500000);
    setTypicalTimeline('3-5 Working Days');
    setFeaturesInput('');
    setBrandsInput('');
    setHasTrainingCourse(false);
    setTrainingCourseId('');
    setEditingService(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setTitle(srv.title);
    setCategory(srv.category);
    setIcon(srv.icon || 'Wrench');
    setShortDescription(srv.shortDescription);
    setDetailedDescription(srv.detailedDescription);
    setBasePriceEstimate(srv.basePriceEstimate);
    setTypicalTimeline(srv.typicalTimeline);
    setFeaturesInput(srv.keyFeatures.join('\n'));
    setBrandsInput(srv.hardwareBrands.join(', '));
    setHasTrainingCourse(!!srv.hasTrainingCourse);
    setTrainingCourseId(srv.trainingCourseId || '');
    setShowModal(true);
  };

  const handleDelete = (id: string, srvTitle: string) => {
    if (confirm(`Are you sure you want to remove the service "${srvTitle}"?`)) {
      appStore.deleteService(id);
      if (onRefresh) onRefresh();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) {
      alert('Please fill in at least the Service Title and Short Description.');
      return;
    }

    const keyFeatures = featuresInput
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const hardwareBrands = brandsInput
      .split(',')
      .map(b => b.trim())
      .filter(Boolean);

    if (editingService) {
      appStore.updateService(editingService.id, {
        title,
        category,
        icon,
        shortDescription,
        detailedDescription: detailedDescription || shortDescription,
        basePriceEstimate: Number(basePriceEstimate) || 500000,
        typicalTimeline,
        keyFeatures: keyFeatures.length > 0 ? keyFeatures : ['Full Professional Engineering Deployment'],
        hardwareBrands: hardwareBrands.length > 0 ? hardwareBrands : ['Certified OEM Standard'],
        hasTrainingCourse,
        trainingCourseId: hasTrainingCourse ? trainingCourseId : undefined,
      });
    } else {
      appStore.createService({
        title,
        category,
        icon,
        shortDescription,
        detailedDescription: detailedDescription || shortDescription,
        basePriceEstimate: Number(basePriceEstimate) || 500000,
        typicalTimeline,
        keyFeatures: keyFeatures.length > 0 ? keyFeatures : ['Full Professional Engineering Deployment'],
        hardwareBrands: hardwareBrands.length > 0 ? hardwareBrands : ['Certified OEM Standard'],
        hasTrainingCourse,
        trainingCourseId: hasTrainingCourse ? trainingCourseId : undefined,
      });
    }

    setShowModal(false);
    resetForm();
    if (onRefresh) onRefresh();
  };

  const filteredServices = services.filter((srv) => {
    const matchesCategory = categoryFilter === 'all' || srv.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.hardwareBrands.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-display font-bold text-white">
            Engineering Services Directory ({services.length})
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Create, configure and update turnkey engineering disciplines, base pricing in Naira, technical scope, and OEM hardware.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Service</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service title, hardware, specs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Disciplines ({services.length})</option>
            <option value="smart-living">Smart Living & Automation</option>
            <option value="power-energy">Solar, Inverter & ATS</option>
            <option value="security-access">Security & Auto-Gates</option>
            <option value="enterprise-telecom">Telecom & Enterprise</option>
          </select>
        </div>
      </div>

      {/* Services Grid/Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">
                  {srv.category.replace('-', ' ')}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {formatNaira(srv.basePriceEstimate)}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-white mb-1.5 leading-snug">
                {srv.title}
              </h4>

              {/* Description */}
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                {srv.shortDescription}
              </p>

              {/* Timeline & Features */}
              <div className="space-y-1.5 text-xs text-slate-300 mb-4 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>Timeline: {srv.typicalTimeline}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Cpu className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span className="truncate">Brands: {srv.hardwareBrands.slice(0, 3).join(', ')}</span>
                </div>
                {srv.hasTrainingCourse && (
                  <div className="flex items-center gap-1.5 text-[11px] text-red-400">
                    <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Linked to Academy Course</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(srv)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(srv.id, srv.title)}
                className="p-1.5 rounded-lg text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition-colors"
                title="Delete Service"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-blue-400 font-bold mb-1">
                <Wrench className="w-4 h-4" />
                <span>{editingService ? 'Edit Engineering Service' : 'Create New Engineering Service'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {editingService ? `Edit: ${editingService.title}` : 'Define New Service Discipline'}
              </h3>
              <p className="text-xs text-slate-400">
                All details set here immediately appear in the public services grid, quote calculator, and booking system.
              </p>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Electric Vehicle (EV) Charging Infrastructure"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Discipline Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="smart-living">Smart Living & Automation</option>
                    <option value="power-energy">Solar, Inverter & ATS</option>
                    <option value="security-access">Security & Auto-Gates</option>
                    <option value="enterprise-telecom">Enterprise Telecom & VoIP</option>
                  </select>
                </div>
              </div>

              {/* Pricing in Naira & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Base Investment Estimate (₦ Naira) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">₦</span>
                    <input
                      type="number"
                      required
                      min={50000}
                      step={10000}
                      value={basePriceEstimate}
                      onChange={(e) => setBasePriceEstimate(Number(e.target.value))}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Formatted: <strong className="text-emerald-400 font-mono">{formatNaira(basePriceEstimate)}</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Typical Deployment Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3-5 Working Days or 1-2 Weeks"
                    value={typicalTimeline}
                    onChange={(e) => setTypicalTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Card Short Summary *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Concise overview of what is engineered and installed..."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Technical Specifications & Scope
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed engineering breakdown, load analysis, wiring protocols, and deliverables..."
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Features (One per line) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Key Scope Features (Enter one feature per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Pure copper busbar integration&#10;Smart surge suppressor SPD Class II&#10;Remote smartphone monitoring gateway"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Hardware Brands */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  OEM Hardware Brands (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Schneider Electric, Victron Energy, Hikvision, Centurion Systems"
                  value={brandsInput}
                  onChange={(e) => setBrandsInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Link Academy Course */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Link With Academy Course</span>
                    <span className="text-[11px] text-slate-400">Offer visitors the ability to learn to install this discipline themselves</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasTrainingCourse}
                    onChange={(e) => setHasTrainingCourse(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700"
                  />
                </div>

                {hasTrainingCourse && (
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Select Training Course</label>
                    <select
                      value={trainingCourseId}
                      onChange={(e) => setTrainingCourseId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    >
                      <option value="">-- Choose Course --</option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.code}: {c.title} ({formatNaira(c.tuitionFee)})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingService ? 'Update Service' : 'Save & Publish Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
