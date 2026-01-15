import { JobList } from "./JobList";
import { JobSidebar } from "./JobSidebar";
import { mockJobs } from "./data";

export default function JobsPage() {
  const jobs = mockJobs.filter((j) => j.public && j.status === "published");

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] min-h-[50vh]">
        <JobSidebar jobs={jobs} />
        <JobList jobs={jobs} />
      </div>
    </div>
  );
}
