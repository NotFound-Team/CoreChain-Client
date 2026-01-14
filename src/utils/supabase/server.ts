import { createServerClient } from "@supabase/ssr";
import { cookies as nextCookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

type CookieStore = Awaited<ReturnType<typeof nextCookies>>;

const createCookieAdapter = (cookieStore?: CookieStore) => {
  if (!cookieStore) {
    // Fallback no-op cookies
    return {
      getAll() {
        return [];
      },
      setAll() {
        // noop
      },
    };
  }

  return {
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet: any[]) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      } catch {
        // Ignore if called in Server Component
      }
    },
  };
};

export const createClient = (cookieStore?: CookieStore) => {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: createCookieAdapter(cookieStore),
  });
};
