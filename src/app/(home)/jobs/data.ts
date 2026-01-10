import { TJob } from "@/types/job";

export const mockJobs: TJob[] = [
  {
    id: "job-001",
    companyId: "company-gemini",
    title: "Senior Frontend Engineer (React / Next.js)",
    slug: "senior-frontend-engineer-react-nextjs",
    short_title: "Senior FE Engineer",
    description: `
<h3>About the role</h3>
<p>We are looking for a Senior Frontend Engineer to build scalable web applications.</p>
<ul>
  <li>Build UI with React, Next.js</li>
  <li>Collaborate with backend & design teams</li>
</ul>
    `,
    department: "Engineering",
    location: {
      city: "Ho Chi Minh City",
      country: "Vietnam",
    },
    remote_type: "hybrid",
    employment_type: "full-time",
    experience_level: "senior",
    requirements: [
      "5+ years experience with React",
      "Strong knowledge of TypeScript",
      "Experience with Next.js App Router",
    ],
    responsibilities: [
      "Develop and maintain frontend features",
      "Optimize performance and UX",
      "Review code and mentor juniors",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "MUI"],
    tags: ["frontend", "react", "nextjs"],
    salary_range: {
      min: 2500,
      max: 4000,
      currency: "USD",
      frequency: "monthly",
      visible: true,
    },
    benefits: ["Flexible working hours", "13th month salary", "Health insurance"],
    perks: ["MacBook Pro", "Remote days"],
    visa_sponsorship: false,
    number_of_positions: 2,
    apply_method: "internal",
    posted_at: "2026-01-01T08:00:00.000Z",
    created_at: "2025-12-30T10:00:00.000Z",
    is_active: true,
    status: "published",
    views: 124,
    applicants_count: 18,
    public: true,
    locale: "en",
  },

  {
    id: "job-002",
    companyId: "company-gemini",
    title: "Junior Backend Engineer (Node.js)",
    slug: "junior-backend-engineer-nodejs",
    description: `
<p>Join our backend team to build APIs and services.</p>
    `,
    department: "Engineering",
    location: "Remote",
    remote_type: "remote",
    employment_type: "full-time",
    experience_level: "junior",
    requirements: ["Basic knowledge of Node.js", "Understanding REST APIs"],
    responsibilities: ["Implement backend APIs", "Fix bugs and write tests"],
    skills: ["Node.js", "Express", "PostgreSQL"],
    salary_note: "Negotiable",
    application_email: "hr@gemini.vn",
    posted_at: "2026-01-03T09:00:00.000Z",
    is_active: true,
    status: "published",
    public: true,
    locale: "vi",
  },

  {
    id: "job-003",
    companyId: "company-gemini",
    title: "HR Intern",
    slug: "hr-intern",
    description: "Support HR operations and recruitment.",
    department: "Human Resources",
    employment_type: "internship",
    requirements: ["Good communication skills"],
    responsibilities: ["Assist HR team"],
    posted_at: "2025-12-20T09:00:00.000Z",
    is_active: false,
    status: "draft",
    public: false,
    notes: "Internal posting only",
  },
];
