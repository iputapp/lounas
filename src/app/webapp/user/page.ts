import { redirect, RedirectType } from "next/navigation";

/**
 * Redirects users to the appropriate page based on their session status
 */
export default function Page() {
  return redirect("/webapp/user/signout", RedirectType.replace);
}
