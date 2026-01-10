import { TJob } from "@/types/job";
import { JobCard } from "./JobCard";

export function JobList({ jobs }: { jobs: TJob[] }) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
