import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function UserAuth() {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();
  if (!session.data.session) return new Response("Unauthorized", { status: 401 });

  return session.data.session;
}
