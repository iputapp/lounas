import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/** @see {@link https://supabase.com/docs/reference/javascript/initializing} */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function UserAuth() {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();
  if (!session.data.session) return new Response("Unauthorized", { status: 401 });

  return session.data.session;
}
