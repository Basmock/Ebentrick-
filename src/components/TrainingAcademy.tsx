import React, { useState } from 'react';
import { TrainingCourse } from '../types';
import { formatNaira } from '../utils/currency';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  BookOpen, 
  Wrench, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { appStore } from '../services/store';

interface TrainingAcademyProps {
  courses: TrainingCourse[];
  onEnroll: (courseId: string, cohortId?: string) => void;
  onRequestCustomTraining: () => void;
}

export const TrainingAcademy: React.FC<TrainingAcademyProps> = ({
  courses,
  onEnroll,
  onRequestCustomTraining,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  return (
    <section id="training-section" className="py-16 bg-white dark:bg-slate-950 relative border-t border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Ebentrick Technical Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Learn From Practicing Field Engineers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            We don't just provide turnkey engineering services — we train the next generation of automation specialists, solar architects, and electrical engineers with hands-on lab workbenches.
          </p>
        </div>

        {/* Academy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">80% Hands-On Lab Work</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Real equipment, live power rigs, and industrial simulators. No boring passive slides.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Industry Recognized Certification</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Graduates receive verified digital and physical certificates accredited by technical councils.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Career & Job Placement Network</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Top graduates are recruited into Ebentrick field teams or referred to leading construction and telco firms.
              </p>
            </div>
          </div>
        </div>

        {/* Course Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourseId(course.id);
                setExpandedWeek(1);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCourseId === course.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{course.title}</span>
              <span className="font-mono text-[10px] opacity-70">({course.durationWeeks} wks)</span>
            </button>
          ))}
        </div>

        {/* Selected Course Deep-Dive Card */}
        {activeCourse && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Columns: Curriculum & Course Specs */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                      {activeCourse.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      Level: {activeCourse.level}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                    {activeCourse.title}
                  </h3>
                </div>

                {/* Quick Meta Row */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono">Duration</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{activeCourse.durationWeeks} Weeks</div>
                    <div className="text-[10px] text-slate-500">({activeCourse.hoursPerWeek} hrs/week)</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono">Lead Instructor</div>
                    <div className="text-base font-bold text-blue-600 dark:text-blue-400 mt-0.5 line-clamp-1">{activeCourse.instructorName}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1">{activeCourse.instructorRole}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono">Certification</div>
                    <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Accredited</div>
                    <div className="text-[10px] text-slate-500">Digital + Physical Seal</div>
                  </div>
                </div>

                {/* Week-by-Week Syllabus Accordion */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-red-500 dark:text-red-400" />
                    Detailed Syllabus & Practical Labs
                  </h4>

                  <div className="space-y-2.5">
                    {activeCourse.syllabus.map((mod) => {
                      const isExpanded = expandedWeek === mod.week;
                      return (
                        <div
                          key={mod.week}
                          className="rounded-xl bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
                        >
                          <button
                            onClick={() => setExpandedWeek(isExpanded ? null : mod.week)}
                            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-600/20 text-red-700 dark:text-red-400 text-xs font-mono font-bold flex items-center justify-center border border-red-200 dark:border-red-500/30">
                                W{mod.week}
                              </span>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {mod.moduleTitle}
                              </span>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="p-4 pt-0 text-xs text-slate-700 dark:text-slate-300 space-y-2.5 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/60">
                              <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                                {mod.description}
                              </p>
                              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/20 text-blue-900 dark:text-blue-200">
                                <span className="font-bold text-blue-700 dark:text-blue-400 block mb-0.5">
                                  🔬 Hands-On Bench Lab:
                                </span>
                                {mod.handsOnLab}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hardware Kit Included */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Student Hardware Kit (Included With Tuition):
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCourse.hardwareProvided.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Upcoming Cohort Schedules & Enrollment Box */}
              <div className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 shadow-md">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Total Tuition</span>
                    <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                      {formatNaira(activeCourse.tuitionFee)}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    *Installment payment options available (50% deposit on admission).
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-red-500 dark:text-red-400" />
                      Upcoming Cohorts & Availability
                    </h5>

                    <div className="space-y-3">
                      {activeCourse.nextCohorts.map((coh) => (
                        <div
                          key={coh.id}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{coh.startDate}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                coh.status === 'filling_fast'
                                  ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30'
                                  : coh.status === 'closed'
                                  ? 'bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/30'
                                  : 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                              }`}
                            >
                              {coh.status.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-600 dark:text-slate-400">{coh.format}</div>

                          {/* Seat progress bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              <span>Capacity:</span>
                              <span>
                                {coh.enrolledSeats} / {coh.maxSeats} seats reserved
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-red-500 rounded-full"
                                style={{ width: `${(coh.enrolledSeats / coh.maxSeats) * 100}%` }}
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => onEnroll(activeCourse.id, coh.id)}
                            disabled={coh.status === 'closed'}
                            className="mt-1 w-full py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all flex items-center justify-center gap-1"
                          >
                            <span>Reserve Seat In This Cohort</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Need private corporate cohort training?</p>
                  <button
                    onClick={onRequestCustomTraining}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Request Custom Corporate Syllabus & Quote →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
