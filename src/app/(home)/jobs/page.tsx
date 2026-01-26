import { JobList } from "./JobList";
import { JobSidebar } from "./JobSidebar";
import { mockJobs } from "./data";
import { CONFIG_API } from "@/configs/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | CoreChain HR Management",
  description: "A secure and transparent blockchain-based platform for managing human resources and employee data.",
};

export default async function JobsPage() {
  const jobs = mockJobs.filter((j) => j.public && j.status === "published");

  const params = {
    page: 1,
    limit: 10,
  };

  const query = new URLSearchParams(params as any).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_2}${CONFIG_API.JOB.PUBLIC.INDEX}`, {
    cache: "no-store",
  });

  const data = await res.json();

  console.log("JOBS", data);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <JobSidebar jobs={data.data} />
        <JobList jobs={data.data} />
      </div>
    </div>
  );
}
