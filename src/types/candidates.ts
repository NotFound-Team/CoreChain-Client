type Candidate = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  resume_url?: string;
  linkedin_url?: string;
  skills?: string[];
  portfolio_url?: string;
  location?: string;
  current_company?: string;
  current_title?: string;

  source?: "linkedin" | "website" | "referral" | "email" | "other";

  created_at: string;
  updated_at?: string;
  deleted_at?: string | null;
};

type PipelineStage = "applied" | "screening" | "interview" | "technical" | "offer" | "hired" | "rejected" | "withdrawn";

type JobPipelineItem = {
  id: string;
  jobId: string;
  candidateId: string;

  stage: PipelineStage;

  rating?: number; // 1–5
  assigned_recruiter?: string;

  expected_salary?: number;
  available_from?: string;

  is_starred?: boolean;

  created_at: string;
  updated_at?: string;
  deleted_at?: string | null;
};

type PipelineHistory = {
  id: string;
  pipeline_item_id: string;

  from_stage: PipelineStage;
  to_stage: PipelineStage;

  changed_by?: string;
  note?: string;

  changed_at: string;
};

type PipelineNote = {
  id: string;
  pipeline_item_id: string;

  content: string;
  created_by?: string;

  created_at: string;
};
