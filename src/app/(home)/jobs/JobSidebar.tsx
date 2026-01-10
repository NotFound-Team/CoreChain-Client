"use client";

import { TextField, Chip } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { TJob } from "@/types/job";

type Props = {
  jobs: TJob[];
};

export function JobSidebar({ jobs }: Props) {
  return (
    <aside className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="mb-2 font-semibold">Find your favorite jobs</h3>
        <TextField
          fullWidth
          size="small"
          placeholder="Java, JavaScript, Mobile, etc."
          InputProps={{
            startAdornment: <FaSearch className="mr-2 text-gray-400" />,
          }}
        />
        <p className="mt-2 text-sm text-gray-500">{jobs.length} jobs available</p>
      </div>

      {/* Location */}
      <FilterGroup title="Location">
        {["Ho Chi Minh", "Da Nang", "Remote"].map((loc) => (
          <Chip key={loc} label={loc} variant="outlined" />
        ))}
      </FilterGroup>

      {/* Job type */}
      <FilterGroup title="Job types">
        {["Experienced", "Fresher", "Intern"].map((type) => (
          <Chip key={type} label={type} variant="outlined" />
        ))}
      </FilterGroup>

      {/* Organization */}
      <FilterGroup title="Organizations">
        <Chip label="KMS Technology" variant="outlined" />
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-semibold">{title}</h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
