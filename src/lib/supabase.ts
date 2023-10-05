import { createClient } from "@supabase/supabase-js";

/** @see {@link https://supabase.com/docs/reference/javascript/initializing} */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
