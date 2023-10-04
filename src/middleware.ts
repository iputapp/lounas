import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** @see {@link https://nextjs.org/docs/app/building-your-application/routing/middleware} */
export async function middleware(req: NextRequest) {
  const reqUrl = new URL(req.url);
  const reqNextPath = req.nextUrl.pathname;
  /** supabase auth session */
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();

  // console.log(session);

  /** signined */
  if (session.data.session) {
    /** root */
    if (reqNextPath === "/") {
      return NextResponse.redirect(`${reqUrl.origin}/webapp`);
    }

    /** ----- auth ----- */
    /** /webapp/user */
    if (reqNextPath.endsWith("/signin")) {
      return NextResponse.redirect(`${reqUrl.origin}/webapp/user/signout`);
    }
  } else {
    /** root */
    if (reqNextPath === "/") {
      return NextResponse.redirect(`${reqUrl.origin}/signup`);
    }

    /** ----- auth ----- */
    /** /webapp/user */
    if (reqNextPath.endsWith("/signout")) {
      return NextResponse.redirect(`${reqUrl.origin}/webapp/user/signin`);
    }

    /** /signup/verify */
    if (reqNextPath.endsWith("/verify")) {
      /** pending verification */
      if (!req.cookies.has("verify")) return NextResponse.redirect(`${reqUrl.origin}`);

      /** remove access permissions to the verify page */
      res.cookies.delete("verify");
      return;
    }

    /** ----- settings ----- */
    /** /privacy */
    if (reqNextPath.startsWith("/privacy")) {
      return NextResponse.redirect(`${reqUrl.origin}`);
    }

    /** ----- data ----- */
    /** /dish */
    if (reqNextPath.startsWith("/dish")) {
      return NextResponse.redirect(`${reqUrl.origin}`);
    }

    /** /restaurant */
    if (reqNextPath.startsWith("/restaurant")) {
      return NextResponse.redirect(`${reqUrl.origin}`);
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/signup/:path+",
    "/privacy/:path*",
    "/dish/:path*",
    "/restaurant/:path*",
    "/webapp/:path+",
  ],
};
