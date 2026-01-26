-- Pipeline stage enum
CREATE TYPE pipeline_stage AS ENUM (
  'applied',
  'screening',
  'interview',
  'technical',
  'offer',
  'hired',
  'rejected',
  'withdrawn'
);

-- Job enums
CREATE TYPE remote_type AS ENUM ('onsite', 'remote', 'hybrid');
CREATE TYPE employment_type AS ENUM ('full-time', 'part-time', 'contract', 'internship');
CREATE TYPE experience_level AS ENUM ('entry', 'junior', 'mid', 'senior', 'lead', 'manager');
CREATE TYPE job_status AS ENUM ('draft', 'published', 'closed', 'archived');

CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT,
  short_title TEXT,
  description TEXT NOT NULL,
  department TEXT,

  location JSONB,
  locations JSONB,

  remote_type remote_type,
  employment_type employment_type NOT NULL,
  experience_level experience_level,
  seniority TEXT,

  requirements TEXT[],
  responsibilities TEXT[],
  skills TEXT[],
  tags TEXT[],

  salary_range JSONB,
  salary_note TEXT,

  benefits JSONB,
  perks TEXT[],

  visa_sponsorship BOOLEAN,
  number_of_positions INTEGER,

  application_email TEXT,
  apply_url TEXT,
  apply_method TEXT CHECK (apply_method IN ('email', 'url', 'internal', 'linkedin', 'other')),

  posted_at TIMESTAMPTZ,
  closing_date TIMESTAMPTZ,

  is_active BOOLEAN DEFAULT true,
  status job_status DEFAULT 'draft',

  views INTEGER DEFAULT 0,
  applicants_count INTEGER DEFAULT 0,

  public BOOLEAN DEFAULT false,
  locale TEXT,
  external_id TEXT,

  notes TEXT,

  recruiter_id UUID,
  contact_phone TEXT,
  contact_name TEXT,

  attachments JSONB,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ
);

CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_department ON jobs(department);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
