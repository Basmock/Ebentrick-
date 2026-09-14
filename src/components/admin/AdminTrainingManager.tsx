import React, { useState } from 'react';
import { TrainingCourse, TrainingCohort } from '../../types';
import { appStore } from '../../services/store';
import { formatNaira } from '../../utils/currency';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award, 
  Layers, 
  X, 
  Users, 
  Wrench, 
  BookOpen,
  DollarSign
} from 'lucide-react';

interface AdminTrainingManagerProps {
  courses: TrainingCourse[];
  onRefresh?: () => void;
}

export const AdminTrainingManager: React.FC<AdminTrainingManagerProps> = ({
  courses,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<TrainingCourse | null>(null);

  // Cohort creation modal
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [selectedCourseForCohort, setSelectedCourseForCohort] = useState<string>('');
  const [cohortStartDate, setCohortStartDate] = useState('');
  const [cohortEndDate, setCohortEndDate] = useState('');
  const [cohortFormat, setCohortFormat] = useState('Full-Time Intensive (Mon-Fri Lab)');
  const [cohortMaxSeats, setCohortMaxSeats] = useState(15);
  const [cohortInstructor, setCohortInstructor] = useState('Engr. Ebenezer Trickson');

  // Course form states
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState<TrainingCourse['category']>('smart-living');
  const [durationWeeks, setDurationWeeks] = useState<number>(6);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(12);
  const [tuitionFee, setTuitionFee] = useState<number>(350000);
  const [level, setLevel] = useState<TrainingCourse['level']>('Beginner / Foundation');
  const [description, setDescription] = useState('');
  const [syllabusInput, setSyllabusInput] = useState('');
  const [hardwareKitIncluded, setHardwareKitIncluded] = useState('');
  const [certificationTitle, setCertificationTitle] = useState('');
  const [prerequisites, setPrerequisites] = useState('Basic secondary school science or electrical curiosity');

  // Initial Cohort for new course
  const [initCohortStartDate, setInitCohortStartDate] = useState('');
  const [initCohortEndDate, setInitCohortEndDate] = useState('');
  const [initCohortInstructor, setInitCohortInstructor] = useState('Engr. Ebenezer Trickson');

  const resetForm = () => {
    setTitle('');
    setCode('');
    setCategory('smart-living');
    setDurationWeeks(6);
    setHoursPerWeek(12);
    setTuitionFee(350000);
    setLevel('Beginner / Foundation');
    setDescription('');
    setSyllabusInput('');
    setHardwareKitIncluded('');
    setCertificationTitle('');
    setPrerequisites('Basic secondary school science or electrical curiosity');
    setInitCohortStartDate('');
    setInitCohortEndDate('');
    setInitCohortInstructor('Engr. Ebenezer Trickson');
    setEditingCourse(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (c: TrainingCourse) => {
    setEditingCourse(c);
    setTitle(c.title);
    setCode(c.code);
    setCategory(c.category);
    setDurationWeeks(c.durationWeeks);
    setHoursPerWeek(c.hoursPerWeek);
    setTuitionFee(c.tuitionFee);
    setLevel(c.level);
    setDescription(c.description);
    setSyllabusInput(c.syllabus.join('\n'));
    setHardwareKitIncluded(c.hardwareKitIncluded);
    setCertificationTitle(c.certificationTitle);
    setPrerequisites(c.prerequisites || '');
    setShowModal(true);
  };

  const handleDeleteCourse = (id: string, cTitle: string) => {
    if (confirm(`Are you sure you want to remove the course "${cTitle}"?`)) {
      appStore.deleteCourse(id);
      if (onRefresh) onRefresh();
    }
  };

  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim() || !description.trim()) {
      alert('Please fill in Course Title, Program Code, and Overview.');
      return;
    }

    const syllabus = syllabusInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const initialCohorts: TrainingCohort[] = [];
    if (!editingCourse && initCohortStartDate && initCohortEndDate) {
      initialCohorts.push({
        id: `coh-${Date.now()}`,
        startDate: initCohortStartDate,
        endDate: initCohortEndDate,
        format: 'Full-Time Intensive (Mon-Fri Lab)',
        maxSeats: 16,
        enrolledSeats: 0,
        status: 'open',
        instructor: initCohortInstructor || 'Engr. Ebenezer Trickson'
      });
    }

    if (editingCourse) {
      appStore.updateCourse(editingCourse.id, {
        title,
        code,
        category,
        durationWeeks: Number(durationWeeks),
        hoursPerWeek: Number(hoursPerWeek),
        tuitionFee: Number(tuitionFee),
        level,
        description,
        syllabus: syllabus.length > 0 ? syllabus : ['Hands-on laboratory training and practical exams.'],
        hardwareKitIncluded: hardwareKitIncluded || 'Complete student laboratory starter kit',
        certificationTitle: certificationTitle || `Ebentrick Certified ${title} Specialist`,
        prerequisites,
      });
    } else {
      appStore.createCourse({
        title,
        code,
        category,
        durationWeeks: Number(durationWeeks),
        hoursPerWeek: Number(hoursPerWeek),
        tuitionFee: Number(tuitionFee),
        level,
        description,
        syllabus: syllabus.length > 0 ? syllabus : ['Hands-on laboratory training and practical exams.'],
        hardwareKitIncluded: hardwareKitIncluded || 'Complete student laboratory starter kit',
        certificationTitle: certificationTitle || `Ebentrick Certified ${title} Specialist`,
        prerequisites,
        nextCohorts: initialCohorts,
      });
    }

    setShowModal(false);
    resetForm();
    if (onRefresh) onRefresh();
  };

  const handleAddCohort = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseForCohort || !cohortStartDate || !cohortEndDate) {
      alert('Please select course and specify dates.');
      return;
    }

    appStore.addCohort(selectedCourseForCohort, {
      startDate: cohortStartDate,
      endDate: cohortEndDate,
      format: cohortFormat,
      maxSeats: Number(cohortMaxSeats),
      instructor: cohortInstructor,
      status: 'open'
    });

    setShowCohortModal(false);
    setSelectedCourseForCohort('');
    setCohortStartDate('');
    setCohortEndDate('');
    if (onRefresh) onRefresh();
  };

  const filteredCourses = courses.filter((c) => {
    return searchQuery === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-display font-bold text-white">
            Technical Academy Courses ({courses.length})
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Create new training curricula, set tuition in Naira, update syllabi, and open running cohorts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setSelectedCourseForCohort(courses[0]?.id || '');
              setShowCohortModal(true);
            }}
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Open Cohort</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search course title, program code, syllabus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2.5 py-0.5 rounded-lg">
                  {course.code}
                </span>
                <span className="text-sm font-mono font-extrabold text-emerald-400">
                  {formatNaira(course.tuitionFee)}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2">
                {course.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                {course.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 py-3 border-y border-slate-800 mb-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  <span>{course.durationWeeks} Weeks ({course.hoursPerWeek} hrs/wk)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate">{course.level}</span>
                </div>
              </div>

              {/* Cohorts summary */}
              <div className="mb-4">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 font-bold block mb-1.5">
                  Scheduled Cohorts ({course.nextCohorts.length}):
                </span>
                <div className="space-y-1.5">
                  {course.nextCohorts.map((coh) => (
                    <div
                      key={coh.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px]"
                    >
                      <span className="text-slate-300 font-medium">
                        {coh.startDate} — {coh.endDate}
                      </span>
                      <span className="font-mono text-emerald-400">
                        {coh.enrolledSeats}/{coh.maxSeats} seats
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedCourseForCohort(course.id);
                  setShowCohortModal(true);
                }}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Cohort</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() => handleDeleteCourse(course.id, course.title)}
                  className="p-1.5 rounded-lg text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40"
                  title="Delete Course"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSubmitCourse} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-red-400 font-bold mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>{editingCourse ? 'Edit Academy Course' : 'Create New Academy Course'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {editingCourse ? `Edit: ${editingCourse.title}` : 'Develop Technical Course'}
              </h3>
              <p className="text-xs text-slate-400">
                All details set here will appear in the Academy view, enrollment modal, and cohort registration system.
              </p>

              {/* Title & Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Industrial Automation, PLC & SCADA Systems"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Program Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PLC-401"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Category, Duration, Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="smart-living">Smart Living & KNX</option>
                    <option value="power-energy">Solar & Hybrid Power</option>
                    <option value="security-access">Security & Auto-Gates</option>
                    <option value="enterprise-telecom">Telecom & Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Duration (Weeks)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={52}
                    value={durationWeeks}
                    onChange={(e) => setDurationWeeks(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Hours Per Week
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={40}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Tuition in Naira & Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Tuition Fee (₦ Naira) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">₦</span>
                    <input
                      type="number"
                      required
                      min={10000}
                      step={5000}
                      value={tuitionFee}
                      onChange={(e) => setTuitionFee(Number(e.target.value))}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Formatted: <strong className="text-emerald-400 font-mono">{formatNaira(tuitionFee)}</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Skill Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Beginner / Foundation">Beginner / Foundation</option>
                    <option value="Intermediate / Practitioner">Intermediate / Practitioner</option>
                    <option value="Advanced / Professional">Advanced / Professional</option>
                  </select>
                </div>
              </div>

              {/* Overview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Course Overview & Description *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary of skills acquired, industry relevance, and hands-on laboratory scope..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Syllabus (One per line) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Syllabus Modules (One module per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Week 1: Fundamentals and Safety Protocols&#10;Week 2: Circuit Design & Schematic Reading&#10;Week 3: Physical Hardware Wiring & Lab Commissioning"
                  value={syllabusInput}
                  onChange={(e) => setSyllabusInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Hardware Kit and Certification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Hardware Kit Included
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Student Multimeter, Relay Board, Sensors, Screwdriver Set"
                    value={hardwareKitIncluded}
                    onChange={(e) => setHardwareKitIncluded(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Official Certificate Awarded
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ebentrick Certified Professional"
                    value={certificationTitle}
                    onChange={(e) => setCertificationTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Prerequisites */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Student Entry Prerequisites
                </label>
                <input
                  type="text"
                  placeholder="e.g. Basic physics/secondary school science or electrical background"
                  value={prerequisites}
                  onChange={(e) => setPrerequisites(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Initial Cohort (only for new course) */}
              {!editingCourse && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-white block">
                    Optional: Schedule First Cohort Now
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={initCohortStartDate}
                        onChange={(e) => setInitCohortStartDate(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">End Date</label>
                      <input
                        type="date"
                        value={initCohortEndDate}
                        onChange={(e) => setInitCohortEndDate(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Instructor</label>
                      <input
                        type="text"
                        value={initCohortInstructor}
                        onChange={(e) => setInitCohortInstructor(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

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
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingCourse ? 'Update Course' : 'Save & Publish Course'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cohort Creation Modal */}
      {showCohortModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setShowCohortModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAddCohort} className="space-y-4">
              <h3 className="text-xl font-bold text-white">Open New Cohort Schedule</h3>
              <p className="text-xs text-slate-400">Open lab seats and calendar dates for students to register.</p>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Select Course *</label>
                <select
                  value={selectedCourseForCohort}
                  onChange={(e) => setSelectedCourseForCohort(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  required
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code}: {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={cohortStartDate}
                    onChange={(e) => setCohortStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">End Date *</label>
                  <input
                    type="date"
                    required
                    value={cohortEndDate}
                    onChange={(e) => setCohortEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Format</label>
                <input
                  type="text"
                  value={cohortFormat}
                  onChange={(e) => setCohortFormat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Max Seat Capacity</label>
                  <input
                    type="number"
                    min={5}
                    max={40}
                    value={cohortMaxSeats}
                    onChange={(e) => setCohortMaxSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Lead Instructor</label>
                  <input
                    type="text"
                    value={cohortInstructor}
                    onChange={(e) => setCohortInstructor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCohortModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500"
                >
                  Publish Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
