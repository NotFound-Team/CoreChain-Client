"use client";

import { Card, CardContent, Chip } from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { TJob } from "@/types/job";

export function JobCard({ job }: { job: TJob }) {
  return (
    <Card sx={{ borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none', '&:hover': { boxShadow: 2 }, transition: 'box-shadow 0.2s' }}>
      <CardContent sx={{ '& > :not(style) + :not(style)': { mt: 1.5 }, p: 3, '&:last-child': { pb: 3 } }}>
        {/* Title */}
        <Link href={`/jobs/${job.slug}`}>
          <h3 className="text-lg font-semibold hover:underline">
            {job.title}
          </h3>
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          {job.experience_level && <span>{job.experience_level}</span>}
          {job.location && (
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt />
              {typeof job.location === "string"
                ? job.location
                : job.location.city}
            </span>
          )}
          {job.department && <span>{job.department}</span>}
          <span>{new Date(job.posted_at).toDateString()}</span>
        </div>

        {/* Bonus */}
        {job.salary_note && (
          <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
            {job.salary_note}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {job.remote_type && (
            <Chip
              label={`${job.remote_type} work`}
              color="primary"
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
