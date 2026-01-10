import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/* =======================
   GET – Public settings
======================= */
export async function GET() {
  // const supabase = createClient();

  // const { data, error } = await supabase
  //   .from("settings")
  //   .select("key, value")
  //   .eq("is_public", true);

  // if (error) {
  //   return NextResponse.json(
  //     { message: error.message },
  //     { status: 500 }
  //   );
  // }

  // const settings = Object.fromEntries(
  //   data.map((item) => [item.key, item.value])
  // );

  // return NextResponse.json(settings);

  return NextResponse.json({
    site: {
      name: "Core Chain",
      logo: "/logo.png",
      version: "1.0.0",
    },
    maintenance: {
      enabled: false,
      message: "System is under maintenance",
    },
    features: {
      swap: true,
      nft: false,
      staking: true,
    },
  });
}

/* =======================
   PUT – Update settings
======================= */
export async function PUT(req: Request) {
  // try {
  //   await requireAdmin();
  //   const body = await req.json();
  //   /**
  //    * body example:
  //    * {
  //    *   "maintenance": { "enabled": true },
  //    *   "site": { "name": "Core Chain" }
  //    * }
  //    */
  //   const supabase = createSupabaseServerClient();
  //   const payload = Object.entries(body).map(([key, value]) => ({
  //     key,
  //     value,
  //     updated_at: new Date().toISOString(),
  //   }));
  //   const { error } = await supabase
  //     .from("settings")
  //     .upsert(payload);
  //   if (error) {
  //     return NextResponse.json(
  //       { message: error.message },
  //       { status: 400 }
  //     );
  //   }
  //   return NextResponse.json({ success: true });
  // } catch (err: any) {
  //   return NextResponse.json(
  //     { message: err.message },
  //     { status: 403 }
  //   );
  // }
}

export async function DELETE(req: Request) {}
