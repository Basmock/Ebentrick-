import { createClient } from '@supabase/supabase-js';
import { INITIAL_SERVICES, INITIAL_TRAINING_COURSES, INITIAL_TESTIMONIALS, INITIAL_PROJECT_VIDEOS } from '../src/data/mockData';

const url = 'https://tvrdiaokpgxhglogjvsp.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2cmRpYW9rcGd4aGdsb2dqdnNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTQ0MjU2NywiZXhwIjoyMTA1MDE4NTY3fQ.hM8GEoqHQqGSoBvGKH3DTrI6H4L9xBXZ09hgv2NkHIc';
const supabase = createClient(url, serviceKey);

async function seed() {
  console.log('Seeding Supabase database with initial data...');

  // 1. Services
  const servicesData = INITIAL_SERVICES.map(s => ({
    id: s.id,
    title: s.name,
    category: s.category,
    short_description: s.tagline,
    full_description: s.description,
    base_price_ngn: s.basePriceEstimate,
    unit_type: 'project',
    features: s.keyFeatures,
    image_url: (s as any).imageUrl || '',
    turnaround_time: s.completionTimeline,
    hardware_brands: s.hardwareBrands
  }));

  const { error: sErr } = await supabase.from('services').upsert(servicesData);
  console.log('Services seeded:', sErr ? sErr.message : 'OK (' + servicesData.length + ')');

  // 2. Courses
  const coursesData = INITIAL_TRAINING_COURSES.map(c => ({
    id: c.id,
    title: c.title,
    level: c.level,
    duration_weeks: c.durationWeeks || 4,
    tuition_ngn: c.tuitionFee,
    batch_schedule: c.nextCohorts?.[0]?.format || 'Weekend Hands-on & Weekday Lab',
    next_batch_date: c.nextCohorts?.[0]?.startDate || 'Upcoming Cohort',
    syllabus: Array.isArray(c.syllabus) ? c.syllabus : [],
    hardware_provided: Array.isArray(c.hardwareProvided) ? c.hardwareProvided : [],
    certification_awarded: c.certificationAwarded || c.certificationTitle || 'Ebentrick Certified Specialist',
    career_outcomes: ['Field Engineering Specialist', 'System Integrator'],
    image_url: '',
    seats_available: c.nextCohorts?.[0]?.maxSeats || 12,
    enrolled_count: c.nextCohorts?.[0]?.enrolledSeats || 0,
    rating: 5
  }));

  const { error: cErr } = await supabase.from('courses').upsert(coursesData);
  console.log('Courses seeded:', cErr ? cErr.message : 'OK (' + coursesData.length + ')');

  // 3. Testimonials
  const testimonialsData = INITIAL_TESTIMONIALS.map(t => ({
    id: t.id,
    name: t.name,
    role: t.role,
    company_or_location: t.companyOrLocation,
    service_or_course: t.serviceOrCourse,
    service_category: t.serviceCategory,
    content: t.content,
    rating: t.rating,
    verified_project: t.verifiedProject
  }));

  const { error: tErr } = await supabase.from('testimonials').upsert(testimonialsData);
  console.log('Testimonials seeded:', tErr ? tErr.message : 'OK (' + testimonialsData.length + ')');

  // 4. Project Videos
  const videosData = INITIAL_PROJECT_VIDEOS.map(v => ({
    id: v.id,
    title: v.title,
    category: v.category,
    youtube_url: v.youtubeUrl,
    youtube_id: v.youtubeId,
    duration: v.duration,
    description: v.description,
    client_or_location: v.clientOrLocation,
    tags: v.tags,
    featured: v.featured
  }));

  const { error: vErr } = await supabase.from('project_videos').upsert(videosData);
  console.log('Videos seeded:', vErr ? vErr.message : 'OK (' + videosData.length + ')');

  console.log('Supabase Database seeding complete!');
}

seed().catch(console.error);
