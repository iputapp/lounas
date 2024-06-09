import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

/**
 * redirects users to the signout page
 * access control is handled by the middleware (double check)
 */
export default async function Page() {
  const supabase = createClient();
  const auth = await supabase.auth.getUser();

  /** @see {@link https://nextjs.org/docs/app/api-reference/functions/revalidatePath} */
  revalidatePath("/webapp/user", "layout");

  if (auth.data.user && !auth.error) {
    return redirect("/webapp/user/signout", RedirectType.replace);
  }

  return redirect("/webapp/user/signin", RedirectType.replace);
}
