import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

const supabase = createAdminClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const keyword = searchParams.get("q"); // search title
  const location = searchParams.get("location");
  const employmentType = searchParams.get("employment_type");
  const remoteType = searchParams.get("remote_type");
  const experience = searchParams.get("experience_level");
  const minSalary = searchParams.get("min_salary");
  const tag = searchParams.get("tag");

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  let query = supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .eq("public", true)
    .eq("status", "published")
    .eq("is_active", true)
    .order("posted_at", { ascending: false });

  // ===== Filters =====
  const filterMap = [
    { cond: keyword, fn: (q: any) => q.ilike("title", `%${keyword}%`) },
    { cond: location, fn: (q: any) => q.ilike("location", `%${location}%`) },
    { cond: employmentType, fn: (q: any) => q.eq("employment_type", employmentType) },
    { cond: remoteType, fn: (q: any) => q.eq("remote_type", remoteType) },
    { cond: experience, fn: (q: any) => q.eq("experience_level", experience) },
    { cond: tag, fn: (q: any) => q.contains("tags", [tag]) },
    { cond: minSalary, fn: (q: any) => q.gte("salary_range->min", Number(minSalary)) },
  ];

  filterMap.forEach(({ cond, fn }) => {
    if (cond) query = fn(query);
  });
  // if (keyword) {
  //   query = query.ilike("title", `%${keyword}%`);
  // }

  // if (location) {
  //   query = query.ilike("location", `%${location}%`);
  // }

  // if (employmentType) {
  //   query = query.eq("employment_type", employmentType);
  // }

  // if (remoteType) {
  //   query = query.eq("remote_type", remoteType);
  // }

  // if (experience) {
  //   query = query.eq("experience_level", experience);
  // }

  // if (tag) {
  //   query = query.contains("tags", [tag]); // array column
  // }

  // if (minSalary) {
  //   query = query.gte("salary_range->min", Number(minSalary));
  // }

  // ===== Pagination =====
  const { data, error, count } = await query.range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    meta: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}
