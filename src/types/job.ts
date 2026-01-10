export type RemoteType = "onsite" | "remote" | "hybrid";
export type EmploymentType = "full-time" | "part-time" | "contract" | "internship";
export type ExperienceLevel = "entry" | "junior" | "mid" | "senior" | "lead" | "manager";
export type JobStatus = "draft" | "published" | "closed" | "archived";

export type SalaryRange = {
  min: number;
  max: number;
  currency: string; // ISO 4217, e.g. "USD", "VND"
  frequency?: "monthly" | "yearly" | "hourly"; // optional
  visible?: boolean; // show salary publicly
};

export type Location = {
  city?: string;
  region?: string; // state/province
  country?: string;
  address?: string; // full address
  remote?: boolean;
};

export type TJob = {
  id: string;
  companyId?: string; // liên kết employer/company
  title: string;
  slug?: string; // seo friendly url
  short_title?: string; // optional short version
  description: string; // rich text / HTML / markdown
  department?: string;
  location?: Location | string; // object or simple string
  locations?: Location[]; // nhiều địa điểm nếu có
  remote_type?: RemoteType;
  employment_type: EmploymentType;
  experience_level?: ExperienceLevel;
  seniority?: string; // optional free text seniority
  requirements: string[]; // bullet list
  responsibilities: string[]; // bullet list
  skills?: string[]; // explicit skill tags
  tags?: string[]; // for search / categorization
  salary_range?: SalaryRange;
  salary_note?: string; // e.g. "Negotiable", "DOE"
  benefits?: string[] | { name: string; description?: string }[];
  perks?: string[]; // separate from benefits if needed
  visa_sponsorship?: boolean;
  number_of_positions?: number;
  application_email?: string; // optional if apply by email
  apply_url?: string; // portal / external link
  apply_method?: "email" | "url" | "internal" | "linkedin" | "other";
  posted_at: string; // ISO date string
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
  closing_date?: string | null; // ISO date string
  is_active: boolean;
  status?: JobStatus;
  views?: number;
  applicants_count?: number;
  public?: boolean; // visible to public site
  locale?: string; // for i18n, e.g. "en", "vi"
  external_id?: string; // id from external ATS if sync
  notes?: string; // internal notes (not public)
  recruiterId?: string; // internal recruiter contact
  contact_phone?: string;
  contact_name?: string;
  // optional attachments
  attachments?: { name: string; url: string; type?: string }[];
};
