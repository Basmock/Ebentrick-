import { Client } from 'pg';

const client = new Client({
  connectionString: "postgresql://postgres:Mockfast1122@db.tvrdiaokpgxhglogjvsp.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false }
});

async function setupTables() {
  await client.connect();
  console.log("Connected to Supabase Postgres.");

  const sql = `
    CREATE TABLE IF NOT EXISTS public.profiles (
      id UUID PRIMARY KEY,
      email TEXT,
      name TEXT,
      role TEXT DEFAULT 'client',
      phone TEXT,
      company TEXT,
      avatar_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS public.services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      short_description TEXT,
      full_description TEXT,
      base_price_ngn NUMERIC,
      unit_type TEXT,
      features JSONB DEFAULT '[]'::jsonb,
      image_url TEXT,
      rating NUMERIC DEFAULT 5,
      reviews_count INT DEFAULT 0,
      turnaround_time TEXT,
      hardware_brands JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS public.courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      level TEXT,
      duration_weeks INT,
      tuition_ngn NUMERIC,
      batch_schedule TEXT,
      next_batch_date TEXT,
      syllabus JSONB DEFAULT '[]'::jsonb,
      hardware_provided JSONB DEFAULT '[]'::jsonb,
      certification_awarded TEXT,
      career_outcomes JSONB DEFAULT '[]'::jsonb,
      image_url TEXT,
      seats_available INT DEFAULT 12,
      enrolled_count INT DEFAULT 0,
      rating NUMERIC DEFAULT 5,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS public.bookings (
      id TEXT PRIMARY KEY,
      reference_id TEXT UNIQUE NOT NULL,
      service_id TEXT,
      service_name TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      site_address TEXT NOT NULL,
      property_type TEXT,
      estimated_scope TEXT,
      inspection_date TEXT,
      total_estimated_ngn NUMERIC DEFAULT 0,
      status TEXT DEFAULT 'pending',
      payment_status TEXT DEFAULT 'unpaid',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS public.inquiries (
      id TEXT PRIMARY KEY,
      reference_id TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service_interest TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      priority TEXT DEFAULT 'normal',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS public.testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      company_or_location TEXT,
      service_or_course TEXT NOT NULL,
      service_category TEXT,
      content TEXT NOT NULL,
      rating INT DEFAULT 5,
      verified_project BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS public.project_videos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      youtube_url TEXT NOT NULL,
      youtube_id TEXT NOT NULL,
      duration TEXT,
      description TEXT,
      client_or_location TEXT,
      tags JSONB DEFAULT '[]'::jsonb,
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Enable RLS
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.project_videos ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Public read services" ON public.services;
    DROP POLICY IF EXISTS "Public read courses" ON public.courses;
    DROP POLICY IF EXISTS "Public read testimonials" ON public.testimonials;
    DROP POLICY IF EXISTS "Public read videos" ON public.project_videos;
    DROP POLICY IF EXISTS "Public read/write bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Public read/write inquiries" ON public.inquiries;
    DROP POLICY IF EXISTS "Public all profiles" ON public.profiles;

    CREATE POLICY "Public read services" ON public.services FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
    CREATE POLICY "Public read courses" ON public.courses FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
    CREATE POLICY "Public read testimonials" ON public.testimonials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
    CREATE POLICY "Public read videos" ON public.project_videos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
    CREATE POLICY "Public read/write bookings" ON public.bookings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
    CREATE POLICY "Public read/write inquiries" ON public.inquiries FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
    CREATE POLICY "Public all profiles" ON public.profiles FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

    GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
  `;

  await client.query(sql);
  console.log("All tables and policies created successfully!");

  await client.query(`
    INSERT INTO public.profiles (id, email, name, role, phone, company)
    VALUES (
      '350afc5a-9ae9-45d8-9c9b-ad64441da431',
      'workebentrick@gmail.com',
      'Engr. Bassey Okon',
      'admin',
      '+234 803 245 8901',
      'Ebentrick Global Services Ltd'
    )
    ON CONFLICT (id) DO UPDATE SET
      role = 'admin',
      company = 'Ebentrick Global Services Ltd',
      name = 'Engr. Bassey Okon';
  `);
  console.log("Admin manager profile seeded for UID 350afc5a-9ae9-45d8-9c9b-ad64441da431");

  await client.end();
}

setupTables().catch(err => {
  console.error("Error setting up tables:", err);
  process.exit(1);
});
