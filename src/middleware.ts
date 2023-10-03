import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** @see {@link https://nextjs.org/docs/app/building-your-application/routing/middleware} */
export async function middleware(req: NextRequest) {
  const reqUrl = new URL(req.url);
  /** supabase auth session */
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();

  console.log("session", session);

  /** /signup/verify */
  if (req.nextUrl.pathname.endsWith("/verify")) {
    /** pending status */
    if (req.cookies.has("verify")) {
      res.cookies.delete("verify");
      return;
    } else {
      return NextResponse.redirect(`${reqUrl.origin}/signup`);
    }
  }

  /** /privacy */
  if (req.nextUrl.pathname.startsWith("/privacy")) {
    if (session.data) {
      return;
    } else {
      return NextResponse.redirect(`${reqUrl.origin}`);
    }
  }

  /** /dish */
  if (req.nextUrl.pathname.startsWith("/dish")) {
    if (session.data) {
      return;
    } else {
      return NextResponse.redirect(`${reqUrl.origin}`);
    }
  }

  /** /restaurant */
  if (req.nextUrl.pathname.startsWith("/restaurant")) {
    if (session.data) {
      return;
    } else {
      return NextResponse.redirect(`${reqUrl.origin}`);
    }
  }

  /** /webapp/user */
  if (req.nextUrl.pathname.endsWith("/signout")) {
    if (session.data) {
      return;
    } else {
      return NextResponse.redirect(`${reqUrl.origin}/webapp/user/signin`);
    }
  }
}

export const config = {
  matcher: [
    "/signup/:path+",
    "/privacy/:path*",
    "/dish/:path*",
    "/restaurant/:path*",
    "/webapp/user/signout",
  ],
};
