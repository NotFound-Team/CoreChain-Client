"use client";

import React from "react";
import {
  Box, Typography, TextField, Grid, MenuItem, Button, InputLabel, 
   FormHelperText, Stack, Switch, FormControlLabel, 
  Divider, IconButton, Drawer, Checkbox
} from "@mui/material";
import { MdClose, MdSave } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  slug: z.string().optional(),
  short_title: z.string().optional(),
  department: z.string().optional(),
  employment_type: z.enum(["full-time", "part-time", "contract", "internship"]),
  remote_type: z.enum(["onsite", "remote", "hybrid"]),
  experience_level: z.enum(["entry", "junior", "mid", "senior", "lead", "manager"]),
  seniority: z.string().optional(),
  number_of_positions: z.coerce.number().min(1).default(1),
  
  // Location
  location: z.object({
    city: z.string().optional(),
    region: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
    remote: z.boolean().default(false),
  }),

  // Salary
  salary_range: z.object({
    min: z.coerce.number().optional(),
    max: z.coerce.number().optional(),
    currency: z.string().default("VND"),
    frequency: z.enum(["monthly", "yearly", "hourly"]).default("monthly"),
    visible: z.boolean().default(true),
  }),
  salary_note: z.string().optional(),

  // Content (Rich Text & Strings)
  description: z.string().min(1, "Description is required"),
  requirements: z.string().optional(), // Sẽ xử lý thành mảng khi submit
  responsibilities: z.string().optional(),
  skills: z.string().optional(),
  tags: z.string().optional(),
  benefits: z.string().optional(),

  // Application & Settings
  apply_method: z.enum(["email", "url", "internal", "linkedin", "other"]).default("internal"),
  apply_url: z.string().url().optional().or(z.literal("")),
  application_email: z.string().email().optional().or(z.literal("")),
  closing_date: z.string().nullable(),
  status: z.enum(["draft", "published", "closed", "archived"]).default("draft"),
  public: z.boolean().default(true),
  visa_sponsorship: z.boolean().default(false),

  // Contact
  contact_name: z.string().optional(),
  contact_phone: z.string().optional(),
  notes: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface CreateJobDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateJobDrawer({ open, onClose }: CreateJobDrawerProps) {
  const { control, handleSubmit, register, formState: { errors } } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      employment_type: "full-time",
      remote_type: "onsite",
      experience_level: "junior",
      status: "draft",
      public: true,
      salary_range: { currency: "VND", frequency: "monthly", visible: true },
      location: { remote: false }
    }
  });

  const onSubmit = (data: JobFormData) => {
    const formattedData = {
      ...data,
      requirements: data.requirements?.split("\n").filter(val => val.trim()),
      responsibilities: data.responsibilities?.split("\n").filter(val => val.trim()),
      skills: data.skills?.split(",").map(val => val.trim()).filter(Boolean),
      benefits: data.benefits?.split("\n").filter(val => val.trim()),
      is_active: data.status === "published",
      posted_at: new Date().toISOString(),
    };
    console.log("Submit TJob Data:", formattedData);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: "55%" }, p: 0, display: "flex", flexDirection: "column" } }}
    >
      {/* HEADER */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid", borderColor: "divider", bgcolor: "#f8f9fa" }}>
        <Typography variant="h6" fontWeight={700}>Create New Job</Typography>
        <IconButton onClick={onClose}><MdClose /></IconButton>
      </Box>

      {/* CONTENT (Scrollable) */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
        <form id="job-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            
            {/* 1. BASIC INFORMATION */}
            <Box>
              <Typography variant="subtitle2" color="primary" fontWeight={700} gutterBottom>BASIC INFORMATION</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField label="Job Title *" fullWidth size="small" {...register("title")} error={!!errors.title} helperText={errors.title?.message} /></Grid>
                <Grid item xs={6}><TextField label="Slug" fullWidth size="small" {...register("slug")} placeholder="e.g. senior-3d-designer" /></Grid>
                <Grid item xs={6}><TextField label="Department" fullWidth size="small" {...register("department")} /></Grid>
                <Grid item xs={6}>
                  <TextField select label="Employment Type" fullWidth size="small" {...register("employment_type")}>
                    {["full-time", "part-time", "contract", "internship"].map(v => <MenuItem key={v} value={v}>{v.toUpperCase()}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField select label="Experience Level" fullWidth size="small" {...register("experience_level")}>
                    {["entry", "junior", "mid", "senior", "lead", "manager"].map(v => <MenuItem key={v} value={v}>{v.toUpperCase()}</MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* 2. LOCATION & REMOTE */}
            <Box>
              <Typography variant="subtitle2" color="primary" fontWeight={700} gutterBottom>LOCATION & REMOTE</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField select label="Remote Type" fullWidth size="small" {...register("remote_type")}>
                    {["onsite", "remote", "hybrid"].map(v => <MenuItem key={v} value={v}>{v.toUpperCase()}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={6}><TextField label="Country" fullWidth size="small" {...register("location.country")} /></Grid>
                <Grid item xs={6}><TextField label="City" fullWidth size="small" {...register("location.city")} /></Grid>
                <Grid item xs={6}><TextField label="Region" fullWidth size="small" {...register("location.region")} /></Grid>
                <Grid item xs={12}><TextField label="Full Address" fullWidth size="small" {...register("location.address")} /></Grid>
                <Grid item xs={12}>
                   <FormControlLabel control={<Checkbox size="small" {...register("location.remote")} />} label="This is a fully remote position" />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* 3. SALARY RANGE */}
            <Box>
              <Typography variant="subtitle2" color="primary" fontWeight={700} gutterBottom>SALARY & BENEFITS</Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}><TextField type="number" label="Min Salary" fullWidth size="small" {...register("salary_range.min")} /></Grid>
                <Grid item xs={4}><TextField type="number" label="Max Salary" fullWidth size="small" {...register("salary_range.max")} /></Grid>
                <Grid item xs={4}><TextField select label="Currency" fullWidth size="small" {...register("salary_range.currency")}><MenuItem value="VND">VND</MenuItem><MenuItem value="USD">USD</MenuItem></TextField></Grid>
                <Grid item xs={12}><TextField label="Salary Note" placeholder="e.g. Up to $2000, Negotiable..." fullWidth size="small" {...register("salary_note")} /></Grid>
                <Grid item xs={12}>
                   <FormControlLabel control={<Controller name="salary_range.visible" control={control} render={({ field }) => <Switch size="small" checked={field.value} onChange={field.onChange} />} />} label="Show salary publicly" />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* 4. CONTENT (RICH TEXT) */}
            <Box>
              <Typography variant="subtitle2" color="primary" fontWeight={700} gutterBottom>JOB CONTENT</Typography>
              <Stack spacing={2}>
                <Box>
                  <InputLabel sx={{ mb: 1, fontSize: "0.875rem", fontWeight: 600 }}>Description *</InputLabel>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <ReactQuill theme="snow" value={field.value} onChange={field.onChange} style={{ height: "200px", marginBottom: "45px" }} />}
                  />
                  {errors.description && <FormHelperText error>{errors.description.message}</FormHelperText>}
                </Box>
                <TextField label="Requirements (Each line is a bullet)" multiline rows={4} fullWidth size="small" {...register("requirements")} />
                <TextField label="Responsibilities (Each line is a bullet)" multiline rows={4} fullWidth size="small" {...register("responsibilities")} />
                <TextField label="Skills (Comma separated)" placeholder="React, Figma, UX Research" fullWidth size="small" {...register("skills")} />
              </Stack>
            </Box>

            <Divider />

            {/* 5. APPLICATION & CONTACT */}
            <Box>
              <Typography variant="subtitle2" color="primary" fontWeight={700} gutterBottom>APPLICATION SETTINGS</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField select label="Apply Method" fullWidth size="small" {...register("apply_method")}>
                    {["internal", "email", "url", "linkedin"].map(v => <MenuItem key={v} value={v}>{v.toUpperCase()}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={6}><TextField type="date" label="Closing Date" fullWidth size="small" InputLabelProps={{ shrink: true }} {...register("closing_date")} /></Grid>
                <Grid item xs={12}><TextField label="Application URL / Email" fullWidth size="small" {...register("apply_url")} /></Grid>
                <Grid item xs={6}><TextField label="Contact Name" fullWidth size="small" {...register("contact_name")} /></Grid>
                <Grid item xs={6}><TextField label="Contact Phone" fullWidth size="small" {...register("contact_phone")} /></Grid>
                <Grid item xs={12}>
                   <Stack direction="row" spacing={3}>
                      <FormControlLabel control={<Controller name="public" control={control} render={({ field }) => <Switch size="small" checked={field.value} onChange={field.onChange} />} />} label="Visible to public" />
                      <FormControlLabel control={<Controller name="visa_sponsorship" control={control} render={({ field }) => <Switch size="small" checked={field.value} onChange={field.onChange} />} />} label="Visa Sponsorship" />
                   </Stack>
                </Grid>
                <Grid item xs={12}>
                  <TextField select label="Initial Status" fullWidth size="small" {...register("status")}>
                    {["draft", "published", "closed"].map(v => <MenuItem key={v} value={v}>{v.toUpperCase()}</MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>
            </Box>

          </Stack>
        </form>
      </Box>

      {/* FOOTER */}
      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider", display: "flex", gap: 2, bgcolor: "#fff" }}>
        <Button variant="outlined" fullWidth onClick={onClose} sx={{ borderRadius: 2 }}>Cancel</Button>
        <Button 
          type="submit" 
          form="job-form" 
          variant="contained" 
          fullWidth 
          startIcon={<MdSave />}
          sx={{ borderRadius: 2, bgcolor: "#1a1a1a", "&:hover": { bgcolor: "#333" } }}
        >
          Save Job
        </Button>
      </Box>
    </Drawer>
  );
}