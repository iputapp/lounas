import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

/**
 * redirects users to the signout page
 * access control is handled by the middleware (double check)
 */
export default async function Page() {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const session = await supabase.auth.getSession();

  /** @see {@link https://nextjs.org/docs/app/api-reference/functions/revalidatePath} */
  revalidatePath("/webapp/user", "page");

  if (session.data.session) {
    return redirect("/webapp/user/signout", RedirectType.replace);
  }

  return redirect("/webapp/user/signin", RedirectType.replace);
}
