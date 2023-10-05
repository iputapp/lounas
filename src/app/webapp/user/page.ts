import { redirect, RedirectType } from "next/navigation";

/**
 * redirects users to the signout page
 * access control is handled by the middleware
 */
export default function Page() {
  return redirect("/webapp/user/signout", RedirectType.replace);
}
