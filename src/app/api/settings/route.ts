import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/utils/supabase/admin";
import { isAdminRequest } from "@/features/common/is-admin-request";
import { settingsSchema } from "./schema";
import { HttpStatusCode } from "axios";
import { createClient as createClientUseServer } from "@/utils/supabase/server";

/* =======================
   GET – Get settings
======================= */
export async function GET() {
  try {
    const supabase = createClientUseServer();

    const { data, error } = await supabase.from("settings").select("key, value");

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ message: "Failed to fetch settings", error: error.message }, { status: 500 });
    }

    // Convert rows (key, value) to a single object
    const settings = (data || []).reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return NextResponse.json({ data: settings, status: HttpStatusCode.Ok, timestamp: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

/* =======================
   PATCH – Update settings
======================= */
export async function PATCH(req: NextRequest) {
  try {
    const isAllowed = await isAdminRequest(req);
    if (!isAllowed) {
      return NextResponse.json({ message: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const keysToUpdate = Object.keys(body);

    if (keysToUpdate.length === 0) {
      return NextResponse.json({});
    }

    const adminSupabase = createAdminClient();

    const { data: existingData, error: fetchError } = await adminSupabase
      .from("settings")
      .select("key, value")
      .in("key", keysToUpdate);

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError);
      return NextResponse.json(
        { message: "Failed to fetch existing settings", error: fetchError.message },
        { status: 500 },
      );
    }

    const existingSettingsMap = (existingData || []).reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    const payload: any[] = [];
    const errors: any = {};

    // Process each key
    for (const key of keysToUpdate) {
      const fieldSchema = settingsSchema.shape[key as keyof typeof settingsSchema.shape];

      // Allow only defined keys
      if (!fieldSchema) {
        // Option: Ignore or Error. Let's ignore unknown keys.
        continue;
      }

      const newValue = body[key];
      const existingValue = existingSettingsMap[key] || {};

      // Deep merge logic
      let mergedValue = newValue;
      if (
        typeof newValue === "object" &&
        newValue !== null &&
        !Array.isArray(newValue) &&
        typeof existingValue === "object" &&
        existingValue !== null &&
        !Array.isArray(existingValue)
      ) {
        mergedValue = {
          ...existingValue,
          ...newValue,
        };
      }

      // Validate the MERGED value against the full schema for that field
      const validation = fieldSchema.safeParse(mergedValue);
      if (!validation.success) {
        errors[key] = validation.error.format();
      } else {
        payload.push({
          key,
          value: validation.data, // Stores the validated, merged data
          updated_at: new Date().toISOString(),
        });
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 });
    }

    if (payload.length > 0) {
      const { error } = await adminSupabase.from("settings").upsert(payload, { onConflict: "key" });

      if (error) {
        console.error("Supabase upsert error:", error);
        return NextResponse.json({ message: "Failed to update settings", error: error.message }, { status: 500 });
      }
    }

    const returnedData = payload.reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return NextResponse.json({
      data: "Update settings successfully",
      status: HttpStatusCode.Ok,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
