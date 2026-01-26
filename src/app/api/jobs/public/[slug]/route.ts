import { createAdminClient } from "@/utils/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

const supabase = createAdminClient();
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .eq("public", true)
    .eq("is_active", true)
    .eq("status", "published")
    .is("deleted_at", null)
    .single();

  if (error) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data });
}
