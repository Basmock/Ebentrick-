import React, { useState } from 'react';
import { PROJECT_CASE_STUDIES } from '../data/mockData';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  Award
} from 'lucide-react';

interface ProjectsShowcaseProps {
  onBookService: (serviceId?: string) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  onBookService,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredProjects = PROJECT_CASE_STUDIES.filter(p => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <section id="projects-section" className="py-16 bg-slate-50 dark:bg-slate-900/60 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Proven Engineering Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Executed Projects & Case Studies
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Explore how Ebentrick Global Services powers luxury residences, hospitality resorts, and industrial processing factories with zero-downtime solutions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'smart-living', label: 'Smart Homes & Automation' },
            { id: 'enterprise-telecom', label: 'Hospitality & Telecom' },
            { id: 'power-energy', label: 'Heavy Power & ATS' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    {proj.location}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Year {proj.year}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                  {proj.title}
                </h3>

                <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono font-medium">
                  Client: <span className="text-slate-800 dark:text-slate-200">{proj.client}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {proj.summary}
                </p>

                {/* Services Provided */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 block mb-1.5 font-bold">
                    Disciplines Deployed:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.servicesSupplied.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                  {proj.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Outcome Metric</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">{proj.metrics}</span>
                </div>

                <button
                  onClick={() => onBookService()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
