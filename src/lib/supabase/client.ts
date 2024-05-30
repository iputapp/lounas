import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for client-side rendering.
 * @see {@link https://supabase.com/docs/guides/auth/server-side/nextjs}
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
