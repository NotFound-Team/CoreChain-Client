import { notFound } from "next/navigation";
import { Chip, Divider } from "@mui/material";
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaMoneyBillWave, FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";
import { mockJobs } from "../data";
import { use } from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function JobDetailPage({ params }: Props) {
  const { slug } = use(params);
  const job = mockJobs.find((j) => j.slug === slug);

  if (!job || !job.public) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 space-y-8">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {job.department && <span>{job.department}</span>}
          {job.employment_type && (
            <span className="flex items-center gap-1">
              <FaBriefcase /> {job.employment_type}
            </span>
          )}
          {job.remote_type && (
            <span className="flex items-center gap-1">
              <FaClock /> {job.remote_type}
            </span>
          )}
        </div>
      </header>

      {/* Location */}
      {(job.location || job.locations) && (
        <section className="space-y-2">
          <h2 className="font-semibold">Location</h2>
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <FaMapMarkerAlt className="mt-1" />
            <div>
              {typeof job.location === "string" && <p>{job.location}</p>}
              {job.location && typeof job.location === "object" && (
                <p>{[job.location.city, job.location.country].filter(Boolean).join(", ")}</p>
              )}
              {job.locations?.map((loc, idx) => (
                <p key={idx}>{[loc.city, loc.country].filter(Boolean).join(", ")}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <Divider />

      {/* Salary */}
      {(job.salary_range || job.salary_note) && (
        <section className="space-y-2">
          <h2 className="font-semibold">Salary</h2>
          <div className="flex items-center gap-2 text-sm">
            <FaMoneyBillWave />
            {job.salary_range?.visible ? (
              <span>
                {job.salary_range.min} – {job.salary_range.max} {job.salary_range.currency}{" "}
                {job.salary_range.frequency ?? ""}
              </span>
            ) : (
              <span>{job.salary_note ?? "Negotiable"}</span>
            )}
          </div>
        </section>
      )}

      <Divider />

      {/* Skills */}
      {job.skills && (
        <section className="space-y-2">
          <h2 className="font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Chip key={skill} label={skill} />
            ))}
          </div>
        </section>
      )}

      {/* Description */}
      <section className="space-y-2">
        <h2 className="font-semibold">Job Description</h2>
        <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
      </section>

      {/* Responsibilities */}
      {job.responsibilities.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-semibold">Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {job.responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Requirements */}
      {job.requirements.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-semibold">Requirements</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {job.requirements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      {job.benefits && (
        <section className="space-y-2">
          <h2 className="font-semibold">Benefits</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {job.benefits.map((b: any, idx) => (
              <li key={idx}>{typeof b === "string" ? b : b.name}</li>
            ))}
          </ul>
        </section>
      )}

      <Divider />

      {/* Apply */}
      <section className="space-y-3">
        <h2 className="font-semibold">Apply</h2>

        {job.apply_url && (
          <a
            href={job.apply_url}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-white"
          >
            <FaGlobe /> Apply via website
          </a>
        )}

        {job.application_email && (
          <div className="flex items-center gap-2 text-sm">
            <FaEnvelope />
            <a href={`mailto:${job.application_email}`}>{job.application_email}</a>
          </div>
        )}

        {job.contact_phone && (
          <div className="flex items-center gap-2 text-sm">
            <FaPhone /> {job.contact_phone}
          </div>
        )}
      </section>
    </div>
  );
}
