import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { isAdminRequest } from "@/features/common/is-admin-request";

// GET /api/jobs
const supabase = createAdminClient();

export async function GET(req: NextRequest) {
  const isAllowed = await isAdminRequest(req);
  if (!isAllowed) {
    return NextResponse.json({ message: "Forbidden: Admin access required" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const keyword = searchParams.get("keyword");
  const status = searchParams.get("status");
  const isActive = searchParams.get("is_active");
  const isPublic = searchParams.get("public");
  const employmentType = searchParams.get("employment_type");
  const remoteType = searchParams.get("remote_type");
  const experience = searchParams.get("experience_level");
  const department = searchParams.get("department");
  const tag = searchParams.get("tag");
  const minSalary = searchParams.get("min_salary");
  const maxSalary = searchParams.get("max_salary");
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") === "asc" ? true : false;

  let query = supabase.from("jobs").select("*", { count: "exact" }).order(sortBy, { ascending: order });

  // ===== Filters =====

  if (keyword) {
    query = query.or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%,department.ilike.%${keyword}%`);
  }

  if (status) {
    query = query.eq("status", status);
  }

  if (isActive !== null) {
    query = query.eq("is_active", isActive === "true");
  }

  if (isPublic !== null) {
    query = query.eq("public", isPublic === "true");
  }

  if (employmentType) {
    query = query.eq("employment_type", employmentType);
  }

  if (remoteType) {
    query = query.eq("remote_type", remoteType);
  }

  if (experience) {
    query = query.eq("experience_level", experience);
  }

  if (department) {
    query = query.ilike("department", `%${department}%`);
  }

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  if (minSalary) {
    query = query.gte("salary_range->min", Number(minSalary));
  }

  if (maxSalary) {
    query = query.lte("salary_range->max", Number(maxSalary));
  }

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

// POST /api/jobs
export async function POST(req: NextRequest) {
  const isAllowed = await isAdminRequest(req);
  if (!isAllowed) {
    return NextResponse.json({ message: "Forbidden: Admin access required" }, { status: 403 });
  }
  const body = await req.json();
  console.log("data", body);

  const { data, error } = await supabase.from("jobs").insert(body).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
